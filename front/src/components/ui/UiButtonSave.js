import React from "react";
/**
 * Component of button to add a new survey.
 * Used in any form to send it.
 * @param {object} props.survey - Survey object
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
