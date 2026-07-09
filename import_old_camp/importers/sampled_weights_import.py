from django.conf import settings
from django.http import HttpResponse
from rest_framework.status import HTTP_201_CREATED
from sqlalchemy import create_engine

from import_old_camp.importers.base import BaseImport
from import_old_camp.utils.db_helpers import get_catch_id, species_exists, species_not_exists_in_db
from import_old_camp.utils.utils import all_species_exists_in_file
from newcamp.utils import get_create_sampler_object
from samples.models import SampledWeight


class SampledWeightsImport(BaseImport):

    def __init__(self, request):
        super().__init__(request, "lengths")

        self.sampler_object = get_create_sampler_object(sampler_name='ARRASTRE')

        self.fields_sampled_weight = {
            'sampled_weight': 'PESO_M',
        }

    def format_table(self, file):
        sw_table = file

        sw_table = sw_table[['LANCE', 'GRUPO', 'ESP', 'CATE', 'PESO_GR', 'PESO_M']].drop_duplicates()
        sw_table = sw_table[sw_table['PESO_GR'] != sw_table['PESO_M']]
        if species_exists(file):
            sw_table['catch_id'] = sw_table.apply(get_catch_id, axis=1, args=[self.survey_name])
            sw_table['sampled_weight'] = sw_table['PESO_M']
            sw_table = sw_table[['catch_id', 'sampled_weight']]
            return sw_table
        else:
            not_exists = species_not_exists_in_db(file)
            raise TypeError(
                ["The next species are not previously saved in species master. Add it before import file again:",
                 not_exists])

    def import_data(self):

        lengths_file = self.lengths_file

        # check if all species exists
        sp_exists, missing_species = all_species_exists_in_file(lengths_file)
        # check if all species exists
        if sp_exists is False:
            self.add_error(f"The following species are not previously saved in the species master. "
                           f"Add them before importing the lengths file again: {missing_species}")

        # Create engine.
        engine = create_engine('sqlite:///db.sqlite3', echo=settings.DEBUG)

        # sampled weight
        # check there aren't already saved lengths of the survey
        if SampledWeight.objects.filter(catch_id__haul_id__station_id__survey_id__acronym=self.survey_name):
            self.messages.append(
                "<p>The sampled weights from this survey have already been saved in the database. No sampled"
                "weights have been added or changed.</p>")
        else:
            try:
                sampled_weight_table = self.format_table(lengths_file)
                sampled_weight_table.to_sql("samples_sampledweight", con=engine, if_exists="append", index=False)
                self.add_message("Lengths has been successfully saved in sampled weights table.")
            except Exception as e:
                self.add_error("Error importing sampled weights table: {}".format(e))
                raise Exception(self.errors[-1])

        return self.get_response()
