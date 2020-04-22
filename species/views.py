import csv

import io
from django.shortcuts import render
from django.http import HttpResponse
from django.urls import reverse, reverse_lazy
from django.views import View
from django.views.generic import DetailView, DeleteView, UpdateView
from rest_framework.status import HTTP_201_CREATED

from species.apps import importSpeciesCSV
from species.models import Sp
from species.forms import SpeciesForm
from species.serializers import SpeciesSerializer
from newcamp.apps import convert_comma_to_dot, empty


class SpeciesQueryset(object):
    def get_species_queryset(self):
        """
        Returns: query with the list of species
        """
        species = Sp.objects.all()

        return species


class SpeciesView(View, SpeciesQueryset):
    def get(self, request):
        """
        Return the list of species
        """
        species = self.get_species_queryset()
        context = {
            'species_list': species
        }
        return render(request, 'species/species.html', context)


class CreateSpeciesView(View, SpeciesQueryset):
    def get(self, request):
        """
        Muestra un formulario para crear una especie
        Args:
            request: HttpRequest
        Returns: HttpResponse
        """
        form = SpeciesForm()
        context = {
            'form': form,
            'success_message': ''
        }
        return render(request, 'species/new_species.html', context)

    def post(self, request):
        """
        Crea una especie según la información recibida por POST
        Args:
            request: HttpRequest
        Returns: HttpResponse
        """
        success_message = ''

        sp = Sp()  # creo un objeto Specie
        form = SpeciesForm(request.POST,
                           instance=sp)  # y al formulario le decimos que se base en la instancia que de sp

        if form.is_valid():
            new_sp = form.save()  # guarda el objeto  y me lo devuelve
            form = SpeciesForm()
            success_message = 'guardado con éxito'

            species = self.get_species_queryset()

            context = {
                'form': form,
                'success_message': success_message,
                'species_list': species
            }
            return render(request, 'species/species.html', context)
        else:
            return render(request, 'species/new_species.html', {'form': form})


class SpDetailView(DetailView):
    model = Sp

    template_name = 'species/sp_detail.html'


class SpDeleteView(DeleteView):
    model = Sp

    success_url = reverse_lazy('species_list')


class SpEditView(UpdateView):
    model = Sp

    fields = '__all__'
    template_name_suffix = '_update_form'
    success_url = reverse_lazy('species_list')


class ImportSpeciesFileView(View):
    def get(self, request):
        """
        Muestra un formulario para crear una foto
        Args:
            request: HttpRequest
        Returns: HttpResponse
        """
        return render(request, 'species/import_species.html')

    def post(self, request):
        post_form = importSpeciesCSV(request.FILES)
        # post_form = importSpeciesCSV('ESPECIES_PARA_IMPORTAR.csv')
        success_message = 'guardado con éxito'

        context = {
            'success_message': success_message,
        }
        return render(request, 'species/species.html', context)


class SpeciesImport():

    def import_species_csv(self):
        """
        Function to import the CSV file with species info.
        To import again the file, first must truncate the table.
        :param file: file to import
        :return:
        """

        objfile = self.request.FILES['file']

        objfile.seek(0)
        '''seek(0) move the pointer to read the file to the first position. I do this to be
        sure that the file is readed from the beginig'''
        csv_file = csv.DictReader(io.StringIO(objfile.read().decode('utf-8')), delimiter=';')

        message = []

        for row in csv_file:
            tmp = {}
            tmp["group"] = row["GRUPO"]
            tmp["sp_code"] = row["ESP"]
            tmp["sp_name"] = row["ESPECIE"]
            #tmp["family"] = row["FAMILIA"]
            #tmp["author"] = row["AUTOR"]
            tmp["spanish_name"] = row["NOMBREE"]
            #tmp["english_name"] = row["NOMBREI"]
            if not empty(row["A"]):
                tmp["a_param"] = float(row["A"].replace(',', '.'))
            if not empty(row["B"]):
                tmp["b_param"] = float(row["B"].replace(',', '.'))
            if not empty(row["LINF"]):
                tmp["l_infinity"] = float(row["LINF"].replace(',','.'))
            if not empty(row["K"]):
                tmp["k"] = float(row["K"].replace(',','.'))
            if not empty(row["T0"]):
                tmp["t_zero"] = float(row["T0"].replace(',','.'))
            tmp["unit"] = row["MED"]
            tmp["increment"] = row["INCREM"]
            #tmp["nodc"] = row["NODC"] or 0
            tmp["trophic_group"] = row["GT"] or 0
            tmp["APHIA"] = row["APHIA"] or 0

            serializer = SpeciesSerializer(data=tmp)

            serializer.is_valid(raise_exception=True)

            serializer.save()

            message.append('Se ha añadido la especie ' + row['ESPECIE'])

        return HttpResponse(message, status=HTTP_201_CREATED)
