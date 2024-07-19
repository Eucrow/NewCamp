import React from "react";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

/**
 * Represents the MeasurementsButtonBar component.
 * This component displays a button bar for adding measurements.
 *
 * @component
 * @param {boolean} add - A boolean value indicating whether to display the "Add Measurement" button.
 * @param {function} setAdd - A function to update the value of the "add" prop.
 * @returns {JSX.Element} The rendered MeasurementsButtonBar component.
 */

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
