import React from "react";

import UiButtonDeleteSurvey from "./UiButtonDeleteSurvey";
import UiButtonCancel from "../ui/UiButtonCancel";

/**
 * Button bar of Survey.
 * @param {object} props survey object.
 * @param {boolean} edit variable to indicate if the element is edited or not.
 * @param {method} handleEdit method to handle de 'edit' boolean variable.
 */

// TODO: test if instead of receive props, receive only survey.id
const SurveyButtonBar = ({ props, edit, handleEdit }) => {
	var ButtonBar = "";

	if (edit === true) {
		ButtonBar = (
			<div className="form__cell form__cell--right buttonsWrapper">
				<button type="submit" className="buttonsWrapper__button">
					Save Survey
				</button>
				<UiButtonCancel handleMethod={handleEdit} />
			</div>
		);
	}

	if (edit === false) {
		ButtonBar = (
			<div className="form__cell form__cell--right buttonsWrapper">
				<button
					type="button"
					className="buttonsWrapper__button"
					onClick={(e) => {
						handleEdit(true);
					}}
				>
					Edit Survey
				</button>
				<UiButtonDeleteSurvey survey_id={props.survey.id} />
			</div>
		);
	}

	return ButtonBar;
};

export default SurveyButtonBar;
