import React, { Component } from "react";

class UiButtonUpdateShip extends Component {
	/**
	 * Component of button to add a new ship
	 * @param {number} props.ship_id: id of the ship.
	 * @param {method} props.handleEdit: method to manage the 'edit' state.
	 */

	render() {
		return (
			<button
				onClick={() => {
					this.props.handleEdit(this.props.ship_id);
				}}
			>
				Edit
			</button>
		);
	}
}

export default UiButtonUpdateShip;
