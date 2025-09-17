import React, { useEffect, useState } from "react";

import { API_CONFIG, buildApiUrl } from "../../config/api";

import SurveysContext from "../../contexts/SurveysContext";

import { useSurveysCrud } from "../../hooks/useSurveysCrud";

import SurveysButtonBar from "./SurveysButtonBar";
import Survey from "./Survey";
import NewSurveyForm from "./NewSurveyForm";
import { useStratificationsCrud } from "../../hooks/useStratificationsCrud";

/**
 * Surveys component manages the display and interaction of survey data.
 *
 * This component provides a complete interface for managing surveys including:
 * - Displaying a list of all surveys from the database
 * - Creating new surveys through a form interface
 * - Editing existing survey properties (name, stratification, ship assignment)
 * - Deleting surveys (with restrictions for surveys containing stations)
 * - Managing survey state with backup/restore functionality
 *
 * The component integrates with multiple hooks for data management and provides
 * context to child components for survey operations. It enforces business rules
 * such as preventing deletion of surveys that contain stations.
 *
 * @component
 * @returns {JSX.Element} The complete surveys management interface
 *
 * @example
 * // Basic usage in a route or parent component
 * <Surveys />
 *
 * @requires useSurveysCrud - Hook for survey CRUD operations
 * @requires useStratificationsCrud - Hook for stratification data
 * @requires SurveysContext - Context provider for child components
 */
const Surveys = () => {
  const {
    surveys,
    setSurveys,
    getSurveys,
    getSurveysWithStations,
    surveysWithStations,
    surveysBackup,
    ships,
    getShips,
    createSurvey,
    updateSurvey,
    deleteSurvey,
  } = useSurveysCrud();

  const { stratifications, fetchStratifications } = useStratificationsCrud();

  const [addingSurvey, setAddingSurvey] = useState(false);

  const apiSurvey = buildApiUrl(API_CONFIG.ENDPOINTS.SURVEY);

  /**
   * Handles input field changes for survey properties.
   * @param {Event} e - The input change event
   * @param {number} surveyId - ID of the survey being modified
   * @returns {void}
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

  /**
   * Handles stratification selection changes for a survey.
   * @param {Event} e - The select change event
   * @param {number} surveyId - ID of the survey being modified
   * @returns {void}
   */
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

  /**
   * Handles ship selection changes for a survey.
   * @param {Event} e - The select change event
   * @param {number} shipId - ID of the survey being modified
   * @returns {void}
   */
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
   * Restores surveys to their original state from backup.
   * @returns {void}
   */
  const handleCancelEditSurvey = () => {
    setSurveys(surveysBackup);
  };

  /**
   * Initializes component data on mount.
   * @returns {void}
   */
  useEffect(() => {
    fetchStratifications();
    getShips();
    getSurveys();
    getSurveysWithStations();
  }, []);

  /**
   * Renders the complete surveys management interface.
   * @returns {JSX.Element} The rendered survey management content
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
          surveys,
          handleCancelEditSurvey,
        }}
      >
        <main>
          <header>
            <h1 className="title">Surveys</h1>
          </header>

          <div className="wrapper strataWrapper stratifications__notes">
            The management of surveys has some limitations. To avoid
            inconsistencies, the system does not allow the deletion of surveys
            that contains stations. To remove a survey, please ensure it does
            not contain any stations.
          </div>

          <div className="wrapper surveysWrapper">
            <SurveysButtonBar
              addingSurvey={addingSurvey}
              handleAdd={setAddingSurvey}
            />
            {addingSurvey === true ? <NewSurveyForm /> : ""}

            {surveys.map(survey => {
              const hasStations = surveysWithStations.some(
                s => s.id === survey.id
              );
              return (
                <Survey
                  key={survey.id}
                  survey={survey}
                  hasStations={hasStations}
                />
              );
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
