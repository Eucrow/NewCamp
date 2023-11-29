import React, { Fragment, useState, useEffect } from "react";
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
const Sex = ({
	thisSexStatus,
	sexId,
	sex,
	deleteSex,
	unit,
	increment,
	catchId,
	createSex,
	setAddSex,
	sexesBackup,
	updateSex,
}) => {
	const [thisSex, setThisSex] = useState(sex);
	const [lengthsStatus, setLengthsStatus] = useState("hide");
	const [sexStatus, setSexStatus] = useState(thisSexStatus || "view");
	const [validSex, setValidSex] = useState(true);

	useEffect(() => {
		setThisSex(sex);
	}, [sex]);

	const handleCancelEditSex = (e) => {
		setSexStatus("view");
		setThisSex(sex);
	};

	const getSexText = (sex) => {
		switch (sex) {
			case 1:
				return "Male";
			case 2:
				return "Female";
			default:
				return "Undetermined";
		}
	};

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
			<Fragment>
				<form className="form__row form--wide buttonsWrapper">
					<label className="form__cell sexes__sex">
						Sex:
						<select id={sexId} name={sexId} disabled>
							<option value={thisSex} key={thisSex}>
								{getSexText(thisSex)}
							</option>
						</select>
					</label>
					<div className="form__cell buttonsWrapper">
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
				</form>
				<ComponentLengths
					sexId={sexId}
					lengthsStatus={lengthsStatus}
					unit={unit}
					increment={increment}
					setLengthsStatus={setLengthsStatus}
				/>
			</Fragment>
		);
	} else if (sexStatus === "edit") {
		content = (
			<form
				className="form__row form--wide buttonsWrapper"
				onSubmit={(e) => {
					updateSex(sexId, thisSex);
					setSexStatus("view");
				}}
			>
				<label className="form__cell sexes__sex">
					Sex:
					<select
						onChange={(e) => {
							setThisSex(e.target.value);
							validateSex(e);
						}}
						id={sexId}
						name={sexId}
						value={thisSex}
					>
						<option value="3">Undetermined</option>
						<option value="1">Male</option>
						<option value="2">Female</option>
					</select>
				</label>
				<div className="form__cell buttonsWrapper">
					<SexButtonBar
						sexId={sexId}
						sexStatus={"edit"}
						setSexStatus={setSexStatus}
						deleteSex={deleteSex}
						lengthsStatus={lengthsStatus}
						setLengthsStatus={setLengthsStatus}
						saveSexButtonStatus={validSex}
						handleCancelEditSex={handleCancelEditSex}
					/>
				</div>
			</form>
		);
	} else if (sexStatus === "add") {
		content = (
			<form
				className="form__row form--wide buttonsWrapper"
				onSubmit={(e) => {
					createSex(e, thisSex, catchId);
					setAddSex(false);
				}}
			>
				<label className="form__cell sexes__sex">
					Sex:
					<select
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
		);
	}

	return content;
};

export default Sex;
