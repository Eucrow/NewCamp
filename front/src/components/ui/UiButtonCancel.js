import React, { Component } from "react";

/**
 * Component of button to cancel any process managed with a boolean variable.
 * Te boolean variable is changed to false.
 * @param {method} handleMethod Method to handle the boolean parameter.
 */
class UiButtonCancel extends Component {
	render() {
		return (
			<button
				type="button"
				className="buttonsWrapper__button"
				onClick={() => {
					this.props.handleMethod(false);
				}}
			>
				Cancel
			</button>
		);
	}
}

export default UiButtonCancel;
