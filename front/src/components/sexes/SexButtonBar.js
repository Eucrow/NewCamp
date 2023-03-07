import React from "react";

import UiButtonBooleanHandle from "../ui/UiButtonBooleanHandle";

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
	handleAddSexStatus,
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
					onClick={() => {
						setSexStatus("edit");
					}}
				>
					Edit sex
				</button>
				<button
					className="buttonsWrapper__button"
					type="button"
					onClick={() => {
						deleteSex(sex_id);
					}}
				>
					Delete sex
				</button>
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
				<button className="buttonsWrapper__button" type="submit">
					Save sex
				</button>
				<UiButtonBooleanHandle buttonText="Cancel" handleMethod={handleAddSexStatus} newBoolean={false} />
			</div>
		);
	}

	return ButtonBar;
};

export default SexButtonBar;
