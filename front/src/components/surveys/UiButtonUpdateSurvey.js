import React, { Component } from "react";
/**
 * Component of button to add a new survey
 * @param {number} props.survey_id: id of the survey.
 * @param {method} props.handleEdit: method to manage the 'edit' state.
 */
class UiButtonUpdateSurvey extends Component {
	render() {
		return (
			<button
				className="buttonsWrapper__button"
				onClick={() => {
					this.props.handleEdit(this.props.survey_id);
				}}
			>
				Edit
			</button>
		);
	}
}

export default UiButtonUpdateSurvey;
