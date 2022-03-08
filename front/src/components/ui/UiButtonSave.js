import React, { Component } from "react";
/**
 * Component of button to add a new survey.
 * Used in any form to send it.
 * @param {object} props.survey - Survey object
 */
// class UiButtonSave extends Component {
const UiButtonSave = ({ buttonText }) => {
	const renderedButton = (
		<button type="submit" className="buttonsWrapper__button">
			{buttonText}
		</button>
	);

	// render() {
	// 	let content = null;
	// 	content = (
	// 		<button className="buttonsWrapper__button">Save Survey</button>
	// 	);

	// 	return content;
	// }

	return renderedButton;
};

export default UiButtonSave;
