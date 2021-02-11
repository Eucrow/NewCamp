import React, { useState } from "react";
import NewSampledWeight from "./NewSampledWeight";
import EditSampledWeight from "./EditSampledWeight";

const SampledWeight = (props) => {
	const [status_sampled_weight, set_status_sampled_weight] = useState("view");

	const handleStatusSampledWeight = (status) => {
		set_status_sampled_weight(status);
	};

	const renderContent = () => {
		if (status_sampled_weight === "add") {
			return (
				<NewSampledWeight
					catch_id={props.catch_id}
					createSampledWeight={props.createSampledWeight}
					handleStatusSampledWeight={handleStatusSampledWeight}
				/>
			);
		}

		if (status_sampled_weight === "edit") {
			return (
				<EditSampledWeight
					sampled_weight_id={props.sampled_weight_id}
					sampled_weight={props.sampled_weight}
					catch_id={props.catch_id}
					handleChangeSampledWeight={props.handleChangeSampledWeight}
					updateSampledWeight={props.updateSampledWeight}
					handleStatusSampledWeight={handleStatusSampledWeight}
				/>
			);
		}

		if (status_sampled_weight === "view") {
			if (props.sampled_weight === null) {
				return (
					<button
						onClick={() => {
							handleStatusSampledWeight("add");
						}}
					>
						Add sampled weight
					</button>
				);
			} else {
				return (
					<div>
						{props.sampled_weight}
						<button
							onClick={() => {
								handleStatusSampledWeight("edit");
							}}
						>
							Edit sampled weight
						</button>
						<button
							onClick={(e) => {
								props.deleteSampledWeight(e, props.sampled_weight_id);
							}}
						>
							Delete sampled weight
						</button>
					</div>
				);
			}
		}
	};

	return renderContent();
};

export default SampledWeight;
