import React, { Component } from "react";

import SurveysContext from "../../contexts/SuverysContext";
/**
 * Component of button to add a new survey.
 */
class UiButtonCancelEditSurvey extends Component {
	static contextType = SurveysContext;

	render() {
		return (
			<button
				className="buttonsWrapper__button"
				onClick={() => {
					this.context.handleAdd(false);
				}}
			>
				Cancel
			</button>
		);
	}
}

export default UiButtonCancelEditSurvey;
