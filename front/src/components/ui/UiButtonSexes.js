import React from "react";

import UiIconSexes from "./UiIconSexes";

/**
 * Component of button to delete
 * @param {number} children
 * @param {method} handleMethod method used to handle the status.
 * @param {character} newStatus new status of the element.
 */

const UiButtonSexes = ({ children, handleMethod, newStatus }) => {
	const renderedButton = (
		<button
			className="buttonsWrapper__button icon_button"
			type="button"
			onClick={() => {
				handleMethod(newStatus);
			}}
		>
			<UiIconSexes />
		</button>
	);
	return renderedButton;
};

export default UiButtonSexes;
