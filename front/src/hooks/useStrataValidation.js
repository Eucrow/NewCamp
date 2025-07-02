import { useState, useEffect, useCallback, useContext } from "react";
import StrataContext from "../contexts/StrataContext";

/**
 * Custom hook for handling form validation in the NewCatchForm component.
 * Validates weight relationships and required fields, and manages species selection state.
 * Prevents creating duplicate catches with the same species and category combination.
 *
 * @param {Object} newCatch - The catch form data object
 * @param {string} newCatch.group - The group number (1-5)
 * @param {string} newCatch.sp_id - The selected species ID
 * @param {string} newCatch.category - The category number
 * @param {string} newCatch.weight - The total weight
 * @param {string} newCatch.sampled_weight - The sampled weight (must be <= weight)
 * @param {string} newCatch.catch_id - The unique identifier of the catch (used for duplicate validation)
 *
 * @returns {Object} Validation state and errors
 * @returns {Object} validationErrors - Object containing error messages for weight and sampled weight
 * @returns {boolean} isFormValid - Whether the entire form is valid
 * @returns {boolean} isSpeciesValid - Whether a species has been selected
 * @returns {boolean} existsCatch - Whether a catch with same species and category already exists
 */
export const useStrataValidation = (stratum, originalStratum = null) => {
  // State to hold all validation-related values
  const [validationState, setValidationState] = useState({
    stratumExists: false,
    isFormValid: false,
    errors: {
      stratumExists: null,
    },
  });

  const strataContext = useContext(StrataContext);

  /**
   * Method to check if a stratum name already exists in this stratification.
   * @param {string} stratumName stratum name to check if already exists.
   * @returns True if exists, false if doesn't.
   */
  const stratumExists = useCallback(
    (stratum, originalStratum) => {
      const strata = strataContext.strata || [];

      // Start with all strata except the one being edited
      const filteredStrata = strata.filter(s => s.stratum !== originalStratum);

      return filteredStrata.some(s => s.stratum === stratum);
    },
    [strataContext.strata]
  );

  // Effect hook that handles form validation on every change.
  useEffect(() => {
    const stratum_exists = stratumExists(stratum, originalStratum);

    // Ready to add new validation. isValid must be true when all validations pass.
    // For now, we only check if the stratum exists.
    const isValid = !stratum_exists;

    // Set error message if stratum exists
    const errors = {
      stratumExists: stratum_exists ? "Stratum already exists in this stratification." : null,
    };

    setValidationState(prev => ({
      ...prev,
      stratumExists: stratum_exists,
      isFormValid: isValid,
      errors,
    }));
  }, [stratum, originalStratum, strataContext.strata]);

  return {
    stratumExists: validationState.stratumExists,
    isFormValid: validationState.isFormValid,
    errors: validationState.errors,
  };
};
