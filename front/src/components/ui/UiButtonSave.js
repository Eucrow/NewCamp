import React from "react";
/**
 * Component of button to add a new element.
 * Used in any form to send it.
 * @param {text} buttonText text to show in the button.
 */
const UiButtonSave = ({ buttonText }) => {
	const renderedButton = (
		<button className="buttonsWrapper__button" type="submit">
			{buttonText}
		</button>
	);

	return renderedButton;
};

export default UiButtonSave;
