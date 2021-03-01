import React, { Component } from "react";
/**
 * Component of button to add a new gear
 * @param {method} props.handleAdd: method to manage the 'add' state.
 */
class UiButtonAddGear extends Component {
	render() {
		return (
			<button
				onClick={() => {
					this.props.handleAdd(true);
				}}
			>
				Add Gear
			</button>
		);
	}
}

export default UiButtonAddGear;
