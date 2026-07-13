from typing import List

from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.db import models

from django.http import HttpResponse
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED
from sqlalchemy import create_engine

from import_old_camp.utils.utils import get_file_dbf, get_unit_name
from species.models import MeasurementType, Sp


class SpeciesImport:
    """Import class for species data."""

    def __init__(self, request):
        self.species_file = get_file_dbf(request, "species")
        self.fields_species = {
            "group": "GRUPO",
            "sp_code": "ESP",
            "sp_name": "ESPECIE",
            "spanish_name": "NOMBREE",
            "a_param": "A",
            "b_param": "B",
            "unit": "MED",
            "increment": "INCREM",
            "APHIA": "APHIA",
        }
        self.messages: List[str] = []
        self.errors: List[str] = []

    def add_message(self, message: str) -> None:
        """Add a success message."""
        self.messages.append(message)

    def add_error(self, error: str) -> None:
        """Add an error message."""
        self.errors.append(error)

    def has_errors(self) -> bool:
        """Check if there are any errors."""
        return len(self.errors) > 0

    @staticmethod
    def normalize_integer_fields(df):
        """
        Replace empty strings with None for integer fields defined in the Sp model.
        :param df: pandas DataFrame
        :return: normalized DataFrame
        """
        integer_field_types = (
            models.IntegerField,
            models.BigIntegerField,
            models.SmallIntegerField,
            models.PositiveIntegerField,
            models.PositiveSmallIntegerField,
        )

        integer_field_names = [
            field.name
            for field in Sp._meta.get_fields()
            if isinstance(field, integer_field_types)
        ]

        for field_name in integer_field_names:
            if field_name in df.columns:
                df[field_name] = df[field_name].replace('', None)
                df[field_name] = df[field_name].replace(0, None)

        return df

    def get_response(self) -> HttpResponse:
        """
        Generate HTTP response based on messages and errors.
        :return: HttpResponse with appropriate status
        """
        if self.has_errors():
            response_data = {
                'errors': self.errors,
                'messages': self.messages
            }
            return HttpResponse(response_data, status=HTTP_400_BAD_REQUEST)
        else:
            return HttpResponse(self.messages, status=HTTP_201_CREATED)

    def format_table(self, file):
        """
        Format species table - implementation of abstract method.
        :param file: Input file data
        :return: Formatted DataFrame
        """

        species_df = file.copy()

        try:
            # Select variables
            species_df = species_df[list(self.fields_species.values())]

            # Change variable names
            species_df.columns = self.fields_species.keys()

            # Add default columns
            species_df['comment'] = ""
            species_df['measurement_type_id'] = ""

            # Normalize integer fields
            # species_df = self.normalize_integer_fields(species_df)

            self.add_message("Species table formatted successfully")

            return species_df
        except Exception as e:
            self.add_error("Error formatting species table: {}".format(e))
            return None

    @staticmethod
    def get_measurement_type(row):
        """
        Get the measurement type id. Used in pandas apply function.
        :param row: row of the apply function
        :return: Measurement type id.
        """
        unit_name = get_unit_name(row['unit'], row['increment'])

        try:
            measurement_type = MeasurementType.objects.get(name=unit_name)
            return measurement_type.id
        except ObjectDoesNotExist:
            raise ValueError(f"MeasurementType object with name {unit_name} does not exist")

    def import_data(self) -> HttpResponse:
        """
        Import species data - implementation of abstract method.
        If the species_sp table is already filled, overwrite it.
        :return: HttpResponse
        """

        try:
            # Create your engine.
            db_path = settings.DATABASES['default']['NAME']
            engine = create_engine(f'sqlite:///{db_path}', echo=settings.DEBUG)

            # species
            species_table = self.format_table(self.species_file)

            if species_table is None:
                return self.get_response()

            # Apply measurement type
            species_table['measurement_type_id'] = species_table.apply(self.get_measurement_type, axis=1)
            species_table = species_table.drop(columns=['unit', 'increment'], axis=1)

            # Save to database
            # Previously use the argument if_exists="replace" to avoid partial saving of new species files.
            # But in this way, the primary key is not generated (to_sql not allow it) and change the original
            # structure without primary key.
            # At the end, I use if_exists="append" to maintain the original primary key.
            species_table.to_sql("species_sp", con=engine, if_exists="append", index="id")
            self.add_message(f"Successfully imported {len(species_table)} species records")

        except Exception as e:
            self.add_error("Error importing surveys table: {}".format(e))
            # raise Exception(self.errors[-1])
            raise Exception('\n'.join(str(e) for e in self.errors))
        return self.get_response()
