import React, { Component } from "react";
/**
 * Component of button to add a new survey
 * @param {number} props.survey_id: id of the survey.
 * @param {method} props.deleteSurvey: method to delete survey.
 */
class UiButtonDeleteSurvey extends Component {
	render() {
		return (
			<button
				className="buttonsWrapper__button"
				onClick={(e) => {
					if (window.confirm("Delete the survey?")) {
						this.props.deleteSurvey(e, this.props.survey_id);
					}
				}}
			>
				Delete
			</button>
		);
	}
}

export default UiButtonDeleteSurvey;
