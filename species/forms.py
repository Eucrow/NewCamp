from django import forms
from django.core.exceptions import ValidationError

from species.models import Sp

class SpeciesForm(forms.ModelForm):
    """
    Formulario para el modelo Species
    """

    class Meta:
        model = Sp
        fields = '__all__'
