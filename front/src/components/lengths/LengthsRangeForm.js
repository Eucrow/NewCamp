import React, { useContext } from "react";
import { useState } from "react";

import LengthsContext from "../../contexts/LengthsContext";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

/**
 * Form to create a range of lengths.
 * @returns {JSX.Element} A JSX element that renders the lengths range form.
 */
const LengthsRangeForm = () => {
	const lengthsContext = useContext(LengthsContext);

	const [minimumRange, setMinimumRange] = useState("");

	const [maximumRange, setMaximumRange] = useState("");

	const handleMinimumRange = (e) => {
		setMinimumRange(e.target.value);
	};

	const handleMaximumRange = (e) => {
		setMaximumRange(e.target.value);
	};

	return (
		<form className="lengthsWrapper">
			<div className="formLengths__table">
				<div>
					<label className="formLengths__cell formLengths__cell--header">
						Minimum length ({lengthsContext.measureUnit}):
						<input
							type="number"
							id="minimum"
							name="minimum"
							step={lengthsContext.increment}
							autoFocus
							min="0"
							max="9999"
							value={minimumRange}
							onChange={(e) => handleMinimumRange(e)}
						/>
					</label>
				</div>
				<div>
					<label className="formLengths__cell formLengths__cell--header">
						Maximum length ({lengthsContext.measureUnit}):
						<input
							type="number"
							id="maximum"
							name="maximum"
							step={lengthsContext.increment}
							min="0"
							max="9999"
							value={maximumRange}
							onChange={(e) => handleMaximumRange(e)}
						/>
					</label>
				</div>
				<div className="form__cell buttonsWrapper--center">
					<button
						className="buttonsWrapper__button"
						type="button"
						onClick={() => {
							lengthsContext.createRangeLengths(minimumRange, maximumRange);
							setMaximumRange("");
							setMinimumRange("");
						}}
					>
						Create range
					</button>
					<UiButtonStatusHandle
						buttonText={"Cancel"}
						handleMethod={lengthsContext.cancelEditLengths}
						newStatus={"empty"}
					/>
				</div>
			</div>
		</form>
	);
};

export default LengthsRangeForm;
