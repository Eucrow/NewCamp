import { API_CONFIG, buildApiUrl } from "../config/api";
import { cleanEmptyValues } from "../utils/dataUtils";

const surveyServices = {
  async getSurveys() {
    const apiSurvey = buildApiUrl(API_CONFIG.ENDPOINTS.SURVEY);

    const response = await fetch(apiSurvey);

    if (response.status === 404) {
      return []; // Return empty array if not found
    }

    if (!response.ok) {
      throw new Error("Failed to fetch surveys");
    }

    return response.json();
  },

  async createSurvey(survey) {
    const cleanedSurvey = cleanEmptyValues(survey);

    const apiSurvey = buildApiUrl(API_CONFIG.ENDPOINTS.SURVEY);

    const response = await fetch(apiSurvey, {
      method: "POST",
      headers: API_CONFIG.HEADERS.DEFAULT,
      body: JSON.stringify(cleanedSurvey),
    });

    if (response.status === 404) {
      return {}; // Return empty object if not found
    }

    if (!response.ok) {
      throw new Error("Failed to create survey");
    }

    return response.json();
  },

  async updateSurvey(surveyId, survey) {
    const apiSurvey = buildApiUrl(API_CONFIG.ENDPOINTS.SURVEY) + surveyId;

    // Clean empty values before sending to API
    const cleanedSurvey = cleanEmptyValues(survey);

    const response = await fetch(apiSurvey, {
      method: "PUT",
      headers: API_CONFIG.HEADERS.DEFAULT,
      body: JSON.stringify(cleanedSurvey),
    });

    if (response.status === 404) {
      return {}; // Return empty object if not found
    }

    if (!response.ok) {
      throw new Error("Failed to update survey");
    }

    return response.json();
  },

  async deleteSurvey(surveyId) {
    const apiSurvey = buildApiUrl(API_CONFIG.ENDPOINTS.SURVEY) + surveyId;

    const response = await fetch(apiSurvey, {
      method: "DELETE",
      headers: API_CONFIG.HEADERS.DEFAULT,
    });

    if (!response.ok) {
      throw new Error(`Failed to delete survey`);
    }
  },
  async getSurveysWithStations() {
    const apiSurveysWithStations = buildApiUrl(
      API_CONFIG.ENDPOINTS.SURVEYS_WITH_STATIONS
    );
    const response = await fetch(apiSurveysWithStations);
    if (response.status === 404) {
      return {}; // Return empty object if not found
    }

    if (!response.ok) {
      throw new Error("Failed to update survey");
    }

    return response.json();
  },
};

export default surveyServices;
