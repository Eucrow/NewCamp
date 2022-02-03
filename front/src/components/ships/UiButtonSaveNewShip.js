import React, { Component } from "react";

import SurveysContext from "../../contexts/SuverysContext";
/**
 * Component of button to add a new survey.
 */
class UiButtonSaveNewShip extends Component {
	static contextType = SurveysContext;

	render() {
		let content = null;
		content = (
			<button type="submit" className="buttonsWrapper__button">
				Save Survey
			</button>
		);

		return content;
	}
}

export default UiButtonSaveNewShip;
