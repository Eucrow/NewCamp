import React, { useState } from "react";

const NewSampledWeight = (props) => {
	const [new_sampled_weight, set_new_sampled_weight] = useState(0);

	return (
		<form
			onSubmit={(e) => {
				props.createSampledWeight(e, new_sampled_weight, props.catch_id);
				props.handleStatusSampledWeight("view");
			}}
		>
			<input
				type="number"
				id="sampled_weight"
				name="sampled_weight"
				value={new_sampled_weight}
				onChange={(e) => set_new_sampled_weight(e.target.value)}
			/>
			<input type="submit" value="Save sampled weight" />
		</form>
	);
};

export default NewSampledWeight;
