import React, { useContext } from "react";

import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

/**
 * Button bar of Sp component.
 * @param {object} props survey object.
 * @param {boolean} edit variable to indicate if the element is edited or not.
 * @param {method} handleEdit method to handle de 'edit' boolean variable.
 */

const MeasurementButtonBar = (props) => {
	var content = "";

	if (props.add === true) {
		content = (
			<div className="form__cell form__cell--right">
				<UiButtonSave buttonText={"Save Measurement"} />
				<UiButtonStatusHandle buttonText="Cancel" handleMethod={props.handleAdd} newStatus={false} />
			</div>
		);
	}

	if (props.edit === true) {
		content = (
			<div className="form__cell form__cell--right">
				<UiButtonSave buttonText={"Save Measurement"} />
				<UiButtonStatusHandle buttonText="Cancel" handleMethod={props.handleEdit} newStatus={false} />
			</div>
		);
	}

	if (props.edit === false) {
		content = (
			<div className="form__cell form__cell--right buttonsWrapper">
				<UiButtonStatusHandle
					buttonText={"Edit Measurement"}
					handleMethod={props.handleEdit}
					newStatus={true}
				></UiButtonStatusHandle>
				<UiButtonDelete
					id={props.sp_id}
					deleteMethod={props.deleteMeasurement}
					buttonText="Delete Measurement"
					confirmMessage="Delete this species? All the samples of this species on ALL the surveys will be removed!! Are you sure?"
				/>
			</div>
		);
	}

	return content;
};

export default MeasurementButtonBar;
