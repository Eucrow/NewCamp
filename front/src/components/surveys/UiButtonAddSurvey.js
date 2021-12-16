import React, { Component } from "react";

import SurveysContext from "../../contexts/SuverysContext";
/**
 * Component of button to add a new survey.
 */
class UiButtonAddSurvey extends Component {
	static contextType = SurveysContext;

	render() {
		return (
			<button
				className="buttonsWrapper__button"
				onClick={() => {
					this.context.handleAdd(true);
				}}
			>
				Add Survey
			</button>
		);
	}
}

export default UiButtonAddSurvey;
