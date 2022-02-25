import React, { Component } from "react";

import SurveysContext from "../../contexts/SuverysContext";
/**
 * Component of button to cancel the creation of a new survey.
 */
class UiButtonCancelNewSurvey extends Component {
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

export default UiButtonCancelNewSurvey;
