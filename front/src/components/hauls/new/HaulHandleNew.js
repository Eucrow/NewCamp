import React, { useContext, useState } from "react";

import StationsContext from "../../../contexts/StationsContext";

import HaulFormNew from "./HaulFormNew";

import UiButtonSave from "../../ui/UiButtonSave";
import UiButtonStatusHandle from "../../ui/UiButtonStatusHandle";

/**
 * New haul component
 * @param {number} props.station_id
 * @param {method} props.changeAdd
 * @param {method} props.validateHaulSampler
 */

/**
 * New haul component.
 * @param {number} station_id
 * @param {method} handleAdd
 * @param {method} validateHaulSampler
 * @param {method} haulRef
 * @param {method} samplerRef
 * @param {method} setDetail
 * @returns {JSX.Element}}
 */
const HaulHandleNew = ({ station_id, handleAdd, validateHaulSampler, haulRef, samplerRef, setDetail }) => {
	const stationsContext = useContext(StationsContext);

	const [newHaul, setNewHaul] = useState({
		station_id: station_id,
		haul: "",
		stratum_id: "",
		sampler_id: "",
		gear_id: "",
		valid: "off",
	});

	const [meteo] = useState({});
	const [trawlCharacteristics] = useState({});
	const [hydrographyCharacteristics] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewHaul((prev_state) => {
			return {
				...prev_state,
				[name]: value,
			};
		});
	};

	const createHaulObject = () => {
		const haul = {
			station_id: station_id,
			haul: newHaul.haul,
			stratum_id: newHaul.stratum_id,
			sampler_id: newHaul.sampler_id,
			gear_id: newHaul.gear,
			valid: newHaul.valid,
			meteo: meteo,
			trawl_characteristics: trawlCharacteristics,
			hydrography_characteristics: hydrographyCharacteristics,
		};

		return haul;
	};

	const renderContent = () => {
		return (
			<form
				className="wrapper"
				onSubmit={(e) => {
					const haul = createHaulObject();
					stationsContext.createHaul(e, haul);
					handleAdd(false);
					setDetail(true);
				}}
			>
				<HaulFormNew
					newHaul={newHaul}
					handleChange={handleChange}
					validateHaulSampler={validateHaulSampler}
					haulRef={haulRef}
					samplerRef={samplerRef}
				/>

				<UiButtonSave buttonText="Save Haul" />

				<UiButtonStatusHandle handleMethod={handleAdd} buttonText={"Cancel"} newStatus={false} />
			</form>
		);
	};

	return renderContent();
};

export default HaulHandleNew;
