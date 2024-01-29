import React from "react";

import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiIconDetailShow from "../ui/UiIconDetailShow";
import UiIconDetailHide from "../ui/UiIconDetailHide";

/**
 * Lengths button bar component.
 */
const SexButtonBar = ({
	sexId,
	sex,
	sexesAvailable,
	sexStatus,
	setSexStatus,
	deleteSex,
	lengthsStatus,
	setLengthsStatus,
	setAddSex,
}) => {
	var ButtonBar = null;

	if (sexStatus === "view") {
		ButtonBar = (
			<div className="form__cell buttonsWrapper--center">
				<UiButtonDelete
					id={sexId}
					deleteMethod={deleteSex}
					buttonText={"Delete sex"}
					confirmMessage={"Are you sure to remove this sex?"}
				/>
				{/* {lengthsStatus === "view" ? (
					<UiButtonStatusHandle
						handleMethod={setLengthsStatus}
						buttonText={"Hide Lengths"}
						newStatus={"hide"}
					>
						<UiIconDetailHide />
					</UiButtonStatusHandle>
				) : (
					<UiButtonStatusHandle
						handleMethod={setLengthsStatus}
						buttonText={"Show Lengths"}
						newStatus={"view"}
					>
						<UiIconDetailShow />
					</UiButtonStatusHandle>
				)} */}
			</div>
		);
	} else if (sexStatus === "add") {
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
						setSexStatus("add");
					}}
				>
					Add {sexesAvailable[sex]}
				</button>
			</div>
		);
	}

	return ButtonBar;
};

export default SexButtonBar;
