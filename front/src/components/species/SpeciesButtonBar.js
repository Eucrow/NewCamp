import React from "react";

import UiButtonAddSp from "./UiButtonAddSp";

/**
 * Component of Surveys bar.
 * @param {boolean} add true to show "Add Survey" button.
 */
const SpeciesButtonBar = ({ add }) => {
	var ButtonBar = null;

	if (add === false) {
		ButtonBar = (
			<div className="survey__cell survey__cell--right buttonsWrapper">
				<UiButtonAddSp add={add} />
			</div>
		);
	}

	return ButtonBar;
};

export default SpeciesButtonBar;
