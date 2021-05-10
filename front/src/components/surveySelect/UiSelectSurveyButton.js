import React, { useContext } from "react";

import SelectedSurveyContext from "../../contexts/SelectedSuveryContext";

const SelectSurveyButton = ({ survey_id, survey_description }) => {
	const surveyContext = useContext(SelectedSurveyContext);
	const { setSelectedSurvey, setSelectedSurveyId } = surveyContext;

	return (
		<button
			className="myWrapper__element"
			name={survey_description}
			onClick={() => {
				setSelectedSurvey(survey_description);
				setSelectedSurveyId(survey_id);
				window.localStorage.setItem("survey_id", survey_id);
				window.localStorage.setItem(
					"survey_description",
					survey_description
				);
			}}
		>
			Select Survey
		</button>
	);
};

export default SelectSurveyButton;
