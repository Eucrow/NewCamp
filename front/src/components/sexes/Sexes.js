import React, { useEffect, useState } from "react";

import Sex from "./Sex.js";

/**
 * Sexes component.
 * @param {numeric} catchId Id of catch.
 * @param {numeric} unit Measurement unit: "1" or "2". "1" is centimeters and "2" is milimeters.
 * @param {numeric} increment Increment of measurement unit.
 * @param {boolean} viewSexes Show or hide this Sexes component.
 * @returns JSX of sexes component. The componet show three columns, one by sex: male, female and undetermined.
 */
const Sexes = ({ catchId, unit, increment, viewSexes }) => {
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

	const renderSexes = (sexes) => {
		if (sexes.length !== 0) {
			let content = [];

			// Using 'let' instead of 'var' to declare 'i' to ensure each function created in the loop
			// gets its own 'i', with the value 'i' had at the time the function was created.
			// This prevents potential bugs where all functions share the same 'i',
			// which would have its final value, not the value it had when the function was created.
			for (let i = 1; i <= 3; i++) {
				var sex = sexes.find((s) => s.sex === i);
				if (sex === undefined) {
					content.push(<Sex sex={i} catchId={catchId} createSex={createSex} sexesBackup={sexesBackup} />);
				} else {
					content.push(
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
