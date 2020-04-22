from import_export import resources
from .models import Fauna


class FaunaResource(resources.ModelResource):
    class Meta:
        model = Fauna
