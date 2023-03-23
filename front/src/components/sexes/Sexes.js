import React, { Fragment, useEffect, useState } from "react";

import Sex from "./Sex.js";
import SexesButtonBar from "./SexesButtonBar";
/**
 * Sexes component.
 * @param {array} sexes Sexes of catch. If doesn't exist, it will be an empty array.
 * @param {numeric} catch_id Id of catch.
 * @param {numeric} unit Measurement unit: "1" or "2". "1" is centimeters and "2" is milimeters.
 * @param {numeric} increment Increment of measurement unit.
 * @returns JSX of sexes component.
 */
const Sexes = ({ catch_id, has_sexes, unit, increment, handleViewSexes, view_sexes }) => {
	var [addSexStatus, setAddSexStatus] = useState(false);

	var [sexes, setSexes] = useState([]);

	const apiSexes = "http://127.0.0.1:8000/api/1.0/sexes/" + catch_id;
	const apiSex = "http://127.0.0.1:8000/api/1.0/sex/";

	const sexesBackup = sexes;

	useEffect(() => {
		if (view_sexes === true) {
			fetch(apiSexes)
				.then((res) => res.json())
				.then((res) => setSexes(res))
				.catch((error) => alert(error));
		}
	}, [apiSexes, view_sexes]);

	const addSex = (evt, sex, catch_id) => {
		/**
		 * Handle new sex form.
		 * Fetch the new sex and update the catches state.
		 */

		evt.preventDefault();

		var data = {
			catch_id: catch_id,
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

	const deleteSex = (sex_id) => {
		const api = apiSex + sex_id;

		fetch(api, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(() => {
				const newSexes = sexes.filter((s) => {
					if (sex_id !== s.id) return s;
				});
				setSexes(newSexes);
			})
			.catch((error) => alert(error));
	};

	var content = (
		<Fragment>
			{view_sexes === true ? (
				<Fragment>
					{sexes.map((s) => {
						return (
							<Sex
								key={s.id}
								sex_id={s.id}
								sex={s.sex}
								catch_id={catch_id}
								unit={unit}
								increment={increment}
								deleteSex={deleteSex}
								sexesBackup={sexesBackup}
							/>
						);
					})}

					{addSexStatus === true ? (
						<Sex
							catch_id={catch_id}
							sex_status={"add"}
							addSex={addSex}
							setAddSexStatus={setAddSexStatus}
							sexesBackup={sexesBackup}
						/>
					) : (
						<SexesButtonBar add_sex_status={"view"} setAddSexStatus={setAddSexStatus} />
					)}
				</Fragment>
			) : null}
		</Fragment>
	);

	return content;
};

export default Sexes;
