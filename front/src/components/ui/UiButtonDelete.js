import React from "react";
/**
 * Component of button to delete
 * @param {number} id id of the element to delete.
 * @param {method} deleteMethod method used to delete the element.
 * @param {character} buttonText text of the button.
 * @param {character} confirmMessage text to show in a confirm message before the deletion.
 * @param {boolean} disabled if the button is disabled or not.
 */
const UiButtonDelete = ({
	id,
	children,
	deleteMethod,
	buttonText,
	confirmMessage,
	disabled = false,
}) => {
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
				if (window.confirm(confirmMessage)) {
					deleteMethod(id);
				}
			}}
		>
			{hasChildren ? children : buttonText}
		</button>
	);

	return renderedButton;
};

export default UiButtonDelete;
