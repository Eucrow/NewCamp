import pandas as pd
from django.conf import settings
from django.http import JsonResponse
from sqlalchemy import create_engine

from catches.models import Catch
from import_old_camp.importers.base import BaseImport
from import_old_camp.utils.db_helpers import get_sp_id, get_haul_id
from newcamp.utils import get_create_sampler_object


def detect_duplicated_haul_species(catches_df):
    duplicated_catches = catches_df.duplicated(subset=['LANCE', 'GRUPO', 'ESP'], keep=False)
    exists_duplicated = duplicated_catches.any()

    if exists_duplicated:
        duplicated = catches_df[duplicated_catches]
        duplicated = duplicated.drop_duplicates(subset=['LANCE', 'GRUPO', 'ESP'])
        duplicated_str = duplicated.to_string(index=False)
        return duplicated, duplicated_str
    else:
        return False, ""


class FaunasImport(BaseImport):

    def __init__(self, request):  # Call parent constructor
        super().__init__(request, "fauna")
        self.survey_object = self.get_survey_object()
        self.sampler_object = get_create_sampler_object(sampler_name="ARRASTRE")

    def format_table(self, file):

        catches_table = file

        duplicated_catches, duplicated_catches_str = detect_duplicated_haul_species(catches_table)

        if duplicated_catches is not False:
            duplicated_species = duplicated_catches[["LANCE", "GRUPO", "ESP"]]
            this_error = {
                "message": "The FAUNA file contains duplicated species: ",
                "header": [duplicated_species.columns.values.tolist()],
                "rows": [duplicated_species.values.tolist()]
            }

            # self.add_error(f"The FAUNA file contains duplicated catches: {duplicated_catches_str}")
            self.add_error(this_error)
            raise Exception('\n'.join(str(e) for e in self.errors))

        # The catches table is filled first in the import of NTALL file. In this importation only the
        # species measured has been saved. With the FAUNA file, only species which hasn't been
        # measured must be stored because it is used to_sql from pandas library.

        def anti_join(x, y, on):
            """Return rows in x which are not present in y"""
            ans = pd.merge(left=x, right=y, how='left', indicator=True, on=on)
            ans = ans.loc[ans._merge == 'left_only', :]
            return ans

        # previously saved in the catches table:
        in_catches = Catch.objects.filter(haul__station__survey=self.survey_object).values()
        in_catches = pd.DataFrame(list(in_catches))
        in_catches = in_catches[['sp_id', 'category', 'haul_id']].drop_duplicates()

        # def get_cat_1_id(row):
        #     sp = Sp.objects.get(group=row['GRUPO'], sp_code=row['ESP'])
        #     cat_id = get_or_create_categories(sp=sp, category_name='1').id
        #     return cat_id

        # catches_table['category_id'] = catches_table.apply(get_cat_1_id, axis=1)
        # The category must always be 1 because only the measured species can have more than
        # one category, and that one is stored previously, when FAUNA file is imported.
        catches_table['category'] = 1
        catches_table['sp_id'] = catches_table.apply(get_sp_id, axis=1)
        catches_table['haul_id'] = catches_table.apply(get_haul_id, axis=1, args=[self.survey_name])
        catches_table['weight'] = catches_table['PESO_GR']
        catches_table['not_measured_individuals'] = catches_table['NUMERO']

        catches_table = catches_table[['haul_id', 'sp_id', 'category', 'weight', 'not_measured_individuals']]

        # catches to save = all catches in fauna file - previously saved in catches table
        catches_to_save_table = anti_join(catches_table, in_catches, ['sp_id', 'category', 'haul_id'])

        catches_to_save_table = catches_to_save_table[
            ['sp_id', 'category', 'haul_id', 'weight', 'not_measured_individuals']]

        return catches_to_save_table

    def import_data(self):
        """
        Import file with faunas data.
        :return: http response
        """
        try:

            catches_file = self.fauna_file

            # Create engine.
            db_path = settings.DATABASES['default']['NAME']
            engine = create_engine(f'sqlite:///{db_path}', echo=settings.DEBUG)

            # Cant' check if there aren't already saved, because in the format_catch_table are selected the
            # catches which aren't saved yet because they don't had been measured
            catches_table = self.format_table(catches_file)
            catches_table.to_sql("catches_catch", con=engine, if_exists="append", index=False)
            self.add_message("Faunas has been successfully saved in catches table.")

        except Exception as e:
            self.add_error("Error importing faunas table: {}".format(e))
            # raise Exception(self.errors[-1])
            raise Exception('\n'.join(str(e) for e in self.errors))

        return self.get_response()
