import React, { Component } from "react";

/**
 * Component of button to manage any process related with an update of a boolean variable.
 * @param {method} handleMethod Method to handle the boolean parameter.
 * @param {character} buttonText Text to show in the button.
 * @param {boolean} newBoolean The new boolean value of the variable
 */

// class UiButtonBooleanHandle extends Component {
// 	render() {
// 		return (
// 			<button
// 				className="buttonsWrapper__button"
// 				onClick={() => {
// 					this.props.handleMethod(this.props.newBoolean);
// 				}}
// 			>
// 				{this.props.buttonText}
// 			</button>
// 		);
// 	}
// }

const UiButtonBooleanHandle = ({ buttonText, handleMethod, newBoolean }) => {
	const renderedButton = (
		<button
			className="buttonsWrapper__button"
			onClick={() => {
				handleMethod(newBoolean);
			}}
		>
			{buttonText}
		</button>
	);
	return renderedButton;
};

export default UiButtonBooleanHandle;
