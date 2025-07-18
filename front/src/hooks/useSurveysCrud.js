import { useState, useCallback } from "react";

import surveyService from "../services/surveyService";
import shipService from "../services/shipService";

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

  /**
   * Fetches all surveys from the database and updates both surveys and surveysBackup state.
   *
   * @function getSurveys
   * @returns {void} No return value, updates state directly
   * @throws {Error} Shows alert with error message if fetch fails
   */
  const getSurveys = useCallback(async () => {
    try {
      const surveys = await surveyService.getSurveys();
      setSurveys(surveys);
      setSurveysBackup(surveys);
    } catch (error) {
      alert(`Error fetching surveys: ${error.message}`);
      console.error(error);
    }
  }, []);

  /**
   * Fetches all available ships from the API.
   *
   * @function getShips
   * @returns {Promise<void>} Promise that resolves when ships are fetched and state is updated
   * @throws {Error} Logs error to console if fetch fails
   */
  const getShips = useCallback(async () => {
    try {
      const ships = await shipService.getShips();
      setShips(ships);
    } catch (error) {
      alert(`Error fetching ships: ${error.message}`);
      console.error(error);
    }
  }, []);

  /**
   * Fetches surveys that have associated stations from the API.
   *
   * @function getSurveysWithStations
   * @returns {Promise<void>} Promise that resolves when surveys with stations are fetched and state is updated
   * @throws {Error} Logs error to console if fetch fails
   */
  const getSurveysWithStations = useCallback(async () => {
    try {
      const surveys = await surveyService.getSurveysWithStations();
      setSurveysWithStations(surveys);
    } catch (error) {
      alert(`Error fetching surveys with stations: ${error.message}`);
      console.error(error);
    }
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
  const createSurvey = useCallback(async survey => {
    try {
      const newSurvey = await surveyService.createSurvey(survey);
      setSurveys(prevSurveys => [...prevSurveys, newSurvey]);
      setSurveysBackup(prevSurveys => [...prevSurveys, newSurvey]);
    } catch (error) {
      alert(`Error creating survey: ${error.message}`);
      console.error(error);
    }
  }, []);

  /**
   * Updates an existing survey in the database and local state.
   * Finds the survey by ID from the current surveys state and sends it to the API.
   *
   * @function updateSurvey
   * @param {number} surveyId - Unique identifier of the survey to update
   * @returns {Promise<void>} Promise that resolves when survey is updated
   * @throws {Error} Shows alert with error message if update fails
   */
  const updateSurvey = useCallback(
    async surveyId => {
      const surveyToUpdate = surveys.find(survey => survey.id === surveyId);

      if (!surveyToUpdate) {
        alert("Survey not found");
        return;
      }

      try {
        const updatedSurvey = await surveyService.updateSurvey(
          surveyId,
          surveyToUpdate
        );

        // Update both surveys and surveysBackup states
        setSurveys(prevSurveys =>
          prevSurveys.map(survey =>
            survey.id === surveyId ? updatedSurvey : survey
          )
        );
        setSurveysBackup(prevBackup =>
          prevBackup.map(survey =>
            survey.id === surveyId ? updatedSurvey : survey
          )
        );
      } catch (error) {
        alert(`Error updating survey: ${error.message}`);
        console.error(error);
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
    try {
      await surveyService.deleteSurvey(surveyId);

      setSurveys(prevSurveys =>
        prevSurveys.filter(survey => survey.id !== surveyId)
      );
      setSurveysBackup(prevBackup =>
        prevBackup.filter(survey => survey.id !== surveyId)
      );
    } catch (error) {
      alert(`Error deleting survey: ${error.message}`);
      console.error(error);
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
