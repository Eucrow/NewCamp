from surveys.models import Survey
from django import forms

class SurveysForm(forms.ModelForm):
    """
    Formulario para el modelo Surveys
    """

    class Meta:
        model = Survey
        fields = '__all__'