import React from "react";

/**
 * Component of button to manage any process related with an update of a variable with a new status. For example,
 * "view", "edit", true  or false.
 * @param {method} handleMethod Method to handle the boolean parameter.
 * @param {character} buttonText Text to show in the button.
 * @param {boolean} newStatus The new string value of the variable.
 * TODO: I think it is not a good idea to use this component. Without the name of the variable,
 * it is not possible to know what component will be renderer.
 */

const UiButtonStatusHandle = ({ children, buttonText, handleMethod, newStatus }) => {
	const renderedButton = (
		<button
			className="buttonsWrapper__button"
			type="button"
			onClick={() => {
				handleMethod(newStatus);
			}}
		>
			{buttonText}
			{children}
		</button>
	);
	return renderedButton;
};

export default UiButtonStatusHandle;
