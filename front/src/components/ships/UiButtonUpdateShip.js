import React, { Component } from "react";
/**
 * Component of button to add a new ship
 * @param {number} props.ship_id: id of the ship.
 * @param {method} props.handleEdit: method to manage the 'edit' state.
 */
class UiButtonUpdateShip extends Component {
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
