import React, { Component } from "react";

class UiButtonCancelEditShip extends Component {
	/**
	 * Component of button to add a new ship
	 * @param {method} props.handleEdit: method to manage the 'edit' state.
	 */

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

export default UiButtonCancelEditShip;
