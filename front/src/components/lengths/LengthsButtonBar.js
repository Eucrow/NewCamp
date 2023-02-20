import React, { Fragment, useContext } from "react";

import LengthsContext from "../../contexts/LengthsContext";

/**
 * Lengths button bar component.
 */
const LengthsButtonBar = () => {
	var ButtonBar = null;

	const lengthsContext = useContext(LengthsContext);

	if (lengthsContext.status_lengths === "hide") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<button
					className="buttonsWrapper__button"
					type="button"
					onclick={() => {
						lengthsContext.handleStatusLengths("view");
					}}
				>
					Show lengths
				</button>
			</div>
		);
	} else if (lengthsContext.status_lengths === "view") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<button
					className="buttonsWrapper__button"
					type="button"
					onClick={() => {
						lengthsContext.handleStatusLengths("edit");
					}}
				>
					Edit lengths
				</button>
			</div>
		);
	} else if (lengthsContext.status_lengths === "edit") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<button
					className="buttonsWrapper__button"
					type="button"
					onClick={(e) => {
						lengthsContext.saveOrUpdateLengths(
							e,
							lengthsContext.lengths
						);
						lengthsContext.removeZeroTails(lengthsContext.lengths);
					}}
				>
					Save
				</button>
				<button
					className="buttonsWrapper__button"
					type="button"
					onClick={() => {
						lengthsContext.handleStatusLengths("view");
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
