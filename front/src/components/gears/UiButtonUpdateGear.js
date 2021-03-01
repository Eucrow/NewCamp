import React, { Component } from "react";
/**
 * Component of button to add a new gear
 * @param {number} props.gear_id: id of the gear.
 * @param {method} props.handleEdit: method to manage the 'edit' state.
 */
class UiButtonUpdateGear extends Component {
	render() {
		return (
			<button
				onClick={() => {
					this.props.handleEdit(this.props.gear_id);
				}}
			>
				Edit
			</button>
		);
	}
}

export default UiButtonUpdateGear;
