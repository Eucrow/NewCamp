import React from "react";

/**
 * Component of button to manage any process related with an update of a variable with a new status. For example,
 * "view", "edit", true  or false.
 * In case any children is passed, the button is rendered with the children. Otherwise, the button is rendered with
 * the buttonText. Usually, the button is a icon.
 * TODO: is there any way to detect if the children is a icon?
 * @param {method} handleMethod Method to handle the boolean parameter.
 * @param {character} buttonText Text to show in the button.
 * @param {boolean} newStatus The new string value of the variable.
 * TODO: I think it is not a good idea to use this component. Without the name of the variable,
 * it is not possible to know what component will be renderer.
 */

const UiButtonStatusHandle = ({ children, buttonText, handleMethod, newStatus }) => {
	const hasChildren = children !== undefined;

	const buttonClass = hasChildren ? "buttonsWrapper__button icon_button" : "buttonsWrapper__button";

	const renderedButton = (
		<button
			className={buttonClass}
			type="button"
			title={buttonText}
			onClick={() => {
				handleMethod(newStatus);
			}}
		>
			{hasChildren ? children : buttonText}
		</button>
	);
	return renderedButton;
};

export default UiButtonStatusHandle;
