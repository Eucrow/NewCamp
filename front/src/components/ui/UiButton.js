import React from "react";
/**
 * Component of button to delete
 * @param {number} id id of the element to delete.
 * @param {method} deleteMethod method used to delete the element.
 * @param {character} buttonText text of the button.
 * @param {character} confirmMessage text to show in a confirm message before the deletion.
 * @param {boolean} disabled if the button is disabled or not.
 */
const UiButton = ({ children, method, buttonText, disabled = false }) => {
	const hasChildren = children !== undefined;

	const buttonClass = hasChildren
		? "buttonsWrapper__button icon_button"
		: "buttonsWrapper__button";

	const renderedButton = (
		<button
			className={buttonClass}
			type="button"
			title={buttonText}
			disabled={disabled}
			onClick={(e) => {
				method(e);
			}}
		>
			{hasChildren ? children : buttonText}
		</button>
	);

	return renderedButton;
};

export default UiButton;
