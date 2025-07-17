import React, { use, useContext, useRef } from "react";

import SurveysContext from "../../contexts/SurveysContext";

import { useSurveysValidation } from "../../hooks/useSurveysValidation";

import { preventNegativeE } from "../../utils/dataUtils";

import FloatingError from "../ui/FloatingError";
import SurveyButtonBar from "./SurveyButtonBar";

/**
 * EditSurveyForm component that provides a form interface for editing existing surveys.
 *
 * This component renders a comprehensive form for editing survey data with all
 * necessary fields pre-populated with current values. It includes real-time validation
 * for uniqueness constraints and date validation, with floating error messages for
 * user feedback. The form integrates with the SurveysContext for data operations
 * and state management.
 *
 * The component handles form submission by calling the updateSurvey function from
 * context and exits edit mode upon successful submission. It prevents negative
 * values and enforces pattern matching for critical fields.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.survey - Survey object containing current survey data
 * @param {Function} props.handleEdit - Function to toggle edit mode
 * @returns {JSX.Element} Complete survey editing form
 *
 * @example
 * // Display when editing a survey
 * <EditSurveyForm
 *   survey={surveyData}
 *   handleEdit={setEditMode}
 * />
 *
 * @requires SurveysContext - Context for survey operations and data
 * @requires useSurveysValidation - Hook for form validation
 * @requires SurveyButtonBar - Button controls for form actions
 * @requires FloatingError - Error display component
 */
const EditSurveyForm = ({ survey, handleEdit }) => {
  const surveysContext = useContext(SurveysContext);

  const {
    isFormValid,
    validationErrors,
    existsSurvey,
    existsAcronym,
    areDatesValid,
  } = useSurveysValidation(survey);

  const endDateRef = useRef(null);
  const descriptionRef = useRef(null);
  const acronymRef = useRef(null);

  /**
   * Handles form submission and updates existing survey.
   * @param {Event} e - Form submit event
   * @returns {void}
   */
  const handleSubmit = e => {
    e.preventDefault();
    surveysContext.updateSurvey(survey.id);
    handleEdit(false);
  };

  const renderedSurvey = (
    <form className="wrapper form__row" onSubmit={handleSubmit}>
      <div className="form__row">
        <label className="form__cell">
          Description:
          <input
            type="text"
            id="description"
            name="description"
            className={
              existsSurvey ? "survey_description invalid" : "survey_description"
            }
            size={30}
            required
            autoFocus
            pattern="^[a-zA-Z0-9\s]{1,30}$"
            value={survey.description || ""}
            onChange={e => surveysContext.handleChange(e, survey.id)}
            ref={descriptionRef}
          />
        </label>
        <FloatingError
          message={validationErrors.existsSurvey}
          show={existsSurvey}
          inputRef={descriptionRef}
        />
        <label className="form__cell">
          Acronym:
          <input
            type="text"
            id="acronym"
            name="acronym"
            className={existsAcronym ? "invalid" : ""}
            required
            size={3}
            maxLength={3}
            pattern="^[\w\d]{3}$"
            value={survey.acronym || ""}
            onChange={e => surveysContext.handleChange(e, survey.id)}
            ref={acronymRef}
            title="Acronym must be unique and exactly 3 alphanumeric characters."
          />
          <FloatingError
            message={validationErrors.existsAcronym}
            show={existsAcronym}
            inputRef={acronymRef}
          />
        </label>
      </div>
      <div className="form__row">
        <label className="form__cell">
          Start date:
          <input
            type="date"
            id="start_date"
            name="start_date"
            className={areDatesValid ? "" : "invalid"}
            value={survey.start_date || ""}
            onChange={e => {
              surveysContext.handleChange(e, survey.id);
            }}
          />
        </label>
        <label className="form__cell">
          End date:
          <input
            type="date"
            id="end_date"
            name="end_date"
            className={areDatesValid ? "" : "invalid"}
            value={survey.end_date || ""}
            onChange={e => {
              surveysContext.handleChange(e, survey.id);
            }}
            ref={endDateRef}
          />
        </label>
        <FloatingError
          message={validationErrors.areDatesValid}
          show={!areDatesValid}
          inputRef={endDateRef}
        />
      </div>
      <div className="form__row">
        <label className="form__cell">
          Ship:
          <select
            id="ship"
            name="ship"
            className="survey__ship"
            value={survey.ship || ""}
            required
            onChange={e => surveysContext.handleChangeShip(e, survey.id)}
          >
            <option />
            {surveysContext.ships.map((ship, idx) => {
              return (
                <option value={ship.id} key={idx}>
                  {ship.name}
                </option>
              );
            })}
          </select>
        </label>
        <label className="form__cell">
          Hauls duration (minutes):
          <input
            type="number"
            id="hauls_duration"
            name="hauls_duration"
            min="0"
            size={4}
            value={survey.hauls_duration || ""}
            onChange={e => surveysContext.handleChange(e, survey.id)}
            onKeyDown={preventNegativeE}
          />
        </label>
      </div>
      <div className="form__row">
        <label className="form__cell">
          Stratification:
          <select
            id="stratification"
            name="stratification"
            required
            value={survey.stratification || ""}
            onChange={e =>
              surveysContext.handleChangeStratification(e, survey.id)
            }
          >
            <option />
            {surveysContext.stratifications.map((st, idx) => {
              return (
                <option value={st.id} key={idx}>
                  {st.stratification}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <fieldset className="wrapper form__row">
        <legend>Grid</legend>
        <div className="form__row">
          <label className="form__cell">
            Width (miles):
            <input
              type="number"
              id="width_x"
              name="width_x"
              min="0"
              max="999"
              size={3}
              maxLength={3}
              value={survey.width_x || ""}
              onChange={e => surveysContext.handleChange(e, survey.id)}
              onKeyDown={preventNegativeE}
            />
          </label>
          <label className="form__cell">
            Height (miles):
            <input
              type="number"
              id="width_y"
              name="width_y"
              min="0"
              max="999"
              maxLength={3}
              size={3}
              value={survey.width_y || ""}
              onChange={e => surveysContext.handleChange(e, survey.id)}
              onKeyDown={preventNegativeE}
            />
          </label>{" "}
        </div>
        <div className="form__row">
          <label className="form__cell">
            Origin longitude (degrees):
            <input
              type="number"
              id="origin_x"
              name="origin_x"
              min="-180"
              max="180"
              step={0.001}
              size={8}
              value={survey.origin_x || ""}
              onChange={e => surveysContext.handleChange(e, survey.id)}
            />
          </label>
          <label className="form__cell">
            Origin latitude (degrees):
            <input
              type="number"
              id="origin_y"
              name="origin_y"
              min="-90"
              max="90"
              step={0.001}
              size={7}
              value={survey.origin_y || ""}
              onChange={e => surveysContext.handleChange(e, survey.id)}
            />
          </label>
        </div>
      </fieldset>

      <div className="form__row">
        <label className="form__cell form__cell--wide">
          Comment:
          <textarea
            id="comment"
            name="comment"
            className="comment field__comment"
            rows="2"
            maxLength={1000}
            value={survey.comment || ""}
            onChange={e => surveysContext.handleChange(e, survey.id)}
          />
        </label>
      </div>
      <div className="form__row">
        <SurveyButtonBar
          survey={survey}
          edit={true}
          handleEdit={handleEdit}
          deleteSurvey={surveysContext.deleteSurvey}
          isFormValid={isFormValid}
        />
      </div>
    </form>
  );

  return renderedSurvey;
};

export default EditSurveyForm;
