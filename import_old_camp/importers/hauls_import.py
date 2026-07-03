import pandas as pd
from django.conf import settings
from django.shortcuts import get_object_or_404
from sqlalchemy import create_engine

from gears.models import Trawl
from import_old_camp.importers.base import BaseImport
from hauls.models import Haul
from import_old_camp.utils.utils import get_type_survey
from newcamp.utils import get_create_sampler_object
from stations.models import Station
from strata.models import Stratum
from stratifications.models import Stratification


class HaulsImport(BaseImport):
    def __init__(self, request):
        super().__init__(request, "hauls")
        self.fields_haul = {
            "haul": "LANCE",
            # "gear": "ARTE",
            "valid": "VALIDEZ",
        }

        self.sectors_col_names = [1, 2, 3, 4, 5]
        self.sectors_names = ["MIÑO-FINISTERRE", "FINISTERRE-ESTA", "ESTACA-PEÑAS", "PEÑAS-AJO", "AJO-BIDASOA"]
        # dept_col_names "D" and "E" doesn't have data so the depths_names of them are "without depth 1" and "without
        # depth 2"
        self.depth_col_names = ["A", "B", "C", "D", "E"]
        self.depths_names = ["70-120", "120-200", "200-500", "without depth 1", "without depth 2"]
        self.survey_object = self.get_survey_object()
        self.sampler_object = get_create_sampler_object(sampler_name="ARRASTRE")
        self.stratification_name = get_type_survey(self.request.FILES['survey'].name) + "-sector-profundidad"
        self.stratification_object = Stratification.objects.get(stratification=self.stratification_name)

    def get_stratum_name(self, row_sector, row_stratum):
        if row_sector == "" or row_sector is None or row_stratum == "" or row_stratum is None:
            return None

        sector_name = self.sectors_names[int(row_sector) - 1]
        depth_index = self.depth_col_names.index(row_stratum)
        depth_name = self.depths_names[depth_index]

        stratum_name = sector_name + "-" + depth_name
        return stratum_name

    def get_stratum_id(self, row):
        """
        Get the stratum id. Used in pandas apply function.
        :param row: row of the apply function.
        :return: stratum id.
        """

        # There are some stratum which does not have areas, so I don't save it stratum database
        stratum = self.get_stratum_name(row["SECTOR"], row["ESTRATO"])

        if stratum is not None:
            stratum_object = Stratum.objects.get(stratum=stratum,
                                                 stratification=self.stratification_object)
        else:
            stratum_object = Stratum.objects.get(stratum="not_assigned",
                                                 stratification=self.stratification_object)
        return stratum_object.id

    def get_station_id_or_create(self, row):
        """
        Get the station id. Used in pandas apply function.
        :param row: row of the apply function.
        :return: Station id.
        """

        # add station data
        # temporally, in all demersales surveys, the station is the same as the haul
        if not Station.objects.filter(station=row['LANCE'], survey__acronym=self.survey_name).exists():
            station_new = Station()
            station_new.station = row['LANCE']
            station_new.sampler = self.sampler_object
            station_new.survey = self.survey_object
            station_new.save()

        station_object = get_object_or_404(Station, station=row['LANCE'], survey__acronym=self.survey_name)
        return station_object.id

    def get_trawl_gear_id(self, row):
        """
        Get the gear id. Used in pandas apply function.
        :param row: row of the apply function
        :return: gear id
        """
        try:
            trawl_gear = Trawl.objects.get(name=row["ARTE"])
            return trawl_gear.id
        except Trawl.DoesNotExist:
            print("The trawl " + str(row["ARTE"]) + " does not exists in Trawl table.")

    def format_table(self, file):
        """
        Format table to save in database with to_sql function of pandas.
        Remove useless variables and add station_id and stratum_id.
        :param file: file hauls in pandas data frame
        :return: pandas data frame formatted
        """
        try:
            hauls_table = file

            hauls_table.loc[:, 'station_id'] = hauls_table.apply(self.get_station_id_or_create, axis=1)

            hauls_table.loc[:, 'stratum_id'] = hauls_table.apply(self.get_stratum_id, axis=1)

            hauls_table.loc[:, 'sampler_id'] = self.sampler_object.id

            # hauls_table.loc[:, 'gear_id'] = hauls_table.apply(self.get_trawl_gear_id, axis=1)
            hauls_table.loc[:, 'trawl_id'] = hauls_table.apply(self.get_trawl_gear_id, axis=1)

            hauls_table.loc[:, 'sampler_type'] = "trawl"

            validez = hauls_table['VALIDEZ'].apply(lambda x: True if x == 1 or x == 2 else False)
            hauls_table.loc[:, 'valid'] = validez

            special = hauls_table['VALIDEZ'].apply(lambda x: True if x == 2 else False)
            hauls_table.loc[:, 'special'] = special

            fields = list(self.fields_haul.values())
            fields.extend(['station_id', 'stratum_id', 'sampler_id', 'trawl_id', 'sampler_type', 'valid', 'special'])

            hauls_table = file[fields]

            new_fields = list(self.fields_haul.keys())
            new_fields.extend(
                ['station_id', 'stratum_id', 'sampler_id', 'trawl_id', 'sampler_type', 'valid', 'special'])

            hauls_table.columns = new_fields

            # the empty values must be saved as Na, so:
            hauls_table = hauls_table.replace('', pd.NA)

            return hauls_table

        except Exception as e:
            self.add_error("Error formatting surveys table: {}".format(e))

    def import_data(self):
        """
        Import csv file with trips data.
        The hauls file to import from old Camp is saved in two different models: one with generic characteristics and
        other with the specific characteristics ot trawl.
        :return:
        """

        # Create your engine.
        engine = create_engine('sqlite:///db.sqlite3', echo=settings.DEBUG)

        # check there aren't already saved
        if Haul.objects.filter(station__survey=self.survey_object).exists():
            self.add_error(
                "<p>The hauls from this survey have already been saved in the database. No hauls have"
                "been added or changed.</p>")
        else:
            hauls_table = self.format_table(self.hauls_file)
            try:
                hauls_table.to_sql("hauls_haul", con=engine, if_exists="append", index=False)
                self.add_message("Hauls imported successfully.")
            except Exception as e:
                self.add_error(f"Error importing hauls: {e}")

        return self.get_response()
