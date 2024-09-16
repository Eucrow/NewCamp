import React from "react";

import Lengths from "../lengths/Lengths.js";

/**
 * Sexes component.
 * @param {numeric} catchId Id of catch.
 * @param {numeric} unit Measurement unit: "1" or "2". "1" is centimeters and "2" is millimeters.
 * @param {numeric} increment Increment of measurement unit.
 * @param {boolean} viewSexes Show or hide this Sexes component.
 * @returns JSX of sexes component. The component show three columns, one by sex: male, female and undetermined.
 */
const Sexes = ({
	catchId,
	// unit, increment,
	catchMeasurementTypeId,
	spId,
	viewSexes,
}) => {
	const renderContent = () => {
		let content = [];

		// Using 'let' instead of 'var' to declare 'i' to ensure each function created in the loop
		// gets its own 'i', with the value 'i' had at the time the function was created.
		// This prevents potential bugs where all functions share the same 'i',
		// which would have its final value, not the value it had when the function was created.
		for (let i = 1; i <= 3; i++) {
			content.push(
				<div className="sexWrapper" key={"sex" + catchId + i}>
					<Lengths
						sex={i}
						//  unit={unit}
						//  increment={increment}
						catchMeasurementTypeId={catchMeasurementTypeId}
						catchId={catchId}
						spId={spId}
					/>
				</div>
			);
		}

		return content;
	};

	var content = viewSexes && <div className="sexesWrapper">{renderContent()}</div>;
	return content;
};

export default Sexes;
