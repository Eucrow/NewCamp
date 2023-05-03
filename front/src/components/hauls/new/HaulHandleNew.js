import React, { useContext, useState } from "react";

import StationsContext from "../../../contexts/StationsContext";

import HaulFormNew from "./HaulFormNew";
import HandleHaulType from "./HandleHaulType.js";

import UiButtonSave from "../../ui/UiButtonSave";

/**
 * New haul component
 * @param {number} props.station_id
 * @param {method} props.changeAdd
 * @param {method} props.validateHaulSampler
 */

const HaulHandleNew = ({ station_id, changeAdd, validateHaulSampler, haulRef, samplerRef }) => {
	const stationsContext = useContext(StationsContext);

	const [newHaul, setNewHaul] = useState({
		station_id: station_id,
		haul: "",
		stratum_id: "",
		sampler_id: "",
		gear_id: "",
		valid: "off",
	});

	const [meteo, setMeteo] = useState({});

	const [trawlCharacteristics, setTrawlCharacteristics] = useState({});

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
			haul: newHaul.haul,
			gear_id: newHaul.gear,
			sampler_id: newHaul.sampler_id,
			stratum_id: newHaul.stratum_id,
			station_id: newHaul.station_id,
			valid: newHaul.valid,
			meteo: meteo,
			trawl_characteristics: trawlCharacteristics,
		};

		return haul;
	};

	const handleChangeMeteo = (e) => {
		const { name, value } = e.target;

		setMeteo((prev_state) => {
			return {
				...prev_state,
				[name]: value,
			};
		});
	};

	const handleChangeTrawl = (e) => {
		const { name, value } = e.target;

		setTrawlCharacteristics((prev_state) => {
			return {
				...prev_state,
				[name]: value,
			};
		});
	};

	const handleChangeHydrography = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		console.log("value in handleChangeHydrography: " + value);

		this.setState({
			haul: {
				...this.state.haul,
				hydrography_characteristics: {
					...this.state.haul.hydrography_characteristics,
					[name]: value,
				},
			},
		});
	};

	const renderContent = () => {
		return (
			<form
				className="wrapper"
				onSubmit={(e) => {
					const haul = createHaulObject();
					stationsContext.createHaul(e, haul);
					changeAdd(false);
				}}
			>
				<HaulFormNew
					newHaul={newHaul}
					handleChange={handleChange}
					validateHaulSampler={validateHaulSampler}
					haulRef={haulRef}
					samplerRef={samplerRef}
				/>
				<HandleHaulType
					handleChangeMeteo={handleChangeMeteo}
					handleChangeTrawl={handleChangeTrawl}
					handleChangeHydrography={handleChangeHydrography}
					sampler_id={newHaul.sampler_id}
				/>
				<UiButtonSave buttonText="Save Haul" />
			</form>
		);
	};

	return renderContent();
};

export default HaulHandleNew;
