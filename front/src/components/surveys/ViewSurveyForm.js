// Originally, the ViewSurveyForm and EditSurveyForm components were one component.
// But due to problems with controlling the focus of the inputs, it was decided to separate them.

import React from "react";

import SurveyButtonBar from "./SurveyButtonBar";

/**
 * ViewSurveyForm component
 * @param {object} survey survey object.
 * @param {method} handleEdit method to handle de 'edit' boolean variable.
 */
const ViewSurveyForm = ({ survey, handleEdit }) => {
  const renderedSurvey = (
    <form className="wrapper form__row">
      <div className="form__row">
        <label className="form__cell">
          Description:
          <input
            type="text"
            id="description"
            name="description"
            value={survey.description || ""}
            disabled={true}
          />
        </label>
        <label className="form__cell">
          Acronym:
          <input
            type="text"
            id="acronym"
            name="acronym"
            value={survey.acronym || ""}
            disabled={true}
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
            value={survey.start_date || ""}
            disabled={true}
          />
        </label>
        <label className="form__cell">
          End date:
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={survey.end_date || ""}
            disabled={true}
          />
        </label>
      </div>
      <div className="form__row">
        <label className="form__cell">
          Ship:
          <input
            type="text"
            id="ship"
            name="ship"
            value={survey.ship || ""}
            disabled={true}
          />
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
            disabled={true}
          />
        </label>
        <label className="form__cell">
          Stratification:
          <select
            id="stratification"
            name="stratification"
            value={survey.stratification || ""}
            disabled={true}
          >
            <option>{survey.stratification}</option>
          </select>
        </label>
      </div>
      <fieldset className="wrapper form__row">
        <legend>Grid</legend>
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
            disabled={true}
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
            disabled={true}
          />
        </label>
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
            disabled={true}
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
            disabled={true}
          />
        </label>
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
            disabled={true}
          />
        </label>
      </div>
      <div className="form__row">
        <SurveyButtonBar survey={survey} edit={false} handleEdit={handleEdit} />
      </div>
    </form>
  );

  return renderedSurvey;
};

export default ViewSurveyForm;
