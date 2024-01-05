import React from "react";

import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonDelete from "../ui/UiButtonDelete";
import UiIconDetailShow from "../ui/UiIconDetailShow";
import UiIconEdit from "../ui/UiIconEdit";
import UiIconBiometrics from "../ui/UiIconCatches";

/**
 * Component haul button bar.
 * @param {numerics} haul_id
 * @param {boolean} edit
 * @param {method} setEdit
 * @param {method} handleDetail
 * @param {method} deleteHaul: method used to delete haul.
 */
const HaulButtonBar = ({
	haul_id,
	edit,
	detail,
	setEdit,
	setDetail,
	deleteHaul,
	handleCancel,
	catchesMode,
	setCatchesMode,
}) => {
	// var ButtonBar = null;

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
				{/* <UiButtonStatusHandle handleMethod={setEdit} buttonText={"Edit haul"} newStatus={true}>
					<UiIconEdit />
				</UiButtonStatusHandle> */}
				{/* 
				<UiButtonDelete
					id={haul_id}
					deleteMethod={deleteHaul}
					buttonText="Delete haul"
					confirmMessage="Are you sure to delete this haul?"
				/> */}

				{/* <UiButtonStatusHandle buttonText={"View haul details"} handleMethod={handleDetail} newStatus={true}>
					<UiIconDetailShow />
				</UiButtonStatusHandle> */}

				<UiButtonStatusHandle buttonText={"Hide catchess"} handleMethod={setCatchesMode} newStatus={false}>
					<UiIconBiometrics />
				</UiButtonStatusHandle>
			</div>
		),
	};

	// // The button bar is not showed if the details are showed.
	// if (detail === true) {
	// 	return ButtonBar;
	// }

	// if (edit === true) {
	// 	ButtonBar = (
	// 		<div className="form__cell form__cell--right">
	// 			<UiButtonSave buttonText="Save Haul" />
	// 			<UiButtonStatusHandle buttonText={"Cancel"} handleMethod={handleCancel} newStatus={false} />
	// 		</div>
	// 	);
	// }

	// if (edit === false && detail === false && catches === false) {
	// 	ButtonBar = (
	// 		<div className="form__cell form__cell--right">
	// 			<UiButtonStatusHandle handleMethod={setEdit} buttonText={"Edit haul"} newStatus={true}>
	// 				<UiIconEdit />
	// 			</UiButtonStatusHandle>

	// 			<UiButtonDelete
	// 				id={haul_id}
	// 				deleteMethod={deleteHaul}
	// 				buttonText="Delete haul"
	// 				confirmMessage="Are you sure to delete this haul?"
	// 			/>

	// 			<UiButtonStatusHandle buttonText={"View haul details"} handleMethod={handleDetail} newStatus={true}>
	// 				<UiIconDetailShow />
	// 			</UiButtonStatusHandle>
	// 			<UiButtonStatusHandle buttonText={"View catchess"} handleMethod={setCatches} newStatus={true}>
	// 				<UiIconBiometrics />
	// 			</UiButtonStatusHandle>
	// 		</div>
	// 	);
	// } else if (edit === false && detail === false && catches === true) {
	// 	ButtonBar = (
	// 		<div className="form__cell form__cell--right">
	// 			<UiButtonStatusHandle handleMethod={setEdit} buttonText={"Edit haul"} newStatus={true}>
	// 				<UiIconEdit />
	// 			</UiButtonStatusHandle>

	// 			<UiButtonDelete
	// 				id={haul_id}
	// 				deleteMethod={deleteHaul}
	// 				buttonText="Delete haul"
	// 				confirmMessage="Are you sure to delete this haul?"
	// 			/>

	// 			<UiButtonStatusHandle buttonText={"View haul details"} handleMethod={handleDetail} newStatus={true}>
	// 				<UiIconDetailShow />
	// 			</UiButtonStatusHandle>

	// 			<UiButtonStatusHandle buttonText={"Hide catchess"} handleMethod={setCatches} newStatus={false}>
	// 				<UiIconBiometrics />
	// 			</UiButtonStatusHandle>
	// 		</div>
	// 	);
	// }

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
