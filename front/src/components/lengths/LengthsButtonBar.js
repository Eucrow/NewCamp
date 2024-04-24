import React, { useContext } from "react";

import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiButtonDelete from "../ui/UiButtonDelete";

import GlobalContext from "../../contexts/GlobalContext";
import LengthsContext from "../../contexts/LengthsContext";

/**
 * Lengths button bar component.
 */
const LengthsButtonBar = () => {
	var ButtonBar = null;

	const globalContext = useContext(GlobalContext);
	const lengthsContext = useContext(LengthsContext);

	if (lengthsContext.lengthsStatus === "empty") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<button
					className="buttonsWrapper__button"
					onClick={() => {
						lengthsContext.setLengthsStatus("add");
					}}
				>
					Add {globalContext.sexesAvailable[lengthsContext.sex]}
				</button>
			</div>
		);
	} else if (lengthsContext.lengthsStatus === "view") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<UiButtonStatusHandle
					buttonText={"Edit Lengths"}
					handleMethod={lengthsContext.setLengthsStatus}
					newStatus={"edit"}
				/>
				<UiButtonDelete
					deleteMethod={lengthsContext.deleteLengths}
					buttonText={"Delete lengths"}
					confirmMessage={"Are you sure to remove all the lengths of this sex?"}
				/>
			</div>
		);
	} else if (lengthsContext.lengthsStatus === "edit") {
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
				<div className="form__cell buttonsWrapper--center"></div>
			</div>
		);
	} else if (lengthsContext.lengthsStatus === "add") {
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
