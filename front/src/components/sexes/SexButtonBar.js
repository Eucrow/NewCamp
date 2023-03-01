import React from "react";

/**
 * Lengths button bar component.
 */
const SexButtonBar = ({
	sex_id,
	sex_status,
	new_sex,
	catch_id,
	handleSexStatus,
	updateSex,
	deleteSex,
	lengths_status,
	handleLengthsStatus,
	addSex,
	handleAddSexStatus,
}) => {
	var ButtonBar = null;

	if (sex_status === "view") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<button
					className="buttonsWrapper__button"
					type="button"
					onClick={() => {
						handleSexStatus("edit");
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
							handleLengthsStatus("hide");
						}}
					>
						Hide Lengths
					</button>
				) : (
					<button
						className="buttonsWrapper__button"
						type="button"
						onClick={() => {
							handleLengthsStatus("view");
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
					onClick={(e) => {
						updateSex(e);
						handleSexStatus("view");
					}}
				>
					Save sex
				</button>
				<button
					className="buttonsWrapper__button"
					type="button"
					onClick={() => {
						handleSexStatus("view");
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
						addSex(e, new_sex, catch_id);
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
