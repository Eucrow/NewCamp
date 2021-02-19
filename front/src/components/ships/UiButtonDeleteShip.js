import React, { Component } from "react";
/**
 * Component of button to add a new ship
 * @param {number} props.ship_id: id of the ship.
 * @param {method} props.deleteShip: method to delete ship.
 */
class UiButtonDeleteShip extends Component {
	render() {
		return (
			<button
				onClick={(e) => {
					if (window.confirm("Delete the ship?")) {
						this.props.deleteShip(e, this.props.ship_id);
					}
				}}
			>
				Delete
			</button>
		);
	}
}

export default UiButtonDeleteShip;
