import React from "react";

import UiButtonBooleanHandle from "../ui/UiButtonBooleanHandle";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonDelete from "../ui/UiButtonDelete";

/**
 * Component of Species bar.
 * @param {boolean} add true to show "Add" button.
 * @param {method} handleAdd Method to handle the 'add' parameter.
 * @param {method} handleDetail
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
				{/* <div className="buttonsWrapper"> */}
				<UiButtonBooleanHandle
					buttonText={"Cancel"}
					handleMethod={handleEdit}
					newBoolean={false}
				/>
				<UiButtonSave buttonText="Save Haul" />
				{/* </div> */}
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
