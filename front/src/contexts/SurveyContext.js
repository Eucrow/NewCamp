import React from "react";

const SurveyContext = React.createContext({
	surveySelector: null,
	setSurvey: () => {},
});

export default SurveyContext;
