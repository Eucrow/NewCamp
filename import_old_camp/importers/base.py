from abc import ABC, abstractmethod
from typing import Any, Optional, List

from django.http import HttpResponse
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED

from newcamp.utils import get_survey_name


class BaseImport(ABC):
    """Base class for all import operations with common functionality."""

    def __init__(self, request: Any, file_type: str = None):
        """
        Initialize base import class.
        :param request: Django request object
        :param survey_name: Optional survey name
        """
        self.request = request
        self.survey_name = get_survey_name(request.FILES[file_type].name)
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
            self.add_error(f"Survey with acronym '{name}' does not exist")
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
