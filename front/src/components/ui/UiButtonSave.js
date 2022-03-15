import React from "react";
/**
 * Component of button to add a new element.
 * Used in any form to send it.
 */
const UiButtonSave = ({ buttonText }) => {
	const renderedButton = (
		<button type="submit" className="buttonsWrapper__button">
			{buttonText}
		</button>
	);

	return renderedButton;
};

export default UiButtonSave;
