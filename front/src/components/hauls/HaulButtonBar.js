import React from "react";

import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonDelete from "../ui/UiButtonDelete";
import UiIconDetailShow from "../ui/UiIconDetailShow";
import UiIconEdit from "../ui/UiIconEdit";

/**
 * Component haul button bar.
 * @param {numerics} haul_id
 * @param {boolean} edit
 * @param {method} setEdit
 * @param {method} handleDetail
 * @param {method} deleteHaul: method used to delete haul.
 */
const HaulButtonBar = ({ haul_id, edit, detail, setEdit, handleDetail, deleteHaul, handleCancel }) => {
	var ButtonBar = null;

	// The button bar is not showed if the details are showed.
	if (detail === true) {
		return ButtonBar;
	}

	if (edit === true) {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<UiButtonSave buttonText="Save Haul" />
				<UiButtonStatusHandle buttonText={"Cancel"} handleMethod={handleCancel} newStatus={false} />
			</div>
		);
	}

	if (edit === false && detail === false) {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<UiButtonStatusHandle handleMethod={setEdit} buttonText={"Edit sex"} newStatus={true}>
					<UiIconEdit />
				</UiButtonStatusHandle>

				<UiButtonDelete
					id={haul_id}
					deleteMethod={deleteHaul}
					buttonText="Delete haul"
					confirmMessage="Are you sure to delete this haul?"
				/>

				<UiButtonStatusHandle buttonText={"View haul details"} handleMethod={handleDetail} newStatus={true}>
					<UiIconDetailShow />
				</UiButtonStatusHandle>
			</div>
		);
	}

	return ButtonBar;
};

export default HaulButtonBar;
