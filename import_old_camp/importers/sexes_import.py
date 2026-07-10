from django.conf import settings
from sqlalchemy import create_engine

from import_old_camp.importers.base import BaseImport
from import_old_camp.utils.db_helpers import get_catch_id
from import_old_camp.utils.utils import all_species_exists_in_file
from samples.models import Sex
from species.models import Sp


class SexesImport(BaseImport):

    def __init__(self, request):
        super().__init__(request, "lengths")
        self.request = request
        self.fields_sexes = {
            'sex': "SEXO",
        }

    @staticmethod
    def get_measurement_type(grupo, esp):
        """
        Get the measurement type id. Used in pandas apply function.

        :return: Measurement type id.
        """
        try:
            sp = Sp.objects.select_related('measurement_type').get(group=grupo, sp_code=esp)
            measurement_type = sp.measurement_type

            if measurement_type is None:
                raise ValueError(f"No MeasurementType associated with species: group={grupo}, sp_code={esp}")

            return measurement_type.id

        except Sp.DoesNotExist:
            raise ValueError(f"Species with group={grupo} and sp_code={esp} does not exist")

    def format_table(self, file):
        lengths_table = self.lengths_file

        # get the catch grouped
        sexed_table = lengths_table[['LANCE', 'GRUPO', 'ESP', 'CATE', 'SEXO']].drop_duplicates()
        sexed_table['catch_id'] = sexed_table.apply(get_catch_id, axis=1, args=[self.survey_name])
        sexed_table['measurement_type_id'] = sexed_table.apply(
            lambda row: self.get_measurement_type(row["GRUPO"], row["ESP"]), axis=1)

        fields = list(self.fields_sexes.values())
        fields.extend(['catch_id'])
        fields.extend(['measurement_type_id'])

        sexed_table = sexed_table[fields]

        new_fields = list(self.fields_sexes.keys())
        new_fields.extend(['catch_id'])
        new_fields.extend(['measurement_type_id'])

        sexed_table.columns = new_fields

        return sexed_table

    def import_data(self):

        lengths_file = self.lengths_file

        sp_exists, missing_species = all_species_exists_in_file(lengths_file)
        # check if all species exists
        if sp_exists is False:
            self.add_error(f"The following species are not previously saved in the species master. "
                           f"Add them before importing the lengths file again: {missing_species}")

        # create categories if it doesn't exist in species_category
        # check_or_create_categories(lengths_file)

        # Create engine.
        db_path = settings.DATABASES['default']['NAME']
        engine = create_engine(f'sqlite:///{db_path}', echo=settings.DEBUG)

        # check there aren't already saved sexes of the survey
        if Sex.objects.filter(catch_id__haul_id__station_id__survey_id__acronym=self.survey_name):
            self.add_message(
                "<p>The sexes from this survey have already been saved in the database. No sexes have been added or changed.</p>")
        else:
            try:
                sexes_table = self.format_table(lengths_file)
                sexes_table.to_sql("samples_sex", con=engine, if_exists="append", index=False)
                self.add_message("Lengths has been successfully saved in sexes table.")
            except Exception as e:
                self.add_error("Error importing sexes table: {}".format(e))
                raise Exception(self.errors[-1])

        return self.get_response()
