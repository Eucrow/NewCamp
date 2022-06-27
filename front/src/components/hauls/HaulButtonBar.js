import React from "react";

import UiButtonBooleanHandle from "../ui/UiButtonBooleanHandle";
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
const HaulButtonBar = ({
	haul_id,
	edit,
	handleEdit,
	handleDetail,
	deleteHaul,
}) => {
	var ButtonBar = null;

	if (edit === true) {
		ButtonBar = (
			<div className="form__cell form__cell--right buttonsWrapper">
				<UiButtonBooleanHandle
					buttonText={"Cancel"}
					handleMethod={handleEdit}
					newBoolean={false}
				/>
				<UiButtonSave buttonText="Save Haul" />
			</div>
		);
	}
	if (edit === false) {
		ButtonBar = (
			<div className="form__cell form__cell--right buttonsWrapper">
				<UiButtonBooleanHandle
					buttonText={"Edit Haul"}
					handleMethod={handleEdit}
					newBoolean={true}
				/>

				<UiButtonDelete
					id={haul_id}
					deleteMethod={deleteHaul}
					buttonText="Delete haul"
					confirmMessage="Are you sure to delete this haul?"
				/>

				<UiButtonBooleanHandle
					buttonText={"View Detail"}
					handleMethod={handleDetail}
					newBoolean={true}
				/>
			</div>
		);
	}

	return ButtonBar;
};

export default HaulButtonBar;
