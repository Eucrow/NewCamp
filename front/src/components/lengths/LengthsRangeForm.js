import React from "react";

const LengthsRageForm = (createRangeLengths) => {
	var RangeForm = null;

	RangeForm = (
		<div className="formLengths__row">
			<div className="formLengths__cell">
				<input
					type="number"
					id="minLength"
					name="minLength"
					min="0"
					max="9999"
				/>
			</div>

			<div className="formLengths__cell">
				<input
					type="number"
					id="minLength"
					name="minLength"
					min="0"
					max="9999"
				/>
			</div>

			<div className="formLengths__cell">
				<button onClick={createRangeLengths}>Create range</button>
			</div>
		</div>
	);

	return RangeForm;
};

export default LengthsRageForm;
