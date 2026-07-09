import pandas as pd
from django.conf import settings
from sqlalchemy import create_engine

from import_old_camp.importers.base import BaseImport
from import_old_camp.utils.db_helpers import get_haul_id


class MeteorologiesImport(BaseImport):
    def __init__(self, request):
        super().__init__(request, "hauls")
        self.fields_meteorology = {
            "wind_direction": "DIR_VIENTO",
            "wind_velocity": "VEL_VIENTO",
            "sea_state": "EST_MAR",
        }

    def format_table(self, file):
        """
        Format table to save in database with to_sql function of pandas.
        Remove useless variables and add station_id and stratum_id.
        :param file: file hauls in pandas data frame
        :return: pandas data frame formatted
        """
        meteo_table = file

        meteo_table.loc[:, 'haul_id'] = meteo_table.apply(get_haul_id, axis=1, args=[self.survey_name])

        fields = list(self.fields_meteorology.values())

        fields.extend(['haul_id'])

        meteo_table = file[fields]

        new_fields = list(self.fields_meteorology.keys())

        new_fields.extend(['haul_id'])

        meteo_table.columns = new_fields

        # the empty values must be saved as Na, so:
        meteo_table = meteo_table.replace('', pd.NA)

        def convert_wind_velocity(row):
            if not pd.isna(row['wind_velocity']):
                # Check if it's a string before using replace
                if isinstance(row['wind_velocity'], str):
                    return float(row['wind_velocity'].replace(',', '.'))
                else:
                    # If it's already a float, return it as is
                    return float(row['wind_velocity'])
            return None

        meteo_table["wind_velocity"] = meteo_table.apply(convert_wind_velocity, axis=1)

        return meteo_table

    def import_data(self):

        try:
            meteo_table = self.format_table(self.hauls_file)

            engine = create_engine('sqlite:///db.sqlite3', echo=settings.DEBUG)
            meteo_table.to_sql("hauls_meteorology", con=engine, if_exists="append", index=False)
            self.add_message("Meteorology has been successfully saved in meteorology table.")

        except Exception as e:
            self.add_error("Error importing meteorology table: {}".format(e))
            raise Exception(self.errors[-1])

        return self.get_response()
