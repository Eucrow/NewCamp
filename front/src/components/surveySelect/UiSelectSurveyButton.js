import React, { useContext } from "react";

import SelectedSurveyContext from "../../contexts/SelectedSuveryContext";

const SelectSurveyButton = ({
  survey_id,
  survey_description,
  survey_acronym,
}) => {
  const selectedSurveyContext = useContext(SelectedSurveyContext);
  const { setSelectedSurvey, setSelectedSurveyId, setSelectedSurveyAcronym } =
    selectedSurveyContext;

  return (
    <button
      className="selectSurvey__element"
      name={survey_description}
      onClick={() => {
        setSelectedSurvey(survey_description);
        setSelectedSurveyId(survey_id);
        setSelectedSurveyAcronym(survey_acronym);
      }}
    >
      Select Survey
    </button>
  );
};

export default SelectSurveyButton;
