import React, { useContext } from "react";

import LengthsContext from "../../contexts/LengthsContext";
import SexContext from "../../contexts/SexContext";

import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

/**
 * Lengths button bar component.
 */
const LengthsButtonBar = () => {
	var ButtonBar = null;

	const lengthsContext = useContext(LengthsContext);
	const sexContext = useContext(SexContext);

	if (sexContext.sexStatus === "view") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<UiButtonStatusHandle
					buttonText={"Edit Lengths"}
					handleMethod={sexContext.setSexStatus}
					newStatus={"edit"}
				/>
			</div>
		);
	} else if (sexContext.sexStatus === "edit") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<button className="buttonsWrapper__button" type="submit" disabled={!lengthsContext.validLengths}>
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
	} else if (sexContext.sexStatus === "new") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<button className="buttonsWrapper__button" type="submit" disabled={!lengthsContext.validLengths}>
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
