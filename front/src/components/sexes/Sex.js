import React, { useState, useEffect } from "react";
import SexButtonBar from "./SexButtonBar.js";
import Lengths from "../lengths/Lengths.js";
import SexContext from "../../contexts/SexContext.js";

/**
 * Sex component.
 * @param {string} thisSexStatus "view", "edit" or "add".
 * @param {number} sexId Id of sex.
 * @param {string} sex Sex.
 * @param {numeric} unit Measurement unit: "1" or "2". "1" is centimeters and "2" is millimeters.
 * @param {numeric} increment Increment of measurement unit.
 * @param {numeric} catchId Id of catch.
 * @param {Function} createSex Function to create sex.
 * @param {Function} updateSex Function to update sex.
 * @param {Function} deleteSex Function to delete sex.
 * @returns JSX of sex component.
 */
const Sex = ({ thisSexStatus, sexId, sex, unit, increment, catchId, createSex, updateSex, deleteSex }) => {
	const [thisSex, setThisSex] = useState(sex);

	const [sexStatus, setSexStatus] = useState(thisSexStatus);

	const sexesAvailable = {
		1: "Male",
		2: "Female",
		3: "Undetermined",
	};

	useEffect(() => {
		setThisSex(sex);
		setSexStatus(thisSexStatus);
		console.log("Sex component uploaded ", sex);
	}, [sex, thisSexStatus]);

	const renderContent = () => {
		return (
			<SexContext.Provider
				value={{
					sex: sex,
					sexStatus: sexStatus,
					setSexStatus: setSexStatus,
					sexesAvailable: sexesAvailable,
				}}
			>
				<div className="sexWrapper">
					<div>
						<div className="form__cell">{sexesAvailable[thisSex]}</div>
						<div className="form__cell ">
							<SexButtonBar sexId={sexId} deleteSex={deleteSex} />
						</div>
					</div>
					<Lengths
						sexId={sexId}
						sex={sex}
						createSex={createSex}
						catchId={catchId}
						unit={unit}
						increment={increment}
					/>
				</div>
			</SexContext.Provider>
		);
	};

	return renderContent();
};

export default Sex;
