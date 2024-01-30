import React, { useContext } from "react";

import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import SexContext from "../../contexts/SexContext";

const SexButtonBar = ({ sexId, deleteSex, setAddSex }) => {
	const sexContext = useContext(SexContext);
	var ButtonBar = null;

	if (sexContext.sexStatus === "view") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<UiButtonDelete
					id={sexId}
					deleteMethod={deleteSex}
					buttonText={"Delete sex"}
					confirmMessage={"Are you sure to remove this sex?"}
				/>
			</div>
		);
	} else if (sexContext.sexStatus === "add") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<UiButtonSave buttonText={"Save sex"} />
				<UiButtonStatusHandle buttonText={"Cancel"} handleMethod={setAddSex} newStatus={false} />
			</div>
		);
	} else {
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
