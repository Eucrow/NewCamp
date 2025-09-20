import React, { useContext } from "react";

import SelectedSurveyContext from "../../contexts/SelectedSuveryContext";

const UnselectSurveyButton = () => {
  const surveyContext = useContext(SelectedSurveyContext);
  const { setSelectedSurvey, setSelectedSurveyId, setSelectedSurveyAcronym } =
    surveyContext;
  if (window.localStorage.survey_id) {
    return (
      <button
        onClick={() => {
          localStorage.clear();
          setSelectedSurvey("");
          setSelectedSurveyId("");
          setSelectedSurveyAcronym("");
        }}
      >
        Unselect Survey
      </button>
    );
  } else {
    return "";
  }
};

export default UnselectSurveyButton;
