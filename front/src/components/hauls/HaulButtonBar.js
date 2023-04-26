import React from "react";

import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonDelete from "../ui/UiButtonDelete";

/**
 * Component haul button bar.
 * @param {numerics} haul_id
 * @param {boolean} edit
 * @param {method} handleEdit
 * @param {method} handleDetail
 * @param {method} deleteHaul: method used to delete haul.
 */
const HaulButtonBar = ({ haul_id, edit, handleEdit, handleDetail, deleteHaul }) => {
	var ButtonBar = null;

	if (edit === true) {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<UiButtonStatusHandle buttonText={"Cancel"} handleMethod={handleEdit} newStatus={false} />
				<UiButtonSave buttonText="Save Haul" />
			</div>
		);
	}
	if (edit === false) {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<UiButtonStatusHandle buttonText={"Edit Haul"} handleMethod={handleEdit} newStatus={true} />

				<UiButtonDelete
					id={haul_id}
					deleteMethod={deleteHaul}
					buttonText="Delete haul"
					confirmMessage="Are you sure to delete this haul?"
				/>

				<UiButtonStatusHandle buttonText={"View Detail"} handleMethod={handleDetail} newStatus={true} />
			</div>
		);
	}

	return ButtonBar;
};

export default HaulButtonBar;
