import React from "react";
import NewSampledWeight from "./newSampledWeight";
import EditSampledWeight from "./editSampledWeight";

class SampledWeight extends React.Component {
	state = { status_sampled_weight: "view", new_sampled_weight: "" };

	handleStatusSampledWeight = (status) => {
		/**
		 *
		 */
		this.setState({
			status_sampled_weight: status,
		});
	};

	renderContent = () => {
		if (this.state.status_sampled_weight === "add") {
			return (
				<NewSampledWeight
					catch_id={this.props.catch_id}
					createSampledWeight={this.props.createSampledWeight}
					handleStatusSampledWeight={this.handleStatusSampledWeight}
				/>
			);
		}

		if (this.state.status_sampled_weight === "edit") {
			return (
				<EditSampledWeight
					sampled_weight_id={this.props.sampled_weight_id}
					sampled_weight={this.props.sampled_weight}
					catch_id={this.props.catch_id}
					handleChangeSampledWeight={this.props.handleChangeSampledWeight}
					updateSampledWeight={this.props.updateSampledWeight}
					handleStatusSampledWeight={this.handleStatusSampledWeight}
				/>
			);
		}

		if (this.state.status_sampled_weight === "view") {
			if (this.props.sampled_weight === null) {
				return (
					<button
						onClick={() => {
							this.handleStatusSampledWeight("add");
						}}
					>
						Add sampled weight
					</button>
				);
			} else {
				return (
					<div>
						{this.props.sampled_weight}
						<button
							onClick={() => {
								this.handleStatusSampledWeight("edit");
							}}
						>
							Edit sampled weight
						</button>
					</div>
				);
			}
		}
	};

	render() {
		return this.renderContent();
	}
}

export default SampledWeight;
