import React, { Fragment, useEffect, useState } from "react";

import Sex from "./Sex.js";
import SexesButtonBar from "./SexesButtonBar";
/**
 * Sexes component.
 * @param {array} sexes Sexes of catch. If doesn't exist, it will be an empty array.
 * @param {numeric} catch_id Id of catch.
 * @param {numeric} unit Measurement unit: "1" or "2". "1" is centimeters and "2" is milimeters.
 * @param {numeric} increment Increment of measurement unit.
 * @param {method} deleteSex Method to delete sex.
 * @param {method} addSex Method to add sex.
 * @returns JSX of sexes component.
 */
const Sexes = ({ catch_id, unit, increment, deleteSex, addSex, handleViewSexes, view_sexes }) => {
	var [addSexStatus, setAddSexStatus] = useState(false);

	var [sexes, setSexes] = useState([]);

	const apiSexes = "http://127.0.0.1:8000/api/1.0/sexes/" + catch_id;

	useEffect(() => {
		if (view_sexes === true) {
			fetch(apiSexes)
				.then((res) => res.json())
				.then((res) => setSexes(res))
				.catch((error) => alert(error));
		}
	}, [apiSexes, view_sexes]);

	const sexesBackup = sexes;

	var content = (
		<Fragment>
			{view_sexes === true
				? sexes.map((s) => {
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
				  })
				: null}

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
	);

	return content;
};

export default Sexes;
