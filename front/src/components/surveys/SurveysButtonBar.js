import React from "react";

import UiButtonAddSurvey from "./UiButtonAddSurvey";

/**
 * Component of Surveys bar.
 * @param {object} props
 * @param {boolean} add true to show "Add Survey" button.
 */
const SurveysButtonBar = ({ add }) => {
	var ButtonBar = null;

	if (add === false) {
		ButtonBar = (
			<div className="survey__cell survey__cell--right buttonsWrapper">
				<UiButtonAddSurvey />
			</div>
		);
	}

	return ButtonBar;
};

export default SurveysButtonBar;
