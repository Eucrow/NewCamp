from django.http import HttpResponse

from rest_framework.status import HTTP_201_CREATED

from import_old_camp.importers.catches_import import CatchesImport
from import_old_camp.importers.faunas_import import FaunasImport
from import_old_camp.importers.hauls_import import HaulsImport
from import_old_camp.importers.haul_trawls_import import HaulTrawlsImport
from import_old_camp.importers.hydrographies_import import HydrographiesImport
from import_old_camp.importers.lengths_import import LengthsImport
from import_old_camp.importers.meteorologies_import import MeteorologiesImport
from import_old_camp.importers.sampled_weights_import import SampledWeightsImport
from import_old_camp.importers.sexes_import import SexesImport
from import_old_camp.importers.species_import import SpeciesImport
from import_old_camp.importers.surveys_import import SurveysImport

from import_old_camp.utils.utils import get_file_dbf, get_type_survey

from newcamp.apps import empty

from strata.models import Stratum
from stratifications.models import Stratification


def create_stratification(stratification_name):
    """
    This function creates a new Stratification object if it does not already exist.

    Parameters:
    stratification_name (str): The name of the stratification to be created.

    Returns:
    HttpResponse: An HTTP response indicating the success or failure of the operation.
    """
    message = []
    if not Stratification.objects.filter(stratification=stratification_name).exists():
        stratification_object = Stratification.objects.create(
            # stratification=stratification_name,
            # comment="In Demersales surveys, the stratification is a combination of geographic sector and depth."
            stratification=stratification_name,
            description="In Demersales surveys, the stratification is a combination of geographic sector and depth."
        )
        message.append("<p>The stratification " + stratification_name + " has been created.</p>")
    else:
        message.append("<p>The stratification " + stratification_name + " already exists.</p>")

    return HttpResponse(message, status=HTTP_201_CREATED)


def create_stratum(request):
    """
    This function is used to create stratum instances based on the data provided in the request.
    It reads the data from the request, formats it, and then creates new Stratum objects in the database.

    Parameters:
    request (HttpRequest): The request object containing the data for creating the stratum.

    Returns:
    HttpResponse: An HTTP response indicating the success or failure of the operation.
    """

    df = get_file_dbf(request, 'survey')
    survey_file = df.to_dict('records')

    sectors_col_names = [1, 2, 3, 4, 5]
    sectors_names = ["MIÑO-FINISTERRE", "FINISTERRE-ESTA", "ESTACA-PEÑAS", "PEÑAS-AJO", "AJO-BIDASOA"]
    # dept_col_names "D" and "E" doesn't have data so its depths_names are "without depth 1" and "without
    # depth 2"
    depth_col_names = ["A", "B", "C", "D", "E"]
    depths_names = ["70-120", "120-200", "200-500", "without depth 1", "without depth 2"]

    stratification = get_type_survey(request.FILES['survey'].name) + "-sector-profundidad"
    stratification_object = Stratification.objects.get(stratification=stratification)

    message = []

    for row in survey_file:

        for s in sectors_col_names:
            for d in depth_col_names:

                area_col = "C" + str(s) + d

                depth_index = depth_col_names.index(d)
                name_stratification = sectors_names[s - 1] + "-" + depths_names[depth_index]

                area = row[area_col]

                # some depth-sector doesn't have info (columns C1D, C1E...)
                if not empty(area):

                    if Stratum.objects.filter(stratum=name_stratification).exists():
                        message.append("<p>The stratum " + name_stratification + " already exists.</p>")
                    else:
                        Stratum.objects.create(
                            stratum=name_stratification,
                            area=row[area_col],
                            comment="<p>In Demersales surveys, the stratification is a combination of geographic sector and " \
                                    "depth.</p> ",
                            stratification_id=stratification_object.id
                        )

                else:
                    message.append("<p>There aren't areas of stratification " + area_col + ".</p>")

    Stratum.objects.get_or_create(
        stratum="not_assigned",
        area=0,
        comment="<p>In Demersales surveys, the stratification is a combination of geographic sector and " \
                "depth.</p> ",
        stratification_id=stratification_object.id
    )

    return HttpResponse(message, status=HTTP_201_CREATED)


class OldCampImport:
    """
    Import all the tables from old CAMP in newCamp tables.
    The files required are CAMPXXx.csv, LANCEXXX.csv, FAUNAXXX.csv, NTALLXXX.csv, and HIDROXXX.csv
    """

    def __init__(self, request):
        self.sectors_col_names = [1, 2, 3, 4, 5]
        self.sectors_names = ["MIÑO-FINISTERRE", "FINISTERRE-ESTA", "ESTACA-PEÑAS", "PEÑAS-AJO", "AJO-BIDASOA"]
        # dept_col_names "D" and "E" doesn't have data so the depths_names of them are "without depth 1" and "without
        # depth 2"
        self.depth_col_names = ["A", "B", "C", "D", "E"]
        self.depths_names = ["70-120", "120-200", "200-500", "without depth 1", "without depth 2"]
        self.stratification_name = get_type_survey(request.FILES['survey'].name) + "-sector-profundidad"
        self.request = request

    def import_complete(self):
        stratification_name = get_type_survey(self.request.FILES['survey'].name) + "-sector-profundidad"

        stratification = create_stratification(stratification_name)

        stratum = create_stratum(self.request)

        survey = SurveysImport(self.request)
        survey_import = survey.import_data()

        hauls = HaulsImport(self.request)
        hauls_import = hauls.import_data()

        meteo = MeteorologiesImport(self.request)
        meteo_import = meteo.import_data()

        haul_trawl = HaulTrawlsImport(self.request)
        haul_trawl_import = haul_trawl.import_data()

        # Is mandatory that NTALL file will be imported before FAUNA file.
        # The NTALL file is imported in sex, catches, sampled_weight and lengths tables.

        catches = CatchesImport(self.request)
        catches_import = catches.import_data()

        sex = SexesImport(self.request)
        sex_import = sex.import_data()

        sampled_weight = SampledWeightsImport(self.request)
        sampled_weight_import = sampled_weight.import_data()

        lengths = LengthsImport(self.request)
        lengths_import = lengths.import_data()

        # The catches table is filled first in the import of NTALL file. In this import only the
        # species measured has been saved. With the FAUNA file, only of species which haven't been
        # measured must be stored because it is used to_sql from pandas library.
        faunas = FaunasImport(self.request)
        faunas_import = faunas.import_data()

        hydro = HydrographiesImport(self.request)
        hydrography_import = hydro.import_data()

        return HttpResponse([stratification.content,
                             stratum.content,
                             survey_import.content,
                             hauls_import.content,
                             meteo_import.content,
                             haul_trawl_import.content,
                             sex_import.content,
                             catches_import.content,
                             sampled_weight_import.content,
                             lengths_import.content,
                             faunas_import.content,
                             hydrography_import.content
                             ])

    def import_species(self):
        species = SpeciesImport(self.request)
        species_import = species.import_data()

        response = [species_import.content]

        return HttpResponse(response)

    def import_hydrographies(self):
        hydro = HydrographiesImport(self.request)
        hydrography_import = hydro.import_data()

        response = [hydrography_import.content]

        return HttpResponse(response)
