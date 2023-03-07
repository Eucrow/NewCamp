import React, { Fragment, useState } from "react";

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
const Sexes = ({ sexes, catch_id, unit, increment, deleteSex, addSex }) => {
	var [addSetStatus, setAddSetStatus] = useState(false);

	const sexesBackup = sexes;

	var content = (
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

			{addSetStatus === true ? (
				<Sex
					catch_id={catch_id}
					sex_status={"add"}
					addSex={addSex}
					handleAddSexStatus={setAddSetStatus}
					sexesBackup={sexesBackup}
				/>
			) : (
				<SexesButtonBar add_sex_status={"view"} handleAddSexStatus={setAddSetStatus} />
			)}
		</Fragment>
	);

	return content;
};

export default Sexes;
