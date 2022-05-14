import React, { Component } from "react";

/**
 * Component of button to add a new element.
 * @param {method} changeDetail Method to handle the 'edit' parameter.
 * @param {character} buttonText Text to show in the button.
 */

class UiButtonHideDetails extends Component {
	render() {
		return (
			<button
				className="buttonsWrapper__button"
				onClick={() => {
					this.props.changeDetail(false);
				}}
			>
				{this.props.buttonText}
			</button>
		);
	}
}

export default UiButtonHideDetails;
