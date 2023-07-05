import React from "react";

import UiButtonIconDelete from "./UiButtonIconDelete";
/**
 * Component of button to delete
 * @param {number} id id of the element to delete.
 * @param {method} deleteMethod method used to delete the element.
 * @param {character} buttonText text of the button.
 * @param {character} confirmMessage text to show in a confirm message before the deletion.
 */
const UiButtonDelete = ({ id, deleteMethod, buttonText, confirmMessage }) => {
	const renderedButton = (
		<button
			className="buttonsWrapper__button icon_button"
			type="button"
			title={buttonText}
			onClick={(e) => {
				if (window.confirm(confirmMessage)) {
					deleteMethod(id);
				}
			}}
		>
			<UiButtonIconDelete />
		</button>
	);

	return renderedButton;
};

export default UiButtonDelete;
