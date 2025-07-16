import { useState, useEffect, useCallback, useContext } from "react";
import SurveysContext from "../contexts/SurveysContext";

/**
 * Custom hook for handling form validation for surveys.
 */
export const useSurveysValidation = newSurvey => {
  // State to hold all validation-related values
  const [validationState, setValidationState] = useState({
    isFormValid: false,
    errors: {
      existsSurvey: "",
      existsAcronym: "",
      areDatesValid: "",
    },
    existsSurvey: true,
    existsAcronym: true,
    areDatesValid: false,
    areRequiredFieldsValid: false,
  });

  const catchesContext = useContext(SurveysContext);

  /**
   * Validates that all required fields are filled.
   * Checks group, species, category and weight.
   *
   * @returns {boolean} Whether all required fields are valid
   */
  const validateRequiredFields = useCallback(() => {
    const requiredFields = {
      description: newSurvey.description || null,
      acronym: newSurvey.acronym || null,
      ship: newSurvey.ship || null,
      stratification: newSurvey.stratification || null,
    };

    const isValid = Object.values(requiredFields).every(
      value => value !== null && value !== ""
    );

    setValidationState(prev => ({
      ...prev,
      areRequiredFieldsValid: isValid,
    }));

    return isValid;
  }, [
    newSurvey.description,
    newSurvey.acronym,
    newSurvey.ship,
    newSurvey.stratification,
  ]);

  /**
   * Validate start date with end date
   * @param {event} e onChange event
   * @returns In case of error in date, show report validity.
   */
  const validateDates = useCallback(() => {
    if (
      typeof newSurvey.end_date !== "undefined" &&
      typeof newSurvey.start_date !== "undefined" &&
      newSurvey.start_date > newSurvey.end_date
    ) {
      setValidationState(prev => ({
        ...prev,
        areDatesValid: false,
        errors: {
          ...prev.errors,
          areDatesValid: "End date must be after end date.",
        },
      }));
      return false;
    }
    setValidationState(prev => ({
      ...prev,
      areDatesValid: true,
      errors: {
        ...prev.errors,
        areDatesValid: "",
      },
    }));
    return true;
  }, [newSurvey.start_date, newSurvey.end_date]);

  // Effect hook that handles form validation on every change.
  useEffect(() => {
    // Update species validation state when species selection changes
    // setValidationState(prev => ({
    //   ...prev,
    //   isSpeciesValid: newSurvey.sp_id !== "" && newSurvey.sp_id !== undefined,
    // }));

    // Check if the catch already exists
    // const existsCatch = catchesContext.existsCatch(
    //   newSurvey.sp_id,
    //   newSurvey.category,
    //   newSurvey.catch_id
    // );

    const isValid = validateDates() && validateRequiredFields();

    setValidationState(prev => ({
      ...prev,
      // existsSurvey: existsSurvey,
      // existsAcronym: existsAcronym,
      isFormValid: isValid,
    }));
  }, [
    validateRequiredFields,
    newSurvey.description,
    newSurvey.acronym,
    newSurvey.ship,
    newSurvey.stratification,
    newSurvey.start_date,
    newSurvey.end_date,
    // newSurvey.sp_name,
    // newSurvey.category,
    // newSurvey.catch_id,
  ]);

  return {
    isFormValid: validationState.isFormValid,
    validationErrors: validationState.errors,
    // existsAcronym: validationState.existsAcronym,
    // existsSurvey: validationState.existsSurvey,
    areDatesValid: validationState.areDatesValid,
    areRequiredFieldsValid: validationState.areRequiredFieldsValid,
  };
};
