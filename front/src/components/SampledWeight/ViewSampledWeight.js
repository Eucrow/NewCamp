import React from "react";

const EditSampledWeight = ({
	sampled_weight,
	sampled_weight_id,
	handleStatusSampledWeight,
	handleChangeSampledWeight,
	deleteSampledWeight,
}) => {
	if (sampled_weight === null) {
		return (
			<form>
				<label className="form__cell">
					Sampled weight(g.):
					<input
						disabled
						type="number"
						className="input__noSpinner"
						id="sampled_weight"
						name="sampled_weight"
						min="1"
						max="99999999"
					/>
				</label>
				<button
					onClick={() => {
						handleStatusSampledWeight("add");
					}}
				>
					Add sampled weight
				</button>
			</form>
		);
	} else {
		return (
			<form>
				<input
					disabled
					type="number"
					className="input__noSpinner"
					id="sampled_weight"
					name="sampled_weight"
					min="1"
					max="99999999"
					value={sampled_weight}
					onChange={handleChangeSampledWeight(sampled_weight_id)}
				/>
				<button
					onClick={() => {
						handleStatusSampledWeight("edit");
					}}
				>
					Edit sampled weight
				</button>
				<button
					onClick={(e) => {
						deleteSampledWeight(e, sampled_weight_id);
					}}
				>
					Delete sampled weight
				</button>
			</form>
		);
	}
};

export default EditSampledWeight;
