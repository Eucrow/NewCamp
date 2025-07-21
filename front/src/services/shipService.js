import { API_CONFIG, buildApiUrl } from "../config/api";

const shipService = {
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

    return response.ok;
  },

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
