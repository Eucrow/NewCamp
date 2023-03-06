import React from "react";

/**
 * Lengths button bar component.
 */
const SexButtonBar = ({
	sex_id,
	sex_status,
	newSex,
	catch_id,
	setSexStatus,
	updateSex,
	deleteSex,
	lengths_status,
	setLengthsStatus,
	addSex,
	handleAddSexStatus,
	saveSexButtonStatus,
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
				<button
					className="buttonsWrapper__button"
					type="button"
					disabled={!saveSexButtonStatus}
					onClick={(e) => {
						updateSex(e);
						setSexStatus("view");
					}}
				>
					Save sex
				</button>
				<button
					className="buttonsWrapper__button"
					type="button"
					onClick={() => {
						setSexStatus("view");
					}}
				>
					Cancel
				</button>
			</div>
		);
	} else if (sex_status === "add") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<button
					className="buttonsWrapper__button"
					type="button"
					onClick={(e) => {
						addSex(e, newSex, catch_id);
						handleAddSexStatus(false);
					}}
				>
					Save sex
				</button>
				<button
					className="buttonsWrapper__button"
					type="button"
					onClick={() => {
						handleAddSexStatus(false);
					}}
				>
					Cancel
				</button>
			</div>
		);
	}

	return ButtonBar;
};

export default SexButtonBar;
