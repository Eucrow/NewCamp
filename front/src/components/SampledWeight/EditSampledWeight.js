import React from "react";

const EditSampledWeight = (props) => {
	return (
		<form
			onSubmit={(e) => {
				props.updateSampledWeight(e, props.sampled_weight_id);
				props.handleStatusSampledWeight("view");
			}}
		>
			<input
				type="number"
				className="input__noSpinner"
				id="sampled_weight"
				name="sampled_weight"
				min="1"
				max="99999999"
				value={props.sampled_weight}
				onChange={props.handleChangeSampledWeight(props.sampled_weight_id)}
			/>
			<input type="submit" value="Save sampled weight" />
		</form>
	);
};

export default EditSampledWeight;
