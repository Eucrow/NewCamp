import React, { Component } from "react";

import SurveysContext from "../../contexts/SuverysContext";
/**
 * Component of button to add a new ship.
 */
class UiButtonSaveNewShip extends Component {
	static contextType = SurveysContext;

	render() {
		let content = null;
		content = (
			<button type="submit" className="buttonsWrapper__button">
				Save Ship
			</button>
		);

		return content;
	}
}

export default UiButtonSaveNewShip;
