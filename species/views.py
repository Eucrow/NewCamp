from django.shortcuts import render
from django.urls import reverse_lazy
from django.views import View
from django.views.generic import DetailView, DeleteView, UpdateView

from species.apps import importSpeciesCSV
from species.models import Sp
from species.forms import SpeciesForm


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


