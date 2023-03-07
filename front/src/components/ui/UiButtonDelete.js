import React from "react";
/**
 * Component of button to add a new survey
 * @param {number} id id of the element to delete.
 * @param {method} deleteMethod method used to delete the element.
 * @param {character} buttonText text of the button.
 * @param {character} confirmMessage text to show in a confirm message before the deletion.
 */
const UiButtonDelete = ({ id, deleteMethod, buttonText, confirmMessage }) => {
	const renderedButton = (
		<button
			type="button"
			className="buttonsWrapper__button"
			onClick={(e) => {
				if (window.confirm(confirmMessage)) {
					deleteMethod(id);
				}
			}}
		>
			{buttonText}
		</button>
	);

	return renderedButton;
};

export default UiButtonDelete;
