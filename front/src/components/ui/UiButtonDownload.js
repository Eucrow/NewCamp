import React from "react";

import UiIconDownload from "./UiIconDownload";

/**
 * Component of button to delete
 * @param {number} children
 * @param {method} handleMethod method used to handle the status.
 * @param {character} newStatus new status of the element.
 */

const UiButtonDownload = ({ children, handleMethod, newStatus, disabled = false }) => {
	// const title =
	// 	disabled === false
	// 		? "Add lengths"
	// 		: "To allow add lengths, you must remove the number of 'not measured individuals'.";

	const renderedButton = (
		<button
			className="buttonsWrapper__button icon_button"
			value="Download"
			disabled={disabled}
			onClick={() => handleMethod()}
		>
			<UiIconDownload />
		</button>
		// <button
		// 	className="buttonsWrapper__button icon_button"
		// 	title="Download file"
		// 	type="button"
		// 	disabled={disabled}
		// 	onClick={() => {
		// 		handleMethod(newStatus);
		// 	}}
		// >
		// <UiIconSexes />
		// </button>
	);
	return renderedButton;
};

export default UiButtonDownload;
