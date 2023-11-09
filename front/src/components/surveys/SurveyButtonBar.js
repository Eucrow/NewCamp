import React from "react";

import UiButtonSave from "../ui/UiButtonSave";
import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

/**
 * Button bar of survey component.
 * @param {object} props survey object.
 * @param {boolean} edit variable to indicate if the element is edited or not.
 * @param {method} handleEdit method to handle de 'edit' boolean variable.
 * @param {method} deleteSurvey method to delete survey.
 */

// TODO: test if instead of receive props, receive only survey.id
const SurveyButtonBar = ({ props, edit, handleEdit, deleteSurvey }) => {
	var ButtonBar = "";

	if (edit === true) {
		ButtonBar = (
			<div className="form__cell form__cell--right buttonsWrapper">
				<UiButtonSave buttonText={"Save Survey"} />
				<UiButtonStatusHandle handleMethod={handleEdit} buttonText={"Cancel"} newStatus={false} />
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
				<UiButtonDelete
					id={props.survey.id}
					deleteMethod={deleteSurvey}
					buttonText="Delete Survey"
					confirmMessage="Delete the survey?"
				/>
			</div>
		);
	}

	return ButtonBar;
};

export default SurveyButtonBar;
