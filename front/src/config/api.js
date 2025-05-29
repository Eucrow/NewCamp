export const API_CONFIG = {
	BASE_URL: process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api/1.0",

	ENDPOINTS: {
		// Ships endpoints
		GET_SHIPS: "/ship/",

		// Strata endpoints
		// TODO: maybe stratifications should be changed to strata?
		GET_STRATA: "/stratifications",
		STRATA: "/strata/",
		STRATA_BY_ID: (strataId) => `/strata/${strataId}`,

		// Gear endpoints
		GET_TRAWLS: "/gears/trawl/basic/",
		GET_CTDS: "/gears/ctd/basic/",

		// Samplers endpoint
		GET_SAMPLERS: "/samplers/",

		// Species endpoints
		GET_SPECIES: "/species/",

		// Measurement types endpoints
		GET_MEASUREMENT_TYPES: "/measurement_types/",

		// Surveys endpoints
		GET_SURVEYS: "/survey",
		SURVEY: "/survey/",
		SURVEY_BY_ID: (surveyId) => `/survey/${surveyId}`,

		// Catches endpoints
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

		// Trawl endpoints
		GET_TRAWL_BY_HAUL_ID: (haulId) => `/trawl/${haulId}`,

		// Hydrography endpoints
		GET_HYDROGRAPHY_BY_HAUL_ID: (haulId) => `/hydrography/${haulId}`,

		// Meteorology endpoints
		GET_METEOROLOGY_BY_HAUL_ID: (haulId) => `/meteorology/${haulId}`,

		// Lengths endpoints
		GET_LENGTHS: "/lengths/",
		SAVE_GET_DELETE_LENGTHS: (catchId, sex) => `/lengths/${catchId}/${sex}`,

		// Reports endpoints
		GET_REPORTS_CSV: (surveyId) => `/reports/report_csv/${surveyId}`,
	},
	HEADERS: {
		DEFAULT: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	},
};

// Helper function to build full URLs
export const buildApiUrl = (endpoint) => `${API_CONFIG.BASE_URL}${endpoint}`;
