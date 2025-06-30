import { API_CONFIG, buildApiUrl } from "../config/api";
import { fixDateTime } from "../utils/DateTime";

/**
 * Converts all empty strings to null in an object
 * @param {object} obj The object to clean
 * @returns {object} The cleaned object
 */
const cleanEmptyValues = obj => {
  const cleaned = { ...obj };
  Object.keys(cleaned).forEach(key => {
    if (cleaned[key] === "") {
      cleaned[key] = null;
    }
  });
  return cleaned;
};

export const haulService = {
  /**
   * Fetches meteorology data for a specific haul
   * @param {string} haulId - The ID of the haul
   * @returns {Promise<Object>} Meteorology data
   */
  async getMeteorologyByHaulId(haulId) {
    const apiUrl = buildApiUrl(
      API_CONFIG.ENDPOINTS.GET_METEOROLOGY_BY_HAUL_ID(haulId)
    );

    const response = await fetch(apiUrl);

    if (response.status === 404) {
      return {}; // Return empty object if not found
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch meteorology data: ${response.status}`);
    }

    return response.json();
  },

  /**
   * Fetches trawl data for a specific haul and fixes datetime fields
   * @param {string} haulId - The ID of the haul
   * @returns {Promise<Object>} Trawl data with fixed datetime fields
   */
  async getTrawlByHaulId(haulId) {
    const apiUrl = buildApiUrl(
      API_CONFIG.ENDPOINTS.GET_TRAWL_BY_HAUL_ID(haulId)
    );

    const response = await fetch(apiUrl);

    if (response.status === 404) {
      return {}; // Return empty object if not found
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch trawl data: ${response.status}`);
    }

    const trawl = await response.json();

    // Fix datetime fields
    const dateTimeFields = [
      "shooting_date_time",
      "bottom_date_time",
      "trawling_date_time",
      "hauling_date_time",
      "take_off_date_time",
      "on_board_date_time",
    ];

    dateTimeFields.forEach(field => {
      if (trawl[field]) {
        trawl[field] = fixDateTime(trawl[field]);
      }
    });

    return trawl;
  },

  /**
   * Fetches hydrography data for a specific haul and fixes datetime fields
   * @param {string} haulId - The ID of the haul
   * @returns {Promise<Object>} Hydrography data with fixed datetime fields
   */
  async getHydrographyByHaulId(haulId) {
    const apiUrl = buildApiUrl(
      API_CONFIG.ENDPOINTS.GET_HYDROGRAPHY_BY_HAUL_ID(haulId)
    );

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch hydrography data: ${response.status}`);
    }

    const hydrography = await response.json();

    // Fix datetime field
    if (hydrography.date_time) {
      hydrography.date_time = fixDateTime(hydrography.date_time);
    }

    return hydrography;
  },

  async updateTrawl(trawlData, haulId) {
    const apiTrawl = buildApiUrl(
      API_CONFIG.ENDPOINTS.GET_TRAWL_BY_HAUL_ID(haulId)
    );
    const cleanedData = cleanEmptyValues(trawlData);

    const response = await fetch(apiTrawl, {
      method: "PUT",
      headers: API_CONFIG.HEADERS.DEFAULT,
      body: JSON.stringify(cleanedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update trawl data");
    }

    return response.json();
  },

  async updateHydrography(hydrographyData, haulId) {
    const apiHydrography = buildApiUrl(
      API_CONFIG.ENDPOINTS.GET_HYDROGRAPHY_BY_HAUL_ID(haulId)
    );
    const cleanedData = cleanEmptyValues(hydrographyData);

    const response = await fetch(apiHydrography, {
      method: "PUT",
      headers: API_CONFIG.HEADERS.DEFAULT,
      body: JSON.stringify(cleanedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update hydrography data");
    }

    return response.json();
  },

  async updateMeteorology(meteorologyData, haulId) {
    const apiMeteorology = buildApiUrl(
      API_CONFIG.ENDPOINTS.GET_METEOROLOGY_BY_HAUL_ID(haulId)
    );
    const cleanedData = cleanEmptyValues(meteorologyData);

    const response = await fetch(apiMeteorology, {
      method: "PUT",
      headers: API_CONFIG.HEADERS.DEFAULT,
      body: JSON.stringify(cleanedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update meteorology data");
    }

    return response.json();
  },
};
