import React, { useContext } from "react";

import LengthsContext from "../../contexts/LengthsContext";

/**
 * Lengths button bar component.
 */
const LengthsButtonBar = () => {
	var ButtonBar = null;

	const lengthsContext = useContext(LengthsContext);

	if (lengthsContext.lengths_status === "hide") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<button
					className="buttonsWrapper__button"
					type="button"
					onclick={() => {
						lengthsContext.setLengthsStatus("view");
					}}
				>
					Show lengths
				</button>
			</div>
		);
	} else if (lengthsContext.lengths_status === "view") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<button
					className="buttonsWrapper__button"
					type="button"
					onClick={() => {
						lengthsContext.setLengthsStatus("edit");
					}}
				>
					Edit lengths
				</button>
			</div>
		);
	} else if (lengthsContext.lengths_status === "edit") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<button
					className="buttonsWrapper__button"
					type="button"
					onClick={(e) => {
						lengthsContext.saveOrUpdateLengths(e, lengthsContext.lengths);
						lengthsContext.removeZeroTails(lengthsContext.lengths);
					}}
				>
					Save
				</button>
				<button
					className="buttonsWrapper__button"
					type="button"
					onClick={() => {
						lengthsContext.setLengthsStatus("view");
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
