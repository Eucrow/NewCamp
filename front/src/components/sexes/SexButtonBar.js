import React, { useContext } from "react";

import UiButtonDelete from "../ui/UiButtonDelete";
import SexContext from "../../contexts/SexContext";

const SexButtonBar = ({ sexId, deleteSex }) => {
	const sexContext = useContext(SexContext);
	var ButtonBar = null;

	if (sexContext.sexStatus === "view") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<UiButtonDelete
					id={sexId}
					deleteMethod={deleteSex}
					buttonText={"Delete sex"}
					confirmMessage={"Are you sure to remove this sex and all its lengths?"}
				/>
			</div>
		);
	} else if (sexContext.sexStatus === "empty") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<button
					className="buttonsWrapper__button"
					onClick={() => {
						sexContext.setSexStatus("add");
					}}
				>
					Add {sexContext.sexesAvailable[sexContext.sex]}
				</button>
			</div>
		);
	}

	return ButtonBar;
};

export default SexButtonBar;
