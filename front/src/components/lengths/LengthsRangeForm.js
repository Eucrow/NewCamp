import React, { useContext } from "react";
import { useState } from "react";

import LengthsContext from "../../contexts/LengthsContext";

/**
 * Form to create a range of lengths.
 * @returns {JSX.Element} A JSX element that renders the lengths range form.
 */
const LengthsRangeForm = () => {
	const lengthsContext = useContext(LengthsContext);

	const [minimumRange, setMinimumRange] = useState("");

	const [maximunRange, setMaximumRange] = useState("");

	const handleMinimumRange = (e) => {
		setMinimumRange(e.target.value);
	};

	const handleMaximumRange = (e) => {
		setMaximumRange(e.target.value);
	};

	return (
		<form className="lengthsWrapper">
			<div className="formLengths__table">
				<div className="formLengths__row">
					<label className="formLengths__cell">
						Minimum length:
						<input
							type="number"
							id="minimum"
							name="minimum"
							autoFocus
							min="0"
							max="9999"
							value={minimumRange}
							onChange={(e) => handleMinimumRange(e)}
						/>
					</label>
				</div>
				<div className="formLengths__row">
					<label className="formLengths__cell">
						Maximum length:
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
				</div>
				<div className="formLengths__row">
					<div className="formLengths__cell">
						<button
							className="buttonsWrapper__button"
							type="button"
							onClick={() => {
								lengthsContext.createRangeLengths(minimumRange, maximunRange);
								setMaximumRange("");
								setMinimumRange("");
							}}
						>
							Add lengths range
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default LengthsRangeForm;
