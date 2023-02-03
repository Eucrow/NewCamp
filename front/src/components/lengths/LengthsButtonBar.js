import React, { useContext } from "react";

import LengthsContext from "../../contexts/LengthsContext";

/**
 * Lengths button bar component.
 */
const LengthsButtonBar = () => {
	var ButtonBar = null;

	const lengthsContext = useContext(LengthsContext);

	if (lengthsContext.statusLengths === "hide") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper">
				<button onClick={lengthsContext.handleShowLengths}>
					Show lengths
				</button>
			</div>
		);
	} else if (lengthsContext.statusLengths === "view") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper">
				<button onClick={lengthsContext.handleEditLengths}>
					Edit lengths
				</button>
				<button onClick={lengthsContext.handleHideLengths}>
					Hide lengths
				</button>
			</div>
		);
	} else if (lengthsContext.statusLengths === "edit") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper">
				<button
					onClick={(e) => {
						lengthsContext.saveOrUpdateLengths(
							e,
							lengthsContext.lengths
						);
					}}
				>
					Save
				</button>
				<button
					onClick={() => {
						lengthsContext.cancelEditLengths();
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
