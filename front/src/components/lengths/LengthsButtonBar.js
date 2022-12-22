import React from "react";

/**
 * Component of Surveys bar.
 */
const LengthsButtonBar = ({
	lengths,
	statusLengths,
	handleShowLengths,
	handleEditLengths,
	handleHideLengths,
	saveOrUpdateLengths,
	cancelEditLengths,
}) => {
	var ButtonBar = null;

	if (statusLengths === "hide") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper">
				<button onClick={handleShowLengths}>Show lengths</button>
			</div>
		);
	} else if (statusLengths === "view") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper">
				<button onClick={handleEditLengths}>Edit lengths</button>
				<button onClick={handleHideLengths}>Hide lengths</button>
			</div>
		);
	} else if (statusLengths === "edit") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper">
				<button
					onClick={(e) => {
						saveOrUpdateLengths(e, lengths);
					}}
				>
					Save
				</button>
				<button
					onClick={() => {
						cancelEditLengths();
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
