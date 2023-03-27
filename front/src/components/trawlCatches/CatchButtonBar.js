import React from "react";

import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonCancel from "../ui/UiButtonCancel";

/**
 * Lengths button bar component.
 */
const CatchButtonBar = ({
	catch_id,
	catch_status,
	view_sexes,
	editCatchStatus,
	removeCatch,
	handleViewSexes,
	// sex_id,
	// sex_status,
	// setSexStatus,
	// deleteSex,
	// lengths_status,
	// setLengthsStatus,
	// setAddSexStatus,
	// saveSexButtonStatus,
	// handleCancelEditSex,
}) => {
	var ButtonBar = null;

	if (catch_status === "view") {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<button
					className="buttonsWrapper__button"
					onClick={() => {
						editCatchStatus("edit");
					}}
				>
					Edit catch
				</button>
				<button
					className="buttonsWrapper__button"
					onClick={() => {
						removeCatch(catch_id);
					}}
				>
					Delete catch
				</button>
				{view_sexes === false ? (
					<button className="buttonsWrapper__button" onClick={() => handleViewSexes(true)}>
						View sexes
					</button>
				) : (
					<button className="buttonsWrapper__button" onClick={() => handleViewSexes(false)}>
						Hide sexes
					</button>
				)}
			</div>
		);
	} else {
		ButtonBar = null;
	}
	//  else if (sex_status === "edit") {
	// 	ButtonBar = (
	// 		<div className="form__cell buttonsWrapper--center">
	// 			<button className="buttonsWrapper__button" type="submit" disabled={!saveSexButtonStatus}>
	// 				Save sex
	// 			</button>
	// 			<button
	// 				className="buttonsWrapper__button"
	// 				type="button"
	// 				onClick={() => {
	// 					handleCancelEditSex();
	// 				}}
	// 			>
	// 				Cancel
	// 			</button>
	// 		</div>
	// 	);
	// } else if (sex_status === "add") {
	// 	ButtonBar = (
	// 		<div className="form__cell buttonsWrapper--center">
	// 			<UiButtonSave buttonText={"Save sex"} />
	// 			<UiButtonCancel handleMethod={setAddSexStatus} />
	// 		</div>
	// 	);
	// }

	return ButtonBar;
};

export default CatchButtonBar;
