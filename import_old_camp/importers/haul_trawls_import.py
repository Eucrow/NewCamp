import pandas as pd
from django.conf import settings
from sqlalchemy import create_engine

from import_old_camp.importers.base import BaseImport
from hauls.models import HaulTrawl
from import_old_camp.utils.converters import convert_position_camp_to_decimal
from import_old_camp.utils.db_helpers import get_haul_id


class HaulTrawlsImport(BaseImport):
    def __init__(self, request):
        super().__init__(request, "hauls")
        self.survey_object = self.get_survey_object()

        self.fields_trawl = {
            "shooting_date_time": "HORA_L",
            "shooting_latitude": "LATITUD_L",
            "shooting_longitude": "LONGITUD_L",
            "shooting_depth": "PROF_L",
            "hauling_date_time": "HORA_V",
            "hauling_latitude": "LATITUD_V",
            "hauling_longitude": "LONGITUD_V",
            "hauling_depth": "PROF_V",
            "course": "RUMBO",
            "velocity": "VELOCIDAD",
            "cable": "CABLE",
            "sweep": "MALLETAS",
            "otter_boards_distance": "DISTA_P",
            "horizontal_aperture": "ABERT_H",
            "vertical_aperture": "ABERT_V",
            # "grid": "CUADRICULA",
            "track": "RECORRIDO",
            "comment": "OBSERV",
        }

    def format_table(self, file):
        """
        Format table to save in database with to_sql function of pandas.
        Remove useless variables and add station_id and stratum_id.
        :param file: file hauls in pandas data frame
        :return: pandas data frame formatted
        """
        trawl_table = file

        # add haul_id variable
        trawl_table.loc[:, 'haul_id'] = trawl_table.apply(get_haul_id, axis=1, args=[self.survey_name])

        def fix_year_and_convert_date(date_val):
            if pd.isna(date_val):
                return pd.NaT

            date_str = str(date_val).strip()

            try:
                dt = pd.to_datetime(date_str)

                if 1900 <= dt.year <= 1999:
                    new_year = dt.year + 100
                    if new_year > 2000:
                        dt = dt.replace(year=new_year)

                return dt
            except:
                return pd.NaT

        trawl_table["FECHA"] = trawl_table["FECHA"].apply(fix_year_and_convert_date)

        if trawl_table["FECHA"].dtype == 'object':
            trawl_table["FECHA"] = pd.to_datetime(trawl_table["FECHA"])

        # Convert HORA_L from "HH.MM" format to timedelta
        def parse_time_to_timedelta(time_str):
            if pd.isna(time_str):
                return pd.Timedelta(0)

            time_str = str(time_str).strip()
            # Split by dot and convert to hours:minutes format
            if '.' in time_str:
                hours, minutes = time_str.split('.')
                return pd.Timedelta(hours=int(hours), minutes=int(minutes))
            return pd.Timedelta(0)

        # Convert time strings to timedelta
        trawl_table["time_shooting"] = trawl_table["HORA_L"].apply(parse_time_to_timedelta)
        trawl_table["time_hauling"] = trawl_table["HORA_V"].apply(parse_time_to_timedelta)

        # Add timedelta to datetime
        trawl_table['shooting_date_time'] = trawl_table["FECHA"] + trawl_table["time_shooting"]
        trawl_table['hauling_date_time'] = trawl_table["FECHA"] + trawl_table["time_hauling"]

        # format some variables
        def convert_velocity(row):
            if isinstance(row['VELOCIDAD'], str):
                return float(row['VELOCIDAD'].replace(',', '.'))
            else:
                # If it's already a float, return it as is
                return float(row['VELOCIDAD'])

        trawl_table["velocity"] = trawl_table.apply(convert_velocity, axis=1)

        # format coordinates
        def format_latitude_decimal(row, coor_var, cardinal_var, cardinal_value):
            """
            Change the format of latitude by LATITUD var and cardinal points var. To use in apply.
            :param row: row of apply.
            :param coor_var: coordinate variable.
            :param cardinal_var: variable which contain the cardinal point of the coordinates (NSL, NSV, EWL, EWV)
            :param cardinal_value: cardinal value (string) which indicates if the coordinates are negatives.
            :return: coordinate converted.
            """
            row[coor_var] = convert_position_camp_to_decimal(row[coor_var])
            if row[cardinal_var] == cardinal_value:
                row[coor_var] = (-1) * row[coor_var]
            return round(row[coor_var], 4)

        trawl_table['shooting_latitude'] = trawl_table.apply(format_latitude_decimal, axis=1,
                                                             args=["LATITUD_L", "NSL", "S"])
        trawl_table['shooting_longitude'] = trawl_table.apply(format_latitude_decimal, axis=1,
                                                              args=["LONGITUD_L", "EWL", "W"])
        trawl_table['hauling_latitude'] = trawl_table.apply(format_latitude_decimal, axis=1,
                                                            args=["LATITUD_V", "NSV", "S"])
        trawl_table['hauling_longitude'] = trawl_table.apply(format_latitude_decimal, axis=1,
                                                             args=["LONGITUD_V", "EWV", "W"])

        # select variables to export

        fields = list(self.fields_trawl.values())

        fields.extend(['haul_id', 'shooting_date_time', 'hauling_date_time', 'shooting_latitude', 'shooting_longitude',
                       'hauling_latitude', 'hauling_longitude', 'velocity'])

        trawl_table = trawl_table[fields]

        new_fields = list(self.fields_trawl.keys())

        new_fields.extend(
            ['haul_id', 'shooting_date_time', 'hauling_date_time', 'shooting_latitude', 'shooting_longitude',
             'hauling_latitude', 'hauling_longitude', 'velocity'])

        trawl_table.columns = new_fields

        # the empty values must be saved as Na, so:
        trawl_table = trawl_table.replace('', pd.NA)

        # return table formatted
        return trawl_table

    def import_data(self):
        """
        Import csv file with trips data.
        The hauls file to import from old Camp is saved in two different models: one with generic characteristics and
        other with the specific characteristics ot trawl.
        :return:
        """

        # Create engine.
        db_path = settings.DATABASES['default']['NAME']
        engine = create_engine(f'sqlite:///{db_path}', echo=settings.DEBUG)

        # check there aren't already saved
        if HaulTrawl.objects.filter(haul__station__survey=self.survey_object).exists():
            self.add_error(
                "<p>The hauls from this survey have already been saved in the database. No hauls have been"
                "added or changed.</p>")
        else:
            trawl_table = self.format_table(self.hauls_file)

            try:
                trawl_table.to_sql("hauls_haultrawl", con=engine, if_exists="append", index=False)
                self.add_message("Haul trawls has been successfully saved in haul trawls table.")

            except Exception as e:
                self.add_error("Error importing haul trawl table: {}".format(e))
                raise Exception(self.errors[-1])

        return self.get_response()
