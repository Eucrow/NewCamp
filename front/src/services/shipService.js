import { API_CONFIG, buildApiUrl } from "../config/api";

/**
 * Service for handling ship-related API operations.
 * Provides CRUD operations for ships and related data.
 */
const shipService = {
  /**
   * Fetches all ships from the API.
   *
   * @async
   * @function getShips
   * @returns {Promise<Array>} Array of ship objects, empty array if none found
   * @throws {Error} If the API request fails
   */
  async getShips() {
    const apiShips = buildApiUrl(API_CONFIG.ENDPOINTS.GET_SHIPS);
    const response = await fetch(apiShips);
    if (response.status === 404) {
      return []; // Return empty array if not found
    }

    if (!response.ok) {
      throw new Error("Failed to fetch ships");
    }

    return response.json();
  },

  /**
   * Creates a new ship via API.
   *
   * @async
   * @function createShip
   * @param {Object} ship - Ship object to create with all necessary properties
   * @returns {Promise<Object>} Created ship object with assigned ID
   * @throws {Error} If ship creation fails
   */
  async createShip(ship) {
    const apiShips = buildApiUrl(
      API_CONFIG.ENDPOINTS.CREATE_SHIP || API_CONFIG.ENDPOINTS.GET_SHIPS
    );
    const response = await fetch(apiShips, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ship),
    });

    if (!response.ok) {
      throw new Error("Failed to create ship");
    }

    return response.json();
  },

  /**
   * Updates an existing ship via API.
   *
   * @async
   * @function updateShip
   * @param {number|string} shipId - Unique identifier of the ship to update
   * @param {Object} ship - Updated ship data object
   * @returns {Promise<Object>} Updated ship object
   * @throws {Error} If ship update fails
   */
  async updateShip(shipId, ship) {
    const apiShip = buildApiUrl(
      `${API_CONFIG.ENDPOINTS.UPDATE_SHIP || API_CONFIG.ENDPOINTS.GET_SHIPS}${shipId}`
    );
    const response = await fetch(apiShip, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ship),
    });

    if (!response.ok) {
      throw new Error("Failed to update ship");
    }

    return response.json();
  },

  /**
   * Deletes a ship from the database via API.
   *
   * @async
   * @function deleteShip
   * @param {number|string} shipId - Unique identifier of the ship to delete
   * @returns {Promise<boolean>} True if deletion was successful
   * @throws {Error} If ship deletion fails
   */
  async deleteShip(shipId) {
    const apiShip = buildApiUrl(
      `${API_CONFIG.ENDPOINTS.DELETE_SHIP || API_CONFIG.ENDPOINTS.GET_SHIPS}${shipId}`
    );
    const response = await fetch(apiShip, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete ship");
    }

    return true;
  },

  /**
   * Fetches ships that are currently in surveys from the API.
   *
   * @async
   * @function getShipsInSurvey
   * @returns {Promise<Array>} Array of ships currently in surveys, empty array if none found
   * @throws {Error} If the API request fails
   */
  async getShipsInSurvey() {
    const apiShipsInSurveys = buildApiUrl(
      API_CONFIG.ENDPOINTS.SHIPS_IN_SURVEYS
    );

    const response = await fetch(apiShipsInSurveys);

    if (response.status === 404) {
      return []; // Return empty array if not found
    }

    if (!response.ok) {
      throw new Error("Failed to fetch the ships in surveys");
    }

    return response.json();
  },
};

export default shipService;
