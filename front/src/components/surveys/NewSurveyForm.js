import React, { useState, useContext, useRef } from "react";

import { preventNegativeE } from "../../utils/dataUtils";

import SurveysContext from "../../contexts/SurveysContext";

import { useSurveysValidation } from "../../hooks/useSurveysValidation";
import FloatingError from "../ui/FloatingError";

import SurveyButtonBar from "./SurveyButtonBar";

/**
 * NewSurveyForm component that provides a form interface for creating new surveys.
 *
 * This component renders a comprehensive form for creating new surveys with all
 * necessary fields including description, acronym, dates, ship selection, stratification,
 * grid configuration, and comments. It includes real-time validation for uniqueness
 * constraints and date validation, with floating error messages for user feedback.
 *
 * The form integrates with the SurveysContext for data operations and uses validation
 * hooks to ensure data integrity before submission. It prevents negative values
 * and enforces pattern matching for critical fields.
 *
 * @component
 * @returns {JSX.Element} Complete new survey creation form
 *
 * @example
 * // Display when adding a new survey
 * <NewSurveyForm />
 *
 * @requires SurveysContext - Context for survey operations and data
 * @requires useSurveysValidation - Hook for form validation
 * @requires SurveyButtonBar - Button controls for form actions
 * @requires FloatingError - Error display component
 */
const NewSurveyForm = () => {
  const surveysContext = useContext(SurveysContext);

  const [survey, setSurvey] = useState({});
  const {
    isFormValid,
    validationErrors,
    existsSurvey,
    existsAcronym,
    areDatesValid,
  } = useSurveysValidation(survey);

  const formRef = useRef(null);
  const endDateRef = useRef(null);
  const descriptionRef = useRef(null);
  const acronymRef = useRef(null);

  /**
   * Handles form field changes and updates local survey state.
   * @param {Event} e - Input change event
   * @returns {void}
   */
  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setSurvey(survey => {
      return {
        ...survey,
        [name]: value,
      };
    });
  };

  /**
   * Handles form submission and creates new survey.
   * @param {Event} e - Form submit event
   * @returns {void}
   */
  const handleSubmit = e => {
    e.preventDefault();
    surveysContext.createSurvey(survey);
    surveysContext.setAddingSurvey(false);
  };

  /**
   * Renders the complete new survey form.
   * @returns {JSX.Element} The rendered form content
   */
  const renderContent = () => {
    const content = (
      <form className="wrapper from__row" ref={formRef} onSubmit={handleSubmit}>
        <div className="form__row">
          <label className="form__cell">
            Description:
            <input
              type="text"
              id="description"
              name="description"
              className={
                existsSurvey
                  ? "survey_description invalid"
                  : "survey_description"
              }
              size={30}
              required
              autoFocus
              pattern="^[a-zA-Z0-9\s]{1,30}$"
              onChange={handleChange}
              ref={descriptionRef}
              title="Description must be unique and exactly 3 alphanumeric characters."
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
              onChange={handleChange}
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
              onChange={e => {
                handleChange(e);
              }}
            />
          </label>
          <FloatingError
            message={validationErrors.areDatesValid}
            show={!areDatesValid}
            inputRef={endDateRef}
          />
          <label className="form__cell">
            End date:
            <input
              type="date"
              id="end_date"
              name="end_date"
              onChange={e => {
                handleChange(e);
              }}
              ref={endDateRef}
            />
            <FloatingError
              message={validationErrors.areDatesValid}
              show={!areDatesValid}
              inputRef={endDateRef}
            />
          </label>
        </div>
        <div className="form__row">
          <label className="form__cell">
            Ship:
            <select
              id="ship"
              name="ship"
              className="survey__ship"
              required
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
                onChange={handleChange}
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
                size={3}
                maxLength={3}
                onChange={handleChange}
                onKeyDown={preventNegativeE}
              />
            </label>
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
                size={8}
                step={0.001}
                onChange={handleChange}
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
                size={7}
                step={0.001}
                onChange={handleChange}
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
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form__row">
          <SurveyButtonBar
            addingSurvey={surveysContext.addingSurvey}
            isFormValid={isFormValid}
          />
        </div>
      </form>
    );

    return content;
  };

  return renderContent();
};

export default NewSurveyForm;
