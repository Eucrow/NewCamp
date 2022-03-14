import React, { Component } from "react";

/**
 * Component of button to add a new element.
 * @param {method} handleAdd Method to handle the 'add' parameter.
 * @param {character} text Text to show in the button.
 */

class UiButtonAdd extends Component {
	render() {
		return (
			<button
				className="buttonsWrapper__button"
				onClick={() => {
					this.props.handleAdd(true);
				}}
			>
				{this.props.text}
			</button>
		);
	}
}

export default UiButtonAdd;
