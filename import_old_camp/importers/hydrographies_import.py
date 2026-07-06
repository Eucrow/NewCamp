from datetime import datetime

import pandas as pd
from django.conf import settings
from sqlalchemy import create_engine

from gears.models import CTD
from hauls.models import Haul, HaulHydrography
from import_old_camp.importers.base import BaseImport
from import_old_camp.utils.converters import convert_position_camp_to_decimal, format_latitude_decimal
from newcamp.utils import get_create_sampler_object
from samplers.models import Sampler
from stations.models import Station


class HydrographiesImport(BaseImport):

    def __init__(self, request):
        super().__init__(request, "hydrographies")
        self.survey_object = self.get_survey_object()
        self.fields_hydrography = {
            "latitude": "LATITUD",
            "longitude": "LONGITUD",
            "date_time": "FECHA",
            "depth_probe": "SONDA",
            "cable": "CABLE",
            "depth": "PROF",
            "temperature_0": "TEMP0",
            "salinity_0": "SALI0",
            "sigma_0": "SIGMA0",
            "temperature_50": "TEMP50",
            "salinity_50": "SALI50",
            "sigma_50": "SIGMA50",
            "temperature_100": "TEMP100",
            "salinity_100": "SALI100",
            "sigma_100": "SIGMA100",
            "temperature": "TEMP",
            "salinity": "SALI",
            "sigma": "SIGMA",
            "comment": "OBSERV",
        }
        self.sampler_object = get_create_sampler_object("CTD")

    def format_table(self, hydrography_df):

        hydrography_df['latitude'] = hydrography_df["LATITUD"].apply(convert_position_camp_to_decimal)

        hydrography_df['longitude'] = hydrography_df["LONGITUD"].apply(convert_position_camp_to_decimal)

        hydrography_df['latitude'] = hydrography_df.apply(format_latitude_decimal, axis=1,
                                                          args=["LATITUD", "NOSU", "S"])

        hydrography_df['longitude'] = hydrography_df.apply(format_latitude_decimal, axis=1,
                                                           args=["LONGITUD", "NOSU", "W"])

        hydrography_df = hydrography_df.drop(['LATITUD', 'LONGITUD', 'NOSU'], axis=1)

        def unit_date_time(row, date_field, time_field):
            return datetime.strptime(str(row[date_field]) + " " + str(row[time_field]), '%Y-%m-%d %H.%M')

        hydrography_df['date_time'] = hydrography_df.apply(unit_date_time, axis=1, args=["FECHA", "HORA"])

        hydrography_df = hydrography_df.drop(['FECHA', 'HORA'], axis=1)

        # Create a reverse mapping from values to keys
        column_mapping = {value: key for key, value in self.fields_hydrography.items()}

        # Rename columns using the mapping (columns not in mapping will remain unchanged)
        hydrography_df = hydrography_df.rename(columns=column_mapping)

        return hydrography_df

    def import_data(self):
        """
        Function to import the CSV file with hydrography data.
        :return:
        """
        hydrographies_df = self.format_table(self.hydrographies_file)

        # check there aren't already saved hydrographies of the survey
        if HaulHydrography.objects.filter(haul_id__station_id__survey_id__acronym=self.survey_name):
            self.add_message(
                "The hydrographies from this survey have already been saved in the database. No hydrographies"
                "have been added or changed.")
        else:
            try:
                # station
                # The station of hydrography haul is the station of the trawl haul (which is stored in the 'haul' field
                # of hydrography file), so first we identify it:
                sampler_object = Sampler.objects.get(sampler="CTD")

                # gear
                # By default we use the same gear for all the hydrography hauls
                ctd_object, created = CTD.objects.get_or_create(name="1", brand="default brand", model="default model")

                def create_hydro_station(row):
                    station_object, created = Station.objects.get_or_create(
                        station=row['LANCE'],
                        survey=self.survey_object,
                    )
                    row['station'] = station_object
                    return row

                def create_hydro_haul(row, sampler_object, ctd_object):
                    haul_object, created = Haul.objects.get_or_create(
                        haul=row['ESTN'],
                        sampler=sampler_object,
                        station=row['station'],
                        ctd=ctd_object,
                        sampler_type="CTD",
                    )
                    row['haul_id'] = haul_object.id
                    return row

                hydrographies_df = hydrographies_df.apply(create_hydro_station, axis=1)
                hydrographies_df = hydrographies_df.apply(create_hydro_haul, axis=1, args=[sampler_object, ctd_object])

                columns = list(self.fields_hydrography.keys()) + ['haul_id']
                hydrographies_df = hydrographies_df[columns]

                # the empty values must be saved as Na, so:
                hydrographies_df = hydrographies_df.replace('', pd.NA)

                engine = create_engine('sqlite:///db.sqlite3', echo=settings.DEBUG)

                hydrographies_df.to_sql("hauls_haulhydrography", con=engine, if_exists="append", index=False)

                self.add_message("Hydrographies imported successfully.")

            except Exception as e:
                self.add_error(f"Error importing hydrographies: {e}")

        return self.get_response()
