import { API_CONFIG, buildApiUrl } from "../config/api";

const shipService = {
  async getShips() {
    const apiShips = buildApiUrl(API_CONFIG.ENDPOINTS.GET_SHIPS);
    const response = await fetch(apiShips);
    if (response.status === 404) {
      return []; // Return empty array if not found
    }

    if (!response.ok) {
      throw new Error("Failed to fetch surveys");
    }

    return response.json();
  },
};

export default shipService;
