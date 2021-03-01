import React, { Component } from "react";
/**
 * Component of button to add a new gear
 * @param {method} props.handleEdit: method to manage the 'edit' state.
 */
class UiButtonCancelEditGear extends Component {
	render() {
		return (
			<button
				onClick={() => {
					this.props.handleEdit(false);
				}}
			>
				Cancel
			</button>
		);
	}
}

export default UiButtonCancelEditGear;
