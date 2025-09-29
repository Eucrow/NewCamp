import { useState, useEffect, useCallback, useContext } from "react";
import CatchesContext from "../contexts/CatchesContext";

/**
 * Custom hook for handling form validation in the LengthsRangeForm component.
 * Validates lengths range and required fields.
 *
 * @param {object} newRange - The lenghts range to validate
 * @param {string} newRange.minimumRange - The minimum value of the range
 * @param {string} newRange.maximumRange - The maximum value of the range
 *
 * @returns {object} Validation state and errors
 * @returns {boolean} isRangeValid - Whether the entire form is valid
 * @returns {boolean} isRangeValuesValid - Whether the maximum value is greater than minimum value
 * @returns {object} rangeErrors - Object containing error messages
 */
export const useRangeValidation = newRange => {
  const [validationState, setValidationState] = useState({
    isRangeValid: false,
    isRangeValuesValid: false,
    errors: {
      minimumRange: "",
      maximumRange: "",
    },
  });

  /**
   * Validates that all required fields are filled.
   *
   * @returns {boolean} Whether all required fields are valid
   */
  const validateRequiredFields = useCallback(() => {
    const requiredFields = {
      minimumRange: newRange.minimumRange,
      maximumRange: newRange.maximumRange,
    };

    const isValid = Object.values(requiredFields).every(
      value => value !== null && value !== ""
    );

    return isValid;
  }, [newRange.minimumRange, newRange.maximumRange]);

  /**
   * Validates that maximum value are greater to minimum value.
   *
   * @returns {boolean} Whether the range is valid
   */
  const validateRange = useCallback(() => {
    const isValid =
      Number(newRange.minimumRange) <= Number(newRange.maximumRange);

    setValidationState(prev => ({
      ...prev,
      isRangeValuesValid: isValid,
      errors: {
        maximumRange: isValid
          ? ""
          : "Maximum range must be greater than minimum range",
      },
    }));
    return isValid;
  }, [newRange.minimumRange, newRange.maximumRange]);

  // Effect hook that handles form validation on every change.
  useEffect(() => {
    const isValid = validateRange() && validateRequiredFields();

    setValidationState(prev => ({
      ...prev,
      isRangeValid: isValid,
    }));
  }, [validateRange, validateRequiredFields]);

  return {
    isRangeValid: validationState.isRangeValid,
    isRangeValuesValid: validationState.isRangeValuesValid,
    rangeErrors: validationState.errors,
  };
};
