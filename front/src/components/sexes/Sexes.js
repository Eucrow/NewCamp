import React, { useEffect, useState } from "react";

import Sex from "./Sex.js";
// import SexesButtonBar from "./SexesButtonBar";

/**
 * Sexes component.
 * @param {array} sexes Sexes of catch. If doesn't exist, it will be an empty array.
 * @param {numeric} catchId Id of catch.
 * @param {numeric} unit Measurement unit: "1" or "2". "1" is centimeters and "2" is milimeters.
 * @param {numeric} increment Increment of measurement unit.
 * @param {boolean} view_sexes Show or hide this Sexes component.
 * @returns JSX of sexes component.
 */
const Sexes = ({ catchId, unit, increment, viewSexes }) => {
	// var [addSex, setAddSex] = useState(false);

	var [sexes, setSexes] = useState([]);

	const apiSexes = "http://127.0.0.1:8000/api/1.0/sexes/" + catchId;
	const apiSex = "http://127.0.0.1:8000/api/1.0/sex/";

	const sexesBackup = sexes;

	useEffect(() => {
		if (viewSexes === true) {
			fetch(apiSexes)
				.then((res) => res.json())
				.then((res) => setSexes(res))
				.catch((error) => alert(error));
		}
	}, [apiSexes, viewSexes]);

	const createSex = (evt, sex, catchId) => {
		evt.preventDefault();

		var data = {
			catch_id: catchId,
			sex: sex,
		};

		fetch(apiSex, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				if (response.status > 400) {
					alert("Error: maybe the sex already exists.");
				}
				return response.json();
			})
			.then((newSex) => {
				const newSexes = sexes.concat(newSex);
				setSexes(newSexes);
			})
			.catch((error) => console.log("Error"));
	};

	const deleteSex = (sexId) => {
		var data = {
			id: sexId,
		};

		fetch(apiSex, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(data),
		})
			.then(() => {
				const newSexes = sexes.filter((s) => sexId !== s.id);
				setSexes(newSexes);
			})
			.catch((error) => alert(error));
	};

	const updateSex = (sexId, updatedSex) => {
		const newSexData = {
			id: sexId,
			sex: updatedSex,
		};

		fetch(apiSex, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newSexData),
		})
			.then((response) => response.json())
			.then((updatedSex) => {
				setSexes(sexes.map((sex) => (sex.id === sexId ? updatedSex : sex)));
			})
			.catch((error) => console.log("Error"));
	};

	const renderSex = (sex) => {
		if (sex === undefined) {
			return <Sex catchId={catchId} createSex={createSex} sexesBackup={sexesBackup} />;
		} else {
			return (
				<Sex
					key={sex.id}
					thisSexStatus={"view"}
					sexId={sex.id}
					sex={sex.sex}
					catchId={catchId}
					unit={unit}
					increment={increment}
					deleteSex={deleteSex}
					sexesBackup={sexesBackup}
					updateSex={updateSex}
				/>
			);
		}
	};

	const renderSexes = (sexes) => {
		if (sexes.length !== 0) {
			let content = [];

			// Using 'let' instead of 'var' to declare 'i' to ensure each function created in the loop
			// gets its own 'i', with the value 'i' had at the time the function was created.
			// This prevents potential bugs where all functions share the same 'i',
			// which would have its final value, not the value it had when the function was created.
			for (let i = 1; i <= 3; i++) {
				const sex = sexes.find((s) => s.sex === i);
				content.push(renderSex(sex));
			}

			return content;
		} else {
			return null;
		}
	};

	var content = viewSexes && <div className="sexesWrapper">{renderSexes(sexes)}</div>;
	return content;
};

export default Sexes;
