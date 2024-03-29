import React from "react";

import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiIconEdit from "../ui/UiIconEdit";

/**
 * Lengths button bar component.
 */
const SexButtonBar = ({
	sexId,
	sexStatus,
	setSexStatus,
	deleteSex,
	lengthsStatus,
	setLengthsStatus,
	setAddSex,
	saveSexButtonStatus,
	handleCancelEditSex,
}) => {
	var ButtonBar = null;

	if (sexStatus === "view") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<UiButtonStatusHandle handleMethod={setSexStatus} buttonText={"Edit sex"} newStatus={"edit"}>
					<UiIconEdit />
				</UiButtonStatusHandle>
				<UiButtonDelete
					id={sexId}
					deleteMethod={deleteSex}
					buttonText={"Delete sex"}
					confirmMessage={"Are you sure to remove this sex?"}
				/>
				{lengthsStatus === "view" ? (
					<button
						className="buttonsWrapper__button"
						type="button"
						onClick={() => {
							setLengthsStatus("hide");
						}}
					>
						Hide Lengths
					</button>
				) : (
					<button
						className="buttonsWrapper__button"
						type="button"
						onClick={() => {
							setLengthsStatus("view");
						}}
					>
						Show Lengths
					</button>
				)}
			</div>
		);
	} else if (sexStatus === "edit") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<button className="buttonsWrapper__button" type="submit" disabled={!saveSexButtonStatus}>
					Save sex
				</button>
				<button
					className="buttonsWrapper__button"
					type="button"
					onClick={() => {
						handleCancelEditSex();
					}}
				>
					Cancel
				</button>
			</div>
		);
	} else if (sexStatus === "add") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<UiButtonSave buttonText={"Save sex"} />
				<UiButtonStatusHandle buttonText={"Cancel"} handleMethod={setAddSex} newStatus={false} />
			</div>
		);
	}

	return ButtonBar;
};

export default SexButtonBar;
