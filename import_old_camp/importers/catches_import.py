from django.conf import settings
from sqlalchemy import create_engine

from catches.models import Catch
from import_old_camp.importers.base import BaseImport
from import_old_camp.utils.db_helpers import species_exists, get_sp_id, get_haul_id, species_not_exists_in_db
from import_old_camp.utils.utils import all_species_exists_in_file


class CatchesImport(BaseImport):

    def __init__(self, request):
        super().__init__(request, "lengths")
        self.survey_object = self.get_survey_object()

    def format_table(self, file):

        catches_table = file

        catches_table = catches_table[['LANCE', 'GRUPO', 'ESP', 'CATE', 'SEXO', 'PESO_GR']].drop_duplicates()

        if species_exists(file):
            catches_table['sp_id'] = catches_table.apply(get_sp_id, axis=1)
            catches_table['category'] = catches_table['CATE']
            catches_table['haul_id'] = catches_table.apply(get_haul_id, axis=1, args=[self.survey_name])
            catches_table['weight'] = catches_table['PESO_GR']

            catches_table = catches_table[['sp_id', 'category', 'haul_id', 'weight']]
            catches_table = catches_table.drop_duplicates()

            return catches_table
        else:
            not_exists = species_not_exists_in_db(file)
            self.add_error(f"The next species are not previously saved in species master. Add it before import file"
                           f" again: {not_exists}",
                           )
            return None

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
        engine = create_engine('sqlite:///db.sqlite3', echo=settings.DEBUG)

        # catches
        # check there aren't already saved catches of the survey
        # if Catch.objects.filter(haul_id__station_id__survey_id__acronym=self.survey_name):
        if Catch.objects.filter(haul__station__survey=self.survey_object).exists():
            self.add_error("The catches from this survey have already been saved in the database. No catches have"
                           "been added or changed.")
        else:
            catches_table = self.format_table(lengths_file)
            try:
                catches_table.to_sql("catches_catch", con=engine, if_exists="append", index=False)
                self.add_message("Catches has been successfully saved in catches table.")
            except Exception as e:
                self.add_error(f"Error importing catches table: {e}")
                raise Exception(self.errors[-1])

        return self.get_response()
