import React from "react";

const SelectSurveyButton = ({
	survey_id,
	survey_description,
	setSelectedSurvey,
}) => {
	return (
		<button
			onClick={() => {
				setSelectedSurvey(survey_description);
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
