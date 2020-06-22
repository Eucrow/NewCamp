import React, { useContext } from "react";

import SurveyContext from "../../contexts/SurveyContext.js";

// TODO: why I have to use survey_id.survey_id?? convert the original argument in a object, why??
const UnselectSurveyButton = () => {
  const { surveySelector, setSurvey } = useContext(SurveyContext);
//   console.log(survey_id.survey_id)
  return (
    <button onClick={() => setSurvey(null)}>
      Unselect Survey
    </button>
  );
};

export default UnselectSurveyButton;