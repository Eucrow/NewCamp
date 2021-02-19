import React, { Component } from "react";
/**
 * Component of button to add a new ship
 * @param {method} props.handleEdit: method to manage the 'edit' state.
 */
class UiButtonCancelEditShip extends Component {
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
