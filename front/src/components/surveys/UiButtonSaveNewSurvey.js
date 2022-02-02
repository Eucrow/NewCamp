import React, { Component } from "react";

import SurveysContext from "../../contexts/SuverysContext";
/**
 * Component of button to add a new survey.
 * @param {object} props.survey - Survey object
 */
class UiButtonSaveNewSurvey extends Component {
	static contextType = SurveysContext;

	render() {
		let content = null;
		content = (
			<button className="buttonsWrapper__button">Save Survey</button>
		);

		return content;
	}
}

export default UiButtonSaveNewSurvey;
