import React from "react";

// import UiButtonAdd from "../ui/UiButtonAdd";

/**
 * Component of Surveys bar.
 * @param {boolean} add true to show "Add" button.
 * @param {method} handleAdd Method to handle the 'add' parameter.
 */
const LengthsButtonBar = ({
	updatedLengths,
	status_lengths,
	handleShowLengths,
	handleEditLengths,
	handleHideLengths,
	handleAddLength,
	saveOrUpdateLengths,
	handleCancelLengths,
	recoverLengths,
}) => {
	var ButtonBar = null;

	if (status_lengths === "hide") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper">
				<button onClick={handleShowLengths}>Show lengths</button>
			</div>
		);
	} else if (status_lengths === "view") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper">
				<button onClick={handleEditLengths}>Edit lengths</button>
				<button onClick={handleHideLengths}>Hide lengths</button>
			</div>
		);
	} else if (status_lengths === "edit") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper">
				<button type="button" onClick={handleAddLength}>
					Add length
				</button>
				<button
					onClick={(e) => {
						saveOrUpdateLengths(e, updatedLengths);
					}}
				>
					Save
				</button>
				<button
					onClick={() => {
						recoverLengths();
						handleCancelLengths();
					}}
				>
					Cancel
				</button>
			</div>
		);
	}

	return ButtonBar;
};

export default LengthsButtonBar;
