import React, { Component } from "react";

import ShipsContext from "../../contexts/ShipsContext";
/**
 * Component of button to add a new ship
 */
class UiButtonAddShip extends Component {
	static contextType = ShipsContext;

	render() {
		return (
			<button
				className="buttonsWrapper__button"
				onClick={() => {
					this.context.handleAdd(true);
				}}
			>
				Add Ship
			</button>
		);
	}
}

export default UiButtonAddShip;
