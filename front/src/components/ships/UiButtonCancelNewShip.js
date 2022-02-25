import React, { Component } from "react";

import ShipsContext from "../../contexts/ShipsContext";
/**
 * Component of button to cancel the creation of a new ship
 */
class UiButtonCancelNewShip extends Component {
	static contextType = ShipsContext;

	render() {
		return (
			<button
				onClick={() => {
					this.context.handleAdd(false);
				}}
			>
				Cancel
			</button>
		);
	}
}

export default UiButtonCancelNewShip;
