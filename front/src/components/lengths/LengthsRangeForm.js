import React from "react";
import { useState } from "react";

/**
 * Form to create a range of lenghts.
 * @param {method} createRAngeLengths: method to add lengths to state in parent component.
 * @returns Lenghts range form.
 */
const LengthsRangeForm = ({ createRangeLengths }) => {
	const [minimumRange, setMinimumRange] = useState("");

	const [maximunRange, setMaximumRange] = useState("");

	const handleMinimumRange = (e) => {
		setMinimumRange(e.target.value);
	};

	const handleMaximumRange = (e) => {
		setMaximumRange(e.target.value);
	};

	return (
		<form>
			<div className="formLengths__row">
				<label className="formLengths__cell">
					Minimum length:
					<input
						type="number"
						id="minimum"
						name="minimum"
						min="0"
						max="9999"
						value={minimumRange}
						onChange={(e) => handleMinimumRange(e)}
					/>
				</label>
				<label className="formLengths__cell">
					Maximum lenght:
					<input
						type="number"
						id="maximum"
						name="maximum"
						min="0"
						max="9999"
						value={maximunRange}
						onChange={(e) => handleMaximumRange(e)}
					/>
				</label>
				<div className="formLengths__cell">
					<button
						className="buttonsWrapper__button"
						type="button"
						onClick={() => {
							createRangeLengths(minimumRange, maximunRange);
							setMaximumRange("");
							setMinimumRange("");
						}}
					>
						Add lengths range
					</button>
				</div>
			</div>
		</form>
	);
};

export default LengthsRangeForm;
