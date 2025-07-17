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
    existsSurvey: false,
    existsAcronym: false,
    areDatesValid: false,
    areRequiredFieldsValid: false,
  });

  const surveysContext = useContext(SurveysContext);

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
          areDatesValid: "End date must be later or equal to start date.",
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

  /**
   * Validate if survey already exists.
   * @returns {boolean} Whether the survey already exists.
   */
  const validateSurveyExists = useCallback(() => {
    const filteredSurveys = surveysContext.surveys.filter(
      survey => survey.id !== newSurvey.id
    );

    const existsSurvey = filteredSurveys.some(
      survey => survey.description === newSurvey.description
    );

    setValidationState(prev => ({
      ...prev,
      existsSurvey: existsSurvey,
      errors: {
        ...prev.errors,
        existsSurvey: existsSurvey
          ? "A survey with this description already exists."
          : "",
      },
    }));

    return existsSurvey;
  }, [newSurvey.description, surveysContext.surveys]);

  /**
   * Validate if acronym already exists.
   * @returns {boolean} Whether the acronym already exists.
   * */
  const validateAcronymExists = useCallback(() => {
    const filteredAcronyms = surveysContext.surveys.filter(
      survey => survey.id !== newSurvey.id
    );
    const existsAcronym = filteredAcronyms.some(
      survey => survey.acronym === newSurvey.acronym
    );
    setValidationState(prev => ({
      ...prev,
      existsAcronym: existsAcronym,
      errors: {
        ...prev.errors,
        existsAcronym: existsAcronym
          ? "A survey with this acronym already exists."
          : "",
      },
    }));
    return existsAcronym;
  }, [newSurvey.acronym, surveysContext.surveys]);

  useEffect(() => {
    validateRequiredFields();
  }, [
    newSurvey.description,
    newSurvey.acronym,
    newSurvey.ship,
    newSurvey.stratification,
  ]);

  useEffect(() => {
    validateDates();
  }, [newSurvey.start_date, newSurvey.end_date]);

  useEffect(() => {
    validateSurveyExists();
  }, [newSurvey.description]);

  useEffect(() => {
    validateAcronymExists();
  }, [newSurvey.acronym]);

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

    const isValid =
      validationState.areDatesValid &&
      validationState.areRequiredFieldsValid &&
      !validationState.existsSurvey &&
      !validationState.existsAcronym;

    setValidationState(prev => ({
      ...prev,
      isFormValid: isValid,
    }));
  }, [
    validationState.areDatesValid,
    validationState.areRequiredFieldsValid,
    validationState.existsSurvey,
    validationState.existsAcronym,
  ]);

  return {
    isFormValid: validationState.isFormValid,
    validationErrors: validationState.errors,
    existsSurvey: validationState.existsSurvey,
    existsAcronym: validationState.existsAcronym,
    areDatesValid: validationState.areDatesValid,
    areRequiredFieldsValid: validationState.areRequiredFieldsValid,
  };
};
