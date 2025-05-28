export const API_CONFIG = {
	BASE_URL: process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api/1.0",

	ENDPOINTS: {
		// Existing endpoints
		GET_SURVEYS: "/survey",
		GET_STRATA: "/stratifications",
		CATCHES_BY_HAUL: (haul_id) => `/catches/${haul_id}`,
		CREATE_CATCH: "/catches/new",
		EDIT_REMOVE_CATCH: "/catch",

		// Station endpoints
		GET_STATIONS: "/stations/",
		GET_STATIONS_WITH_HAULS: (surveyId) => `/stations/hauls/${surveyId}`,
		STATION: "/station/",
		STATION_BY_ID: (stationId) => `/station/${stationId}`,

		// Haul endpoints
		HAUL: "/haul/",
		HAUL_BY_ID: (haulId) => `/haul/${haulId}`,
		CREATE_TRAWL: "/haul/new/",
		CREATE_HYDROGRAPHY: "/haul/hydrography/new/",

		// Survey endpoints
		SURVEY: "/survey/",
		SURVEY_BY_ID: (surveyId) => `/survey/${surveyId}`,

		// Strata endpoints
		STRATA: "/strata/",
		STRATA_BY_ID: (strataId) => `/strata/${strataId}`,

		// Gear endpoints
		GET_TRAWLS: "/gears/trawl/basic/",
		GET_CTDS: "/gears/ctd/basic/",

		// Samplers endpoint
		GET_SAMPLERS: "/samplers/",
	},

	HEADERS: {
		DEFAULT: {
			"Content-Type": "application/json",
		},
	},
};

// Helper function to build full URLs
export const buildApiUrl = (endpoint) => `${API_CONFIG.BASE_URL}${endpoint}`;
