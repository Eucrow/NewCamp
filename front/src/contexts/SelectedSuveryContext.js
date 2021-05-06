import React from "react";

// const survey_id = window.localStorage.getItem("survey_id")
// 	? window.localStorage.getItem("survey_id")
// 	: null;

// const SelectedSurveyContext = React.createContext({ survey_id: survey_id });

// const SelectedSurveyContext = React.createContext({
// 	surveySelector: null,
// 	setSurvey: () => {},
// });

const SelectedSurveyContext = React.createContext();

export default SelectedSurveyContext;
