import React, { useState, useEffect } from "react";
import SexButtonBar from "./SexButtonBar.js";
import Lengths from "../lengths/Lengths.js";

/**
 * Sex component.
 * @param {string} thisSexStatus "view", "edit" or "add".
 * @param {number} sexId Id of sex.
 * @param {string} sex Sex.
 * @param {numeric} unit Measurement unit: "1" or "2". "1" is centimeters and "2" is milimeters.
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
	}, [sex, thisSexStatus]);

	var content = null;

	if (sexStatus === "view") {
		content = (
			<div className="sexWrapper">
				<div>
					<div className="form__cell">{sexesAvailable[thisSex]}</div>
					<div className="form__cell ">
						<SexButtonBar
							sexId={sexId}
							sexStatus={sexStatus}
							setSexStatus={setSexStatus}
							updateSex={updateSex}
							deleteSex={deleteSex}
						/>
					</div>
				</div>
				<Lengths
					sexId={sexId}
					sex={sex}
					sexStatus={"view"}
					createSex={createSex}
					catchId={catchId}
					unit={unit}
					increment={increment}
				/>
			</div>
		);
	} else if (sexStatus === "add") {
		content = (
			<div className="sexWrapper">
				<Lengths
					sexId={sexId}
					sex={sex}
					sexStatus={"add"}
					createSex={createSex}
					catchId={catchId}
					unit={unit}
					increment={increment}
				/>
			</div>
		);
	} else if (sexStatus === "empty") {
		content = (
			<div className="sexWrapper">
				<SexButtonBar setSexStatus={setSexStatus} sexesAvailable={sexesAvailable} sex={sex} />
			</div>
		);
	}
	return content;
};

export default Sex;
