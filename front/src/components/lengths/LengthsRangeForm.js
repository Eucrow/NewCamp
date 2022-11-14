import React from "react";
import { useState } from "react";

const LengthsRangeForm = () => {
	const [inputLengths, setInputLengths] = useState([]);

	const [minimumRange, setMinimumRange] = useState([{ minimum: "" }]);

	const [maximunRange, setMaximumRange] = useState([{ maximum: "" }]);

	const handleLength = (index, e) => {
		let data = [...inputLengths];
		data[index][e.target.name] = e.target.value;
		setInputLengths(data);
		console.log(e.target);
	};

	const handleMinimumRange = (e) => {
		setMinimumRange(e.target.value);
	};

	const handleMaximumRange = (e) => {
		setMaximumRange(e.target.value);
	};

	const addLengthsRange = () => {
		let range = [Number(minimumRange)];

		while (maximunRange > range[range.length - 1]) {
			range = [...range, range[range.length - 1] + 1];
		}

		let data = [...inputLengths];

		range.forEach((x) => {
			data.push({ name: x, number_individuals: 0 });
		});

		setInputLengths(data);
		setMinimumRange("");
		setMaximumRange("");
	};

	// var RangeForm = null;

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
						// disabled
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
						// disabled
					/>
				</label>
				<div className="formLengths__cell">
					<input
						type="button"
						onClick={addLengthsRange}
						value="Add"
					/>
				</div>
			</div>
			{inputLengths.map((l, index) => {
				return (
					<div className="formLengths__row" key={index}>
						<div className="formLengths__cell">
							<input
								type="number"
								id="name"
								name="name"
								min="0"
								max="9999"
								value={l.name}
								onChange={(e) => handleLength(index, e)}
								// disabled
							/>
						</div>
						<div className="formLengths__cell">
							<input
								type="number"
								id="number_individuals"
								name="number_individuals"
								min="0"
								max="9999"
								value={l.number_individuals}
								onChange={(e) => handleLength(index, e)}
								// disabled
							/>
						</div>
					</div>
				);
			})}
		</form>

		// <div className="formLengths__row">
		// 	<div className="formLengths__cell">
		// 		<input
		// 			type="number"
		// 			id="minLength"
		// 			name="minLength"
		// 			min="0"
		// 			max="9999"
		// 		/>
		// 	</div>

		// 	<div className="formLengths__cell">
		// 		<input
		// 			type="number"
		// 			id="minLength"
		// 			name="minLength"
		// 			min="0"
		// 			max="9999"
		// 		/>
		// 	</div>

		// 	<div className="formLengths__cell">
		// 		<button onClick={createRangeLengths}>Create range</button>
		// 	</div>
		// </div>
	);

	// return RangeForm;
};

export default LengthsRangeForm;
