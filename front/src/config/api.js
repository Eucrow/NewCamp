export const API_CONFIG = {
	BASE_URL: process.env.REACT_APP_API_BASE_URL,

	ENDPOINTS: {
		CATCHES_BY_HAUL: (haul_id) => `/catches/${haul_id}`,
		CREATE_CATCH: "/catches/new",
		EDIT_REMOVE_CATCH: "/catch",
	},

	HEADERS: {
		DEFAULT: {
			"Content-Type": "application/json",
		},
	},
};

// Helper function to build full URLs
export const buildApiUrl = (endpoint) => `${API_CONFIG.BASE_URL}${endpoint}`;
