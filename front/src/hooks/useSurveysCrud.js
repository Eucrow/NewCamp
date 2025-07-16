import { useState, useEffect } from "react";
import { API_CONFIG, buildApiUrl } from "../config/api";

import { cleanEmptyValues } from "../utils/dataUtils";

/**
 * Custom hook for managing surveys CRUD operations.
 *

 */
export const useSurveysCrud = () => {
  const [surveys, setSurveys] = useState([]);
  const [surveysBackup, setSurveysBackup] = useState([]);
  const [stratifications, setStratifications] = useState([]);
  const [ships, setShips] = useState([]);

  const apiSurvey = buildApiUrl(API_CONFIG.ENDPOINTS.SURVEY);
  const apiStratifications = buildApiUrl(
    API_CONFIG.ENDPOINTS.GET_STRATIFICATIONS
  );
  const apiShips = buildApiUrl(API_CONFIG.ENDPOINTS.GET_SHIPS);

  /**
   * Get all surveys from database.
   */
  const getSurveys = () => {
    fetch(apiSurvey)
      .then(response => {
        if (response.status > 400) {
          alert("something were wrong getting the surveys!!");
        }
        return response.json();
      })
      .then(surveys => {
        setSurveys(surveys);
        setSurveysBackup(surveys);
      })
      .catch(error => console.log(error));
  };

  /**
   * Get all stratifications.
   */
  const getStratifications = () => {
    return fetch(apiStratifications)
      .then(response => {
        if (response.status > 400) {
          alert("something were wrong getting the stratifications!!");
        }
        return response.json();
      })
      .then(stratifications => {
        setStratifications(stratifications);
      })
      .catch(error => console.log(error));
  };

  /**
   * Get ships.
   * @returns {Promise} Promise with the ships.
   * */
  const getShips = async () => {
    const shipsFetched = await fetch(apiShips)
      .then(response => {
        if (response.status > 400) {
          alert("something were wrong getting the ships!!");
        }
        return response.json();
      })
      .catch(error => console.log(error));
    setShips(shipsFetched);
  };

  /**
   * Create survey in database and update the state.
   * @param {object} survey - Survey object to create.
   */
  const createSurvey = survey => {
    console.log("Creating survey:", JSON.stringify(survey));
    const cleanedSurvey = cleanEmptyValues(survey);
    fetch(apiSurvey, {
      method: "POST",
      headers: API_CONFIG.HEADERS.DEFAULT,
      body: JSON.stringify(cleanedSurvey),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(survey => {
        const newSurveys = [...surveys, survey];

        setSurveys(newSurveys);
      })
      .catch(error => alert(error));
  };

  /**
   * Update survey from database and state.
   * @param {numeric} surveyId - Survey id of survey to update.
   */
  const updateSurvey = surveyId => {
    const api = apiSurvey + surveyId;

    const updatedSurvey = surveys.filter(survey => {
      return survey.id === surveyId;
    });

    fetch(api, {
      method: "PUT",
      headers: API_CONFIG.HEADERS.DEFAULT,
      body: JSON.stringify(updatedSurvey[0]),
    })
      .then(response => {
        if (response.status > 400) {
          alert("something were wrong updating the survey!!");
        }
        return response.json();
      })
      .catch(error => console.log(error));
  };

  /**
   * Delete survey from database and state.
   * @param {numeric} surveyId Survey identificator of survey to delete.
   */
  const deleteSurvey = surveyId => {
    const api = apiSurvey + surveyId;

    fetch(api, {
      method: "DELETE",
      headers: API_CONFIG.HEADERS.DEFAULT,
    })
      .then(() => {
        const newSurveys = surveys.filter(survey => survey.id !== surveyId);
        setSurveys(newSurveys);
      })
      .catch(error => alert(error));
  };

  return {
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
  };
};
