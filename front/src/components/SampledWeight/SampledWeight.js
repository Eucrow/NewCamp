import React, { useState } from "react";
import NewSampledWeight from "./NewSampledWeight";
import EditSampledWeight from "./EditSampledWeight";
import ViewSampledWeight from "./ViewSampledWeight";

const SampledWeight = (props) => {
	const [statusSampledWeight, setStatusSampledWeight] = useState("view");

	const renderContent = () => {
		if (statusSampledWeight === "add") {
			return (
				<NewSampledWeight
					catch_id={props.catch_id}
					createSampledWeight={props.createSampledWeight}
					setStatusSampledWeight={setStatusSampledWeight}
				/>
			);
		}

		if (statusSampledWeight === "edit") {
			return (
				<EditSampledWeight
					sampled_weight_id={props.sampled_weight_id}
					sampled_weight={props.sampled_weight}
					catch_id={props.catch_id}
					handleChangeSampledWeight={props.handleChangeSampledWeight}
					updateSampledWeight={props.updateSampledWeight}
					setStatusSampledWeight={setStatusSampledWeight}
				/>
			);
		}

		if (statusSampledWeight === "view") {
			return (
				<ViewSampledWeight
					sampled_weight={props.sampled_weight}
					sampled_weight_id={props.sampled_weight_id}
					setStatusSampledWeight={setStatusSampledWeight}
					handleChangeSampledWeight={props.handleChangeSampledWeight}
					deleteSampledWeight={props.deleteSampledWeight}
				/>
			);
		}
	};

	return renderContent();
};

export default SampledWeight;
