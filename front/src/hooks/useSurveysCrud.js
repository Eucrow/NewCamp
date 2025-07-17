import { useState, useCallback } from "react";
import { API_CONFIG, buildApiUrl } from "../config/api";

import { cleanEmptyValues } from "../utils/dataUtils";

/**
 * Custom hook for managing surveys CRUD operations.
 *
 * Provides state management and API operations for surveys, ships, and surveys with stations.
 * Handles create, read, update, and delete operations for surveys with proper error handling.
 *
 * @returns {Object} Hook object containing:
 * - surveys: Array of all surveys
 * - surveysBackup: Backup array of surveys for restoration
 * - ships: Array of available ships
 * - surveysWithStations: Array of surveys that have associated stations
 * - getSurveys: Function to fetch all surveys
 * - setSurveys: Function to manually update surveys state
 * - getSurveysWithStations: Function to fetch surveys with stations
 * - getShips: Function to fetch available ships
 * - createSurvey: Function to create a new survey
 * - updateSurvey: Function to update an existing survey
 * - deleteSurvey: Function to delete a survey
 */
export const useSurveysCrud = () => {
  const [surveys, setSurveys] = useState([]);
  const [surveysBackup, setSurveysBackup] = useState([]);
  const [ships, setShips] = useState([]);
  const [surveysWithStations, setSurveysWithStations] = useState([]);

  const apiSurvey = buildApiUrl(API_CONFIG.ENDPOINTS.SURVEY);

  const apiShips = buildApiUrl(API_CONFIG.ENDPOINTS.GET_SHIPS);
  const apiSurveysWithStations = buildApiUrl(
    API_CONFIG.ENDPOINTS.SURVEYS_WITH_STATIONS
  );

  /**
   * Fetches all surveys from the database and updates both surveys and surveysBackup state.
   *
   * @function getSurveys
   * @returns {void} No return value, updates state directly
   * @throws {Error} Logs error to console if fetch fails
   */
  const getSurveys = useCallback(() => {
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
  }, []);

  /**
   * Fetches all available ships from the API.
   *
   * @function getShips
   * @returns {Promise<void>} Promise that resolves when ships are fetched and state is updated
   * @throws {Error} Logs error to console if fetch fails
   */
  const getShips = useCallback(async () => {
    const shipsFetched = await fetch(apiShips)
      .then(response => {
        if (response.status > 400) {
          alert("something were wrong getting the ships!!");
        }
        return response.json();
      })
      .catch(error => console.log(error));
    setShips(shipsFetched);
  }, []);

  /**
   * Fetches surveys that have associated stations from the API.
   *
   * @function getSurveysWithStations
   * @returns {Promise<void>} Promise that resolves when surveys with stations are fetched and state is updated
   * @throws {Error} Logs error to console if fetch fails
   */
  const getSurveysWithStations = useCallback(async () => {
    const surveysWithStations = await fetch(apiSurveysWithStations)
      .then(response => {
        if (response.status > 400) {
          alert("something were wrong getting the surveys with stations!!");
        }
        return response.json();
      })
      .catch(error => console.log(error));

    setSurveysWithStations(surveysWithStations);
  }, []);

  /**
   * Creates a new survey in the database and updates the local state.
   * Cleans empty values from the survey object before sending to API.
   *
   * @function createSurvey
   * @param {Object} survey - Survey object to create with all necessary properties
   * @returns {void} No return value, updates state directly on success
   * @throws {Error} Shows alert with error message if creation fails
   */
  const createSurvey = useCallback(survey => {
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
        setSurveys(prevSurveys => [...prevSurveys, survey]);
        setSurveysBackup(prevSurveys => [...prevSurveys, survey]);
      })
      .catch(error => alert(error));
  }, []);

  /**
   * Updates an existing survey in the database and local state.
   * Finds the survey by ID from the current surveys state and sends it to the API.
   *
   * @function updateSurvey
   * @param {number} surveyId - Unique identifier of the survey to update
   * @returns {Promise<void>} Promise that resolves when survey is updated
   * @throws {Error} Logs error to console if update fails, shows alert for HTTP errors
   */
  const updateSurvey = useCallback(
    async surveyId => {
      const api = apiSurvey + surveyId;

      const updatedSurvey = surveys.filter(survey => {
        return survey.id === surveyId;
      });

      try {
        const response = await fetch(api, {
          method: "PUT",
          headers: API_CONFIG.HEADERS.DEFAULT,
          body: JSON.stringify(updatedSurvey[0]),
        });

        if (response.status > 400) {
          alert("something were wrong updating the survey!!");
        }

        const updatedSurveyData = await response.json();

        setSurveysBackup(prevBackup =>
          prevBackup.map(survey =>
            survey.id === surveyId ? updatedSurveyData : survey
          )
        );
      } catch (error) {
        console.log(error);
      }
    },
    [surveys]
  );

  /**
   * Deletes a survey from the database and removes it from local state.
   * Removes the survey from both surveys and surveysBackup arrays.
   *
   * @function deleteSurvey
   * @param {number} surveyId - Unique identifier of the survey to delete
   * @returns {Promise<void>} Promise that resolves when survey is deleted
   * @throws {Error} Shows alert with error message if deletion fails
   */
  const deleteSurvey = useCallback(async surveyId => {
    const api = apiSurvey + surveyId;

    try {
      const response = await fetch(api, {
        method: "DELETE",
        headers: API_CONFIG.HEADERS.DEFAULT,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSurveys(prevSurveys =>
        prevSurveys.filter(survey => survey.id !== surveyId)
      );
      setSurveysBackup(prevBackup =>
        prevBackup.filter(survey => survey.id !== surveyId)
      );
    } catch (error) {
      alert(error);
    }
  }, []);

  return {
    surveys,
    getSurveys,
    setSurveys,
    getSurveysWithStations,
    surveysWithStations,
    surveysBackup,
    ships,
    getShips,
    createSurvey,
    updateSurvey,
    deleteSurvey,
  };
};
