import React, { useContext } from "react";

import SurveysContext from "../../contexts/SuverysContext";
/**
 * Component of button to add a new survey
 * @param {number} props.survey_id: id of the survey.
 */
const UiButtonDeleteSurvey = ({ survey_id }) => {
	const surveysContext = useContext(SurveysContext);

	const renderedButton = (
		<button
			type="button"
			className="buttonsWrapper__button"
			onClick={(e) => {
				if (window.confirm("Delete the survey?")) {
					surveysContext.deleteSurvey(e, survey_id);
				}
			}}
		>
			Delete Survey
		</button>
	);

	return renderedButton;
};

export default UiButtonDeleteSurvey;
