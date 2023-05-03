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

	const [haulCommon, setFormValue] = useState({
		gear_id: "",
		station_id: "",
		sampler_id: "",
	});

	const [meteo, setMeteo] = useState({});

	const [trawlCharacteristics, setTrawlCharacteristics] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormValue((prev_state) => {
			return {
				...prev_state,
				[name]: value,
			};
		});
	};

	const createHaulObject = () => {
		const newHaul = {
			haul: haulCommon.haul,
			gear_id: haulCommon.gear,
			sampler_id: haulCommon.sampler_id,
			stratum_id: haulCommon.stratum_id,
			station_id: station_id,
			meteo: meteo,
			trawl_characteristics: trawlCharacteristics,
		};

		return newHaul;
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

	// const handleChangeNestedIds = (e) => {
	// 	const name = e.target.name;
	// 	const value = e.target.value;

	// 	this.setState({
	// 		haul: {
	// 			...this.state.haul,
	// 			[name]: {
	// 				id: value,
	// 			},
	// 		},
	// 	});
	// };

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
					haul={haulCommon}
					handleChange={handleChange}
					validateHaulSampler={validateHaulSampler}
					haulRef={haulRef}
					samplerRef={samplerRef}
				/>
				<HandleHaulType
					handleChangeMeteo={handleChangeMeteo}
					handleChangeTrawl={handleChangeTrawl}
					handleChangeHydrography={handleChangeHydrography}
					sampler_id={haulCommon.sampler_id}
				/>
				<UiButtonSave buttonText="Save Haul" />
			</form>
		);
	};

	return renderContent();
};

export default HaulHandleNew;
