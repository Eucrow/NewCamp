import React, { useState, useContext } from "react";

import { preventNegativeE } from "../../utils/dataUtils";

import SurveysContext from "../../contexts/SurveysContext";

import SurveyButtonBar from "./SurveyButtonBar";

/**
 * Survey component
 */
const NewSurveyForm = () => {
  const surveysContext = useContext(SurveysContext);

  const [survey, setSurvey] = useState({});

  const formRef = React.createRef();

  /**
   * Manage fields change in 'survey' state.
   * This method is different to handleChange os Surveys component.
   * @param {event} e - Event.
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
   * Manage the onSubmit event.
   * @param {event} e - onSubmit event.
   */
  const handleSubmit = e => {
    e.preventDefault();
    surveysContext.createSurvey(survey);
    surveysContext.setAddingSurvey(false);
  };

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
              className="survey_description"
              size={30}
              required
              autoFocus
              pattern="^[a-zA-Z0-9\s]{1,30}$"
              onChange={handleChange}
            />
          </label>
          <label className="form__cell">
            Acronym:
            <input
              type="text"
              id="acronym"
              name="acronym"
              required
              size={3}
              pattern="^[\w\d]{3}$"
              onChange={handleChange}
              onInput={surveysContext.forceReportValidity}
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
              onBlur={e => {
                handleChange(e);
                surveysContext.validateStartDate(e, survey.end_date);
              }}
            />
          </label>
          <label className="form__cell">
            End date:
            <input
              type="date"
              id="end_date"
              name="end_date"
              onBlur={e => {
                handleChange(e);
                surveysContext.validateEndDate(e, survey.start_date);
              }}
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
                onInput={surveysContext.forceReportValidity}
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
                onInput={surveysContext.forceReportValidity}
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
          <SurveyButtonBar addingSurvey={surveysContext.addingSurvey} />
        </div>
      </form>
    );

    return content;
  };

  return renderContent();
};

export default NewSurveyForm;
