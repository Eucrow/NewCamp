import React from "react";

import UiButtonIconEdit from "./UiButtonIconEdit";
/**
 * Component of button to edit
 * @param {method} editMethod method used to edit the element.
 * @param {character} buttonText text of the button.
 */
const UiButtonEditHandle = ({ editMethod, buttonText, newStatus }) => {
	const renderedButton = (
		<button
			className="buttonsWrapper__button icon_button"
			type="button"
			title={buttonText}
			onClick={(e) => {
				editMethod(newStatus);
			}}
		>
			<UiButtonIconEdit />
		</button>
	);

	return renderedButton;
};

export default UiButtonEditHandle;
