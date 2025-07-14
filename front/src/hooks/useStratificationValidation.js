import { useState, useEffect, useCallback, useContext } from "react";
import StratificationsContext from "../contexts/StratificationsContext";

/**
 * Custom hook for handling form validation in stratification forms.
 * Validates required fields and prevents creating duplicate stratifications.
 * Checks if a stratification name already exists in the system.
 *
 * @param {Object} stratification - The stratification form data object
 * @param {string} stratification.stratification - The stratification name (required field)
 * @param {Object} [originalStratification=null] - The original stratification data when editing (optional)
 * @param {string} [originalStratification.stratification] - The original stratification name
 *
 * @returns {Object} Validation state and errors
 * @returns {boolean} stratificationExists - Whether a stratification with the same name already exists
 * @returns {boolean} requiredFields - Whether all required fields are valid
 * @returns {boolean} isFormValid - Whether the entire form is valid (no duplicates and required fields filled)
 * @returns {Object} errors - Object containing error messages for validation failures
 * @returns {string|null} errors.stratificationExists - Error message if stratification already exists
 * @returns {string|null} errors.requiredFields - Error message if required fields are missing
 */
export const useStratificationValidation = (
  stratification,
  originalStratification = null
) => {
  // State to hold all validation-related values
  const [validationState, setValidationState] = useState({
    stratificationExists: false,
    requiredFieldsValid: false,
    isFormValid: false,
    errors: {
      stratificationExists: null,
      requiredFields: null,
    },
  });

  const stratificationsContext = useContext(StratificationsContext);
  /**
   * Validates that all required fields are filled.
   * Currently only checks that the stratification name is provided.
   *
   * @returns {boolean} Whether all required fields are valid
   */
  const validateRequiredFields = useCallback(() => {
    const requiredFields = {
      stratification: stratification.stratification,
    };

    const isValid = Object.values(requiredFields).every(
      value => value !== null && value !== ""
    );

    return isValid;
  }, [stratification.stratification]);

  /**
   * Checks if a stratification name already exists in the system.
   * When editing, excludes the original stratification from the duplicate check.
   *
   * @param {Object} stratification - The stratification object to check
   * @param {string} stratification.stratification - The stratification name to validate
   * @param {Object} [originalStratification] - The original stratification when editing
   * @param {string} [originalStratification.stratification] - The original stratification name
   * @returns {boolean} True if a stratification with the same name already exists, false otherwise
   */
  const stratificationExists = useCallback(
    (stratification, originalStratification) => {
      const stratifications = stratificationsContext.stratifications || [];

      // Start with all stratifications except the one being edited
      const filteredStratifications = stratifications.filter(
        s => s.stratification !== originalStratification?.stratification
      );

      return filteredStratifications.some(
        s => s.stratification === stratification.stratification
      );
    },
    [stratificationsContext.stratifications]
  );

  // Effect hook that handles form validation on every change.
  useEffect(() => {
    // Validate required fields
    const requiredFieldsValid = validateRequiredFields();

    const stratificationAlreadyExists = stratificationExists(
      stratification,
      originalStratification
    );

    // Set errors messages
    const errorsRequiredFields = {
      requiredFields: !requiredFieldsValid
        ? "The stratification field must be filled."
        : null,
    };

    const errorsStratificationExists = {
      stratificationExists: stratificationAlreadyExists
        ? "Stratification already exists."
        : null,
    };

    // Merge errors
    const errors = {
      ...errorsRequiredFields,
      ...errorsStratificationExists,
    };

    // Determine if the form is valid
    const isValid = !stratificationAlreadyExists && requiredFieldsValid;

    setValidationState(prev => ({
      ...prev,
      stratificationExists: stratificationAlreadyExists,
      requiredFields: requiredFieldsValid,
      isFormValid: isValid,
      errors,
    }));
  }, [
    stratification,
    originalStratification,
    stratificationsContext.stratifications,
  ]);

  return {
    stratificationExists: validationState.stratificationExists,
    requiredFields: validationState.requiredFieldsValid,
    isFormValid: validationState.isFormValid,
    errors: validationState.errors,
  };
};
