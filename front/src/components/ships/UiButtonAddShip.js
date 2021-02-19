import React, { Component } from "react";
/**
 * Component of button to add a new ship
 * @param {method} props.handleAdd: method to manage the 'add' state.
 */
class UiButtonAddShip extends Component {
	render() {
		return (
			<button
				onClick={() => {
					this.props.handleAdd(true);
				}}
			>
				Add Ship
			</button>
		);
	}
}

export default UiButtonAddShip;
