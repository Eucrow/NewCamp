import React from "react";

import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonCancel from "../ui/UiButtonCancel";

/**
 * Lengths button bar component.
 */
const SexButtonBar = ({
	sex_id,
	sex_status,
	setSexStatus,
	deleteSex,
	lengths_status,
	setLengthsStatus,
	setAddSexStatus,
	saveSexButtonStatus,
	handleCancelEditSex,
}) => {
	var ButtonBar = null;

	if (sex_status === "view") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<button
					className="buttonsWrapper__button"
					type="button"
					onClick={(e) => {
						e.preventDefault();
						setSexStatus("edit");
					}}
				>
					Edit sex
				</button>
				<UiButtonDelete
					id={sex_id}
					deleteMethod={deleteSex}
					buttonText={"Delete sex"}
					confirmMessage={"Are you sure to remove this sex?"}
				/>
				{lengths_status === "view" ? (
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
	} else if (sex_status === "edit") {
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
	} else if (sex_status === "add") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<UiButtonSave buttonText={"Save sex"} />
				<UiButtonCancel handleMethod={setAddSexStatus} />
			</div>
		);
	}

	return ButtonBar;
};

export default SexButtonBar;
