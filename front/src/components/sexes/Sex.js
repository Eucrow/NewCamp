import React, { useState, useEffect } from "react";
import SexButtonBar from "./SexButtonBar.js";
import ComponentLengths from "../lengths/Lengths.js";

/**
 * Sex component.
 * @param {string} sexStatus "view", "edit" or "add".
 * @param {number} sexId Id of sex.
 * @param {string} sex Sex.
 * @param {numeric} unit Measurement unit: "1" or "2". "1" is centimeters and "2" is milimeters.
 * @param {numeric} increment Increment of measurement unit.
 * @param {numeric} catchId Id of catch.
 * @param {method} handleAddSexStatus Method to handle sex status.
 * @returns JSX of sex component.
 */
const Sex = ({ thisSexStatus, sexId, sex, deleteSex, unit, increment, catchId, createSex, sexesBackup, updateSex }) => {
	const [thisSex, setThisSex] = useState(sex);
	const [lengthsStatus, setLengthsStatus] = useState("view");
	const [sexStatus, setSexStatus] = useState(thisSexStatus);
	const [validSex, setValidSex] = useState(true);

	const [addSex, setAddSex] = useState(false);

	const sexesAvailable = {
		1: "Male",
		2: "Female",
		3: "Undetermined",
	};

	useEffect(() => {
		setThisSex(sex);
		setSexStatus(thisSexStatus);
	}, [sex, thisSexStatus]);

	/**
	 * Validate if a sex already exists in the catch. In case it exists, thrown an error and
	 * set validSex variable to false and viceversa.
	 * @param {event}
	 */
	const validateSex = (e) => {
		const sexesBackupClean = sexesBackup.filter((s) => {
			return s.sex !== sex;
		});

		if (sexesBackupClean.some((p) => p.sex === Number(e.target.value))) {
			e.target.setCustomValidity("The sex already exists.");
			setValidSex(false);
			return e.target.reportValidity();
		} else {
			e.target.setCustomValidity("");
			setValidSex(true);
		}
	};

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
							lengthsStatus={lengthsStatus}
							setLengthsStatus={setLengthsStatus}
						/>
					</div>
				</div>
				<ComponentLengths
					sexId={sexId}
					lengthsStatus={lengthsStatus}
					unit={unit}
					increment={increment}
					setLengthsStatus={setLengthsStatus}
				/>
			</div>
		);
	} else if (sexStatus === "add") {
		content = (
			<div className="sexWrapper">
				<form
					className="form__row"
					onSubmit={(e) => {
						createSex(e, thisSex, catchId);
						setAddSex(false);
					}}
				>
					<label className="form__cell">
						Sex:
						<select
							autoFocus
							onChange={(e) => {
								setThisSex(e.target.value);
								validateSex(e);
							}}
						>
							<option></option>
							<option value="3">Undetermined</option>
							<option value="1">Male</option>
							<option value="2">Female</option>
						</select>
					</label>

					<SexButtonBar sexStatus={"add"} setSexStatus={setSexStatus} setAddSex={setAddSex} />
				</form>
			</div>
		);
	} else {
		content = (
			<div className="sexWrapper">
				<SexButtonBar setSexStatus={setSexStatus} />
			</div>
		);
	}
	return content;
};

export default Sex;
