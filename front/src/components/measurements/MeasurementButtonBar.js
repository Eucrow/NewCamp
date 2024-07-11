import React from "react";

import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

/**
 * Button bar of Measurement component.
 * @param {object} props survey object.
 * @param {boolean} edit variable to indicate if the element is edited or not.
 * @param {method} handleEdit method to handle de 'edit' boolean variable.
 */

const MeasurementButtonBar = ({ id, edit, handleEdit, handleCancel, deleteMeasurement, isNameValid }) => {
	var content = "";

	if (edit === true) {
		content = (
			<div className="form__cell form__cell--right">
				<UiButtonSave buttonText={"Save Measurement"} isDisabled={!isNameValid} />
				<button
					onClick={() => {
						handleCancel();
					}}
				>
					Cancel
				</button>
			</div>
		);
	}

	if (edit === false) {
		content = (
			<div className="form__cell form__cell--right buttonsWrapper">
				<UiButtonStatusHandle
					buttonText={"Edit Measurement"}
					handleMethod={handleEdit}
					newStatus={true}
				></UiButtonStatusHandle>
				<UiButtonDelete
					id={id}
					deleteMethod={deleteMeasurement}
					buttonText="Delete Measurement"
					confirmMessage="Delete this species? All the samples of this species on ALL the surveys will be removed!! Are you sure?"
				/>
			</div>
		);
	}

	return content;
};

export default MeasurementButtonBar;
