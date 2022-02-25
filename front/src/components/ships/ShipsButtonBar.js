import React from "react";

import UiButtonAddShip from "./UiButtonAddShip";

/**
 * Component of Surveys bar.
 * @param {boolean} add true to show "Add Survey" button.
 */
const ShipsButtonBar = ({ add }) => {
	var ButtonBar = null;

	if (add === false) {
		ButtonBar = (
			<div className="survey__cell survey__cell--right buttonsWrapper">
				<UiButtonAddShip />
			</div>
		);
	}

	return ButtonBar;
};

export default ShipsButtonBar;
