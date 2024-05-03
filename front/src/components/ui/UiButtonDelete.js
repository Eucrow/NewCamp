import React from "react";

import UiIconDelete from "./UiIconDelete";
/**
 * Component of button to delete
 * @param {number} id id of the element to delete.
 * @param {method} deleteMethod method used to delete the element.
 * @param {character} buttonText text of the button.
 * @param {character} confirmMessage text to show in a confirm message before the deletion.
 */
const UiButtonDelete = ({ id, children, deleteMethod, buttonText, confirmMessage }) => {
	const hasChildren = children !== undefined;

	const buttonClass = hasChildren ? "buttonsWrapper__button icon_button" : "buttonsWrapper__button";

	const renderedButton = (
		<button
			className={buttonClass}
			type="button"
			title={buttonText}
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
