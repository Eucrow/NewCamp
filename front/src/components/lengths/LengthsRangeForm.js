import React, { useContext, useEffect, useRef } from "react";
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

	const [validRange, setValidRange] = useState(true);

	const handleMinimumRange = (e) => {
		setMinimumRange(e.target.value);
	};

	const handleMaximumRange = (e) => {
		setMaximumRange(e.target.value);
	};

	let minimumRef = useRef(null);
	let maximumRef = useRef(null);

	useEffect(() => {
		if (minimumRange > maximumRange) {
			maximumRef.current.setCustomValidity("The maximum length must be greater than the minimum length.");
			setValidRange(false);
		} else {
			maximumRef.current.setCustomValidity("");
			setValidRange(true);
		}
	}, [minimumRange, maximumRange]);

	return (
		<form className="lengthsWrapper">
			<div className="formLengthsRange__table">
				<div className="formLengthsRange__row">
					<label className="formLengthsRange__cell formLengths__cell--header" for="minimum">
						Minimum length ({lengthsContext.measureUnit}):
					</label>
					<input
						className="formLengthsRange__cell"
						type="number"
						id="minimum"
						name="minimum"
						ref={minimumRef}
						step={lengthsContext.increment}
						autoFocus
						min="0"
						max="9999"
						value={minimumRange}
						onChange={(e) => handleMinimumRange(e)}
					/>
				</div>
				<div className="formLengthsRange__row">
					<label className="formLengthsRange__cell formLengths__cell--header" for="maximum">
						Maximum length ({lengthsContext.measureUnit}):
					</label>
					<input
						className="formLengthsRange__cell"
						type="number"
						id="maximum"
						name="maximum"
						ref={maximumRef}
						step={lengthsContext.increment}
						min="0"
						max="9999"
						value={maximumRange}
						onChange={(e) => handleMaximumRange(e)}
					/>
				</div>
			</div>
			<div className="formLengthsRange__row">
				<div className="form__row buttonsWrapper--center">
					<button
						className="formLengthsRange__cell buttonsWrapper__button"
						type="button"
						disabled={!validRange}
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
