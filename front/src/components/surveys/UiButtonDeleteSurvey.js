import React, { Component } from "react";

import SurveysContext from "../../contexts/SuverysContext";
/**
 * Component of button to add a new survey
 * @param {number} props.survey_id: id of the survey.
 */
class UiButtonDeleteSurvey extends Component {
	static contextType = SurveysContext;

	render() {
		return (
			<button
				className="buttonsWrapper__button"
				onClick={(e) => {
					if (window.confirm("Delete the survey?")) {
						this.context.deleteSurvey(e, this.props.survey_id);
					}
				}}
			>
				Delete
			</button>
		);
	}
}

export default UiButtonDeleteSurvey;
