import React from "react";

const UnselectSurveyButton = ({ setSelectedSurvey }) => {
	if (window.localStorage.survey_id) {
		return (
			<button
				onClick={() => {
					localStorage.clear();
					setSelectedSurvey("");
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
