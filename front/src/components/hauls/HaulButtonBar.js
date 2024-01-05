import React from "react";

import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonDelete from "../ui/UiButtonDelete";
import UiIconDetailShow from "../ui/UiIconDetailShow";
import UiIconEdit from "../ui/UiIconEdit";
import UiIconBiometrics from "../ui/UiIconCatches";

/**
 * HaulButtonBar component.
 * Renders a button bar with different actions related to a haul.
 *
 * @param {number} haul_id - The ID of the haul.
 * @param {boolean} edit - A boolean indicating if the haul is currently being edited.
 * @param {function} setEdit - A function to set the edit state.
 * @param {function} setDetail - A function to set the detail view state.
 * @param {function} deleteHaul - A function to delete the haul.
 * @param {function} handleCancel - A function to handle canceling the edition of the haul.
 * @param {boolean} catchesMode - A boolean indicating if the catches mode is active.
 * @param {function} setCatchesMode - A function to set the catches mode state.
 *
 * @returns {React.Element} The rendered HaulButtonBar component.
 */
const HaulButtonBar = ({
	haul_id,
	edit,
	setEdit,
	setDetail,
	deleteHaul,
	handleCancel,
	catchesMode,
	setCatchesMode,
}) => {
	const buttonBarConfig = {
		defaultMode: (
			<div className="form__cell form__cell--right">
				<UiButtonStatusHandle handleMethod={setEdit} buttonText={"Edit haul"} newStatus={true}>
					<UiIconEdit />
				</UiButtonStatusHandle>

				<UiButtonDelete
					id={haul_id}
					deleteMethod={deleteHaul}
					buttonText="Delete haul"
					confirmMessage="Are you sure to delete this haul?"
				/>

				<UiButtonStatusHandle buttonText={"View haul details"} handleMethod={setDetail} newStatus={true}>
					<UiIconDetailShow />
				</UiButtonStatusHandle>

				<UiButtonStatusHandle buttonText={"View catchess"} handleMethod={setCatchesMode} newStatus={true}>
					<UiIconBiometrics />
				</UiButtonStatusHandle>
			</div>
		),

		editHaulMode: (
			<div className="form__cell form__cell--right">
				<UiButtonSave buttonText="Save Haul" />
				<UiButtonStatusHandle buttonText={"Cancel"} handleMethod={handleCancel} newStatus={false} />
			</div>
		),

		catchesMode: (
			<div className="form__cell form__cell--right">
				<UiButtonStatusHandle buttonText={"Hide catchess"} handleMethod={setCatchesMode} newStatus={false}>
					<UiIconBiometrics />
				</UiButtonStatusHandle>
			</div>
		),
	};

	let currentMode;
	if (edit === true) {
		currentMode = "editHaulMode";
	} else if (catchesMode === true) {
		currentMode = "catchesMode";
	} else {
		currentMode = "defaultMode";
	}

	const ButtonBar = buttonBarConfig[currentMode];

	return ButtonBar;
};

export default HaulButtonBar;
