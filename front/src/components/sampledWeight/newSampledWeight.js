import React from "react";

class NewSampledWeight extends React.Component {
	state = { new_sampled_weight: 0 };

	render() {
		return (
			<form
				onSubmit={(e) => {
					this.props.createSampledWeight(e, this.state.new_sampled_weight, this.props.catch_id);
					this.props.handleStatusSampledWeight("view");
				}}
			>
				<input
					type="number"
					id="sampled_weight"
					name="sampled_weight"
					value={this.state.new_sampled_weight}
					onChange={(e) => this.setState({ new_sampled_weight: e.target.value })}
				/>
				<input type="submit" value="Save sampled weight" />
			</form>
		);
	}
}

export default NewSampledWeight;
