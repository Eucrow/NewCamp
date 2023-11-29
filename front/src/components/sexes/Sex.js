import React, { Fragment, useState, useEffect } from "react";
import SexButtonBar from "./SexButtonBar.js";
import ComponentLengths from "../lengths/Lengths.js";

/**
 * Sex component.
 * @param {string} sex_status "view", "edit" or "add".
 * @param {number} sexId Id of sex.
 * @param {string} sex Sex.
 * @param {numeric} unit Measurement unit: "1" or "2". "1" is centimeters and "2" is milimeters.
 * @param {numeric} increment Increment of measurement unit.
 * @param {numeric} catchId Id of catch.
 * @param {method} addSex Method to add sex.
 * @param {method} handleAddSexStatus Method to handle sex status.
 * @returns JSX of sex component.
 */
const Sex = ({
	sex_status,
	sexId,
	sex,
	deleteSex,
	unit,
	increment,
	catchId,
	addSex,
	setAddSexStatus,
	sexesBackup,
	updateSex,
}) => {
	const [newSex, setNewSex] = useState("");
	const [lengthsStatus, setLengthsStatus] = useState("hide");
	const [sexStatus, setSexStatus] = useState(sex_status ? sex_status : "view");
	const [validSex, setValidSex] = useState(true);

	useEffect(() => {
		setNewSex(sex);
	}, [sex]);

	const handleCancelEditSex = (e) => {
		setSexStatus("view");
		setNewSex(sex);
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
							<option value={newSex} key={newSex}>
								{getSexText(newSex)}
							</option>
						</select>
					</label>
					<div className="form__cell buttonsWrapper">
						<SexButtonBar
							sexId={sexId}
							sex_status={sexStatus}
							setSexStatus={setSexStatus}
							updateSex={updateSex}
							deleteSex={deleteSex}
							lengths_status={lengthsStatus}
							setLengthsStatus={setLengthsStatus}
						/>
					</div>
				</form>
				<ComponentLengths
					sexId={sexId}
					lengths_status={lengthsStatus}
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
					updateSex(sexId, newSex);
					setSexStatus("view");
				}}
			>
				<label className="form__cell sexes__sex">
					Sex:
					<select
						onChange={(e) => {
							setNewSex(e.target.value);
							validateSex(e);
						}}
						id={sexId}
						name={sexId}
						value={newSex}
					>
						<option value="3">Undetermined</option>
						<option value="1">Male</option>
						<option value="2">Female</option>
					</select>
				</label>
				<div className="form__cell buttonsWrapper">
					<SexButtonBar
						sexId={sexId}
						sex_status={"edit"}
						setSexStatus={setSexStatus}
						updateSex={updateSex}
						deleteSex={deleteSex}
						lengths_status={lengthsStatus}
						setLengthsStatus={setLengthsStatus}
						saveSexButtonStatus={validSex}
						sex={sex}
						setNewSex={setNewSex}
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
					addSex(e, newSex, catchId);
					setAddSexStatus(false);
				}}
			>
				<label className="form__cell sexes__sex">
					Sex:
					<select
						onChange={(e) => {
							setNewSex(e.target.value);
							validateSex(e);
						}}
					>
						<option></option>
						<option value="3">Undetermined</option>
						<option value="1">Male</option>
						<option value="2">Female</option>
					</select>
				</label>

				<SexButtonBar
					sex_status={"add"}
					newSex={newSex}
					catchId={catchId}
					addSex={addSex}
					setAddSexStatus={setAddSexStatus}
					updateSex={updateSex}
					setSexStatus={setSexStatus}
				/>
			</form>
		);
	}

	return content;
};

export default Sex;
