from datetime import datetime

from typing import Any

from django.http import HttpResponse

from import_old_camp.importers.base import BaseImport
from import_old_camp.utils.converters import fix_year_date
from import_old_camp.utils.db_helpers import get_ship
from import_old_camp.utils.utils import get_file_dbf, get_type_survey
from stratifications.models import Stratification
from surveys.models import Survey


class SurveysImport(BaseImport):
    # Call parent constructor
    def __init__(self, request):
        super().__init__(request, "camp")
        self.survey_file = get_file_dbf(request, "camp")
        self.survey_object = self.get_survey_object()

    def format_table(self, file) -> Any:
        pass

    def import_data(self):
        """
        Function to import the file with survey info.
        :return: Http Response
        """

        try:
            stratification_name = get_type_survey(self.request.FILES["camp"].name) + "-sector-profundidad"

            stratification_id = Stratification.objects.get(stratification=stratification_name).id

            if Survey.objects.filter(acronym=self.survey_file['CLAV']).exists():
                self.add_message('<p>The survey ' + str(
                    self.survey_file['CLAV']) + ' already exists in newCamp. No survey has been added or changed.</p>')

            # save survey model
            tmp = Survey()
            tmp.acronym = self.survey_file['CLAV'][0]
            tmp.description = self.survey_file['IDENT'][0]
            tmp.width_x = self.survey_file['CUX'][0]
            tmp.width_y = self.survey_file['CUY'][0]
            tmp.origin_x = self.survey_file['OCUX'][0]
            tmp.origin_y = self.survey_file['OCUY'][0]
            tmp.ship = get_ship(self.survey_file['BARCO'][0])
            tmp.hauls_duration = self.survey_file['DURLAN'][0]
            if tmp.start_date is not None: tmp.start_date = datetime.strptime(
                fix_year_date(self.survey_file['COMI'][0]),
                '%d/%m/%y').date()
            if tmp.end_date is not None: tmp.end_date = datetime.strptime(fix_year_date(self.survey_file['FINA'][0]),
                                                                          '%d/%m/%y').date()
            tmp.stratification_id = stratification_id

            tmp.save()

            self.add_message(f"The survey {self.survey_file['CLAV'][0]} has been saved.")

        except Exception as e:
            self.add_error("Error formatting species table: {}".format(e))

        return self.get_response()
