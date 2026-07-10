from abc import ABC, abstractmethod
from typing import Any, Optional, List

from django.http import HttpResponse, JsonResponse
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED

from import_old_camp.utils.utils import get_file_dbf
from newcamp.utils import get_survey_name


class BaseImport(ABC):
    """Base class for all import operations with common functionality."""

    def __init__(self, request: Any, file_type: str = None):
        """
        Initialize base import class.
        :param request: Django request object
        :param survey_name: Optional survey name
        """
        self.file_type = file_type
        self.request = request
        self.survey_name = get_survey_name(request.FILES[file_type].name)
        self.messages: List[str] = []
        self.errors: List[str] = []

        if self.file_type:
            variable_name = self.file_type + "_file"
            setattr(self, variable_name, self.get_data_file(request, self.file_type))

    def get_data_file(self, request, data_file_attr):
        """Get the data file from the request."""
        return get_file_dbf(request, data_file_attr)

    def add_message(self, message: str) -> None:
        """Add a success message."""
        self.messages.append(str(message))

    def add_error(self, error: str) -> None:
        """Add an error message."""
        self.errors.append(str(error))

    def get_result(self):
        return {
            "messages": self.messages,
            "errors": self.errors,
            "has_errors": self.has_errors(),
        }

    def has_errors(self) -> bool:
        """Check if there are any errors."""
        return len(self.errors) > 0

    def get_response(self) -> HttpResponse:
        """
        Generate HTTP response based on messages and errors.
        :return: HttpResponse with appropriate status
        """
        if self.has_errors():
            return JsonResponse({
                'errors': self.errors,
                'messages': self.messages
            }, status=HTTP_400_BAD_REQUEST)
        else:
            return JsonResponse({'messages': self.messages}, status=HTTP_201_CREATED)

    def get_survey_object(self, survey_name: Optional[str] = None):
        """
        Get survey object by name.
        :param must_exist:
        :param survey_name: Survey name (uses self.survey_name if not provided)
        :return: Survey object or None if not found
        """
        from surveys.models import Survey
        from django.core.exceptions import ObjectDoesNotExist

        name = survey_name or self.survey_name
        if not name:
            self.add_error("Survey name is required")
            return None

        try:
            return Survey.objects.get(acronym=name)
        except ObjectDoesNotExist:
            return None

    @abstractmethod
    def format_table(self, data) -> Any:
        """
        Abstract method to format data table.
        Must be implemented by subclasses.
        :param data: Input data to format
        :return: Formatted data
        """
        pass

    @abstractmethod
    def import_data(self) -> HttpResponse:
        """
        Abstract method to perform the import operation.
        Must be implemented by subclasses.
        :return: HttpResponse
        """
        pass
