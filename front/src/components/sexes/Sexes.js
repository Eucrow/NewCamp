import React from "react";

import Lengths from "../lengths/Lengths.js";

/**
 * Sexes Component
 *
 * This component renders the sexes and its corresponding lengths for a catch.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {number} props.catchId - The ID of the catch.
 * @param {number} props.spId - The ID of the species.
 * @param {boolean} props.viewSexes - A flag to determine whether to display the sexes.
 *
 * @returns {JSX.Element|null} The rendered component or null if `viewSexes` is false.
 */
const Sexes = ({ catchId, spId, viewSexes }) => {
	const renderContent = () => {
		let content = [];

		// Using 'let' instead of 'var' to declare 'i' to ensure each function created in the loop
		// gets its own 'i', with the value 'i' had at the time the function was created.
		// This prevents potential bugs where all functions share the same 'i',
		// which would have its final value, not the value it had when the function was created.
		// In this case, as Lengths component is created asynchronously, we need to use 'let' to avoid closure issues.
		for (let i = 1; i <= 3; i++) {
			content.push(
				<div className="sexWrapper" key={"sex" + catchId + i}>
					<Lengths sex={i} catchId={catchId} spId={spId} />
				</div>
			);
		}

		return content;
	};

	var content = viewSexes && <div className="sexesWrapper">{renderContent()}</div>;
	return content;
};

export default Sexes;
