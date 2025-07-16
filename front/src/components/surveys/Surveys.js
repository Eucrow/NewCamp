import React, { useEffect, useState } from "react";

import { API_CONFIG, buildApiUrl } from "../../config/api";

import SurveysContext from "../../contexts/SurveysContext";

import { useSurveysCrud } from "../../hooks/useSurveysCrud";

import SurveysButtonBar from "./SurveysButtonBar";
import Survey from "./Survey";
import NewSurveyForm from "./NewSurveyForm";

/**
 * Component list of surveys.
 * List of all the surveys stored in database.
 */
const Surveys = () => {
  const {
    surveys,
    setSurveys,
    getSurveys,
    surveysBackup,
    stratifications,
    getStratifications,
    ships,
    getShips,
    createSurvey,
    updateSurvey,
    deleteSurvey,
  } = useSurveysCrud();

  const [addingSurvey, setAddingSurvey] = useState(false);

  const apiSurvey = buildApiUrl(API_CONFIG.ENDPOINTS.SURVEY);

  /**
   * Manage change in fields of a previous created survey.
   * @param {event} e - Event.
   * @param {numeric} surveyId - Identification number of the survey which fields are managed.
   */
  const handleChange = (e, surveyId) => {
    const name = e.target.name;
    const value = e.target.value;

    e.preventDefault();
    const newSurveys = surveys.map(survey => {
      if (survey.id === surveyId) {
        let newSurvey = { ...survey };
        newSurvey[name] = value;
        return newSurvey;
      } else {
        return survey;
      }
    });

    setSurveys(newSurveys);
  };

  const handleChangeStratification = (e, surveyId) => {
    const value = e.target.value;
    e.preventDefault();

    const stratification = stratifications.find(st => {
      return st.id === Number(e.target.value);
    });

    const newSurveys = surveys.map(survey => {
      if (survey.id === surveyId) {
        let newSurvey = { ...survey };
        newSurvey["stratification"] = value;
        newSurvey["stratification_name"] = stratification.stratification;
        return newSurvey;
      } else {
        return survey;
      }
    });
    setSurveys(newSurveys);
  };

  const handleChangeShip = (e, shipId) => {
    const value = e.target.value;
    e.preventDefault();

    const ship = ships.find(s => {
      return s.id === Number(e.target.value);
    });

    const newSurveys = surveys.map(survey => {
      if (survey.id === shipId) {
        let newSurvey = { ...survey };
        newSurvey["ship"] = value;
        newSurvey["ship_name"] = ship.name;
        return newSurvey;
      } else {
        return survey;
      }
    });
    setSurveys(newSurveys);
  };

  /**
   * Restores the survey to its original state.
   * @param {number} surveyId - The ID of the haul to be restored.
   */

  const handleCancelEditSurvey = () => {
    setSurveys(surveysBackup);
  };

  useEffect(() => {
    getStratifications();
    getShips();
    getSurveys();
  }, []);

  /**
   * Create content to render.
   * @private
   */
  const renderContent = () => {
    let content;

    content = (
      <SurveysContext.Provider
        value={{
          apiSurvey,
          handleChange,
          handleChangeStratification,
          handleChangeShip,
          addingSurvey,
          setAddingSurvey,
          createSurvey,
          updateSurvey,
          deleteSurvey,
          stratifications,
          ships,
          handleCancelEditSurvey,
        }}
      >
        <main>
          <header>
            <h1 className="title">Surveys</h1>
          </header>

          <div className="wrapper surveysWrapper">
            <SurveysButtonBar
              addingSurvey={addingSurvey}
              handleAdd={setAddingSurvey}
            />
            {addingSurvey === true ? <NewSurveyForm /> : ""}

            {surveys.map(survey => {
              return <Survey key={survey.id} survey={survey} />;
            })}
          </div>
        </main>
      </SurveysContext.Provider>
    );

    return content;
  };

  return renderContent();
};

export default Surveys;
