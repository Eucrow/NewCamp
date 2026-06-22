import pandas as pd
from django.http import HttpResponse
from rest_framework.status import HTTP_201_CREATED
from sqlalchemy import create_engine

from catches.models import Catch
from import_old_camp.importers.base import BaseImport
from import_old_camp.utils.db_helpers import get_catch_id, get_sex_id, species_exists, get_sp_id, get_haul_id, \
    species_not_exists_in_db
from import_old_camp.utils.utils import get_file_dbf, all_species_exists_in_file
from newcamp.utils import get_create_sampler_object
from samples.models import SampledWeight, Length, Sex
from species.models import Sp


class LengthsImport(BaseImport):

    def __init__(self, request):
        super().__init__(request, "ntall")
        self.sampler_object = get_create_sampler_object(sampler_name='ARRASTRE')
        self.ntall = get_file_dbf(request, "ntall")
        self.fields_lengths = {
            'length': 'TALLA',
            'number_individuals': 'NUMER',
        }

    @staticmethod
    def get_measurement_factor(row):
        """
        Get the measurement factor of the species. Used in pandas apply function.
        :param row: row of the apply function
        :return: Measurement factor
        """
        sp = Sp.objects.get(group=row['GRUPO'], sp_code=row['ESP'])
        return sp.measurement_type.conversion_factor

    def transform_length(self, row):
        """
        Fix the lengths of the species. Used in pandas apply function.
        If the unit is 1 (cm), the length is multiplied by 10. If the unit is 2 (mm), the length is not modified. If the
        unit is different, the length is not modified because it is assumed
        to be stored as mm.
        :param row: row of the apply function
        :return: Fixed lengths
        """

        measurement_factor = self.get_measurement_factor(row)

        return row['TALLA'] * measurement_factor

    def format_table(self, file):

        lengths_table = self.ntall

        # lengths
        lengths_df = lengths_table[['LANCE', 'GRUPO', 'ESP', 'CATE', 'SEXO']].drop_duplicates()
        lengths_df['catch_id'] = lengths_df.apply(get_catch_id, axis=1, args=[self.survey_name])
        lengths_df['sex_id'] = lengths_df.apply(get_sex_id, axis=1)

        # merge
        lengths_df = pd.merge(left=lengths_table, right=lengths_df, how='left',
                              on=['LANCE', 'GRUPO', 'ESP', 'CATE', 'SEXO'])

        lengths_df['TALLA'] = lengths_df.apply(self.transform_length, axis=1)
        # duplicated = lengths_df[['sex_id', 'TALLA', 'NUMER']].duplicated()
        # lengths_df_duplicted = lengths_df[duplicated]
        fields = list(self.fields_lengths.values())
        fields.extend(['sex_id'])

        lengths_df = lengths_df[fields]

        new_fields = list(self.fields_lengths.keys())
        new_fields.extend(['sex_id'])

        lengths_df.columns = new_fields

        return lengths_df

    def import_data(self):

        lengths_file = self.ntall

        # check if all species exists
        sp_exists, missing_species = all_species_exists_in_file(lengths_file)
        # check if all species exists
        if sp_exists is False:
            self.add_error(f"The following species are not previously saved in the species master. "
                           f"Add them before importing the lengths file again: {missing_species}")

        # create categories if it doesn't exist in species_category
        # check_or_create_categories(lengths_file)

        # Create engine.
        engine = create_engine('sqlite:///db.sqlite3', echo=True)

        # check there aren't already saved lengths of the survey
        if Length.objects.filter(sex_id__catch_id__haul_id__station_id__survey_id__acronym=self.survey_name):
            self.messages.append(
                "<p>Lengths of this survey already saved in database. Remove all the lengths of this "
                "survey before try to import it again. None of the lengths has been saved.</p>")
        else:
            lengths_table = self.format_table(lengths_file)
            lengths_table.to_sql("samples_length", con=engine, if_exists="append", index=False)

        return self.get_response()
