import React from "react";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

const MeasurementsButtonBar = ({ add, setAdd }) => {
	if (add === false) {
		return (
			<div className="form__cell form__cell--right buttonsWrapper">
				<UiButtonStatusHandle buttonText={"Add Measurement"} handleMethod={setAdd} newStatus={true} />
			</div>
		);
	} else {
		return "";
	}
};

export default MeasurementsButtonBar;
