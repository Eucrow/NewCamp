import React, { useContext, useState } from "react";

import StationsContext from "../../../contexts/StationsContext";

import HaulFormNew from "./HaulFormNew";

import UiButtonSave from "../../ui/UiButtonSave";
import UiButtonCancel from "../../ui/UiButtonCancel";

/**
 * New haul component
 * @param {number} props.station_id
 * @param {method} props.changeAdd
 * @param {method} props.validateHaulSampler
 */

/**
 * New haul component.
 * Originally this component was indented to show the detail of the new haul (meteorology, trawl and hydrography),
 * but it was decided to not to show directly due to simplificate the process of adding a new haul.
 * The code commented is the original code.
 * TODO: take a final decision about this.
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
			station_id: newHaul.station_id,
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

				<UiButtonCancel handleMethod={handleAdd} text={"Cancel"} />
			</form>
		);
	};

	return renderContent();
};

export default HaulHandleNew;
