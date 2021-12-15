import React, { Component } from "react";

import SurveysContext from "../../contexts/SuverysContext";
/**
 * Component of button to add a new survey.
 * @param {object} props.survey - Survey object
 */
class UiButtonSaveNewSurvey extends Component {
	static contextType = SurveysContext;

	render() {
		return (
			<button
				className="buttonsWrapper__button"
				onClick={(e) => {
					this.context.createSurvey(e, this.props.survey);
					this.context.handleAdd(false);
				}}
			>
				Save Survey
			</button>
		);
	}
}

export default UiButtonSaveNewSurvey;
