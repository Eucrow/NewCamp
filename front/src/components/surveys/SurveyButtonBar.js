import React, { useContext } from "react";

import SurveysContext from "../../contexts/SurveysContext";

import UiButtonSave from "../ui/UiButtonSave";
import UiButtonDelete from "../ui/UiButtonDelete";
// import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

/**
 * Button bar of survey component.
 * @param {object} survey survey object.
 * @param {boolean} edit variable to indicate if the element is edited or not.
 * @param {method} handleEdit method to handle de 'edit' boolean variable.
 * @param {method} deleteSurvey method to delete survey.
 */

// TODO: test if instead of receive props, receive only survey.id
const SurveyButtonBar = ({ survey, edit, handleEdit }) => {
	const surveysContext = useContext(SurveysContext);
	var ButtonBar = "";

	if (edit === true) {
		ButtonBar = (
			<div className="form__cell form__cell--right buttonsWrapper">
				<UiButtonSave buttonText={"Save Survey"} />
				{/* <UiButtonStatusHandle handleMethod={handleEdit} buttonText={"Cancel"} newStatus={false} /> */}
				<button
					className="buttonsWrapper__button"
					type="button"
					onClick={(e) => {
						e.preventDefault();
						surveysContext.handleCancelEditSurvey(e);
						handleEdit(false);
					}}
				>
					Cancel
				</button>
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
					id={survey.id}
					deleteMethod={surveysContext.deleteSurvey}
					buttonText="Delete Survey"
					confirmMessage="Delete the survey?"
				/>
			</div>
		);
	}

	return ButtonBar;
};

export default SurveyButtonBar;
