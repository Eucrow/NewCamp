import React, { Component, Fragment, useContext, useState } from "react";

import SelectedSurveyContext from "../../../contexts/SelectedSuveryContext";
import StationsContext from "../../../contexts/StationsContext";

import NewCommonDetail from "./NewCommonDetail";
import NewSpecific from "./NewSpecific.js";

import UiButtonSave from "../../ui/UiButtonSave";

/**
 * New haul component
 * @param {number} props.station_id
 * @param {method} props.changeAdd
 * @param {method} props.validateHaulSampler
 */

const NewHaul = ({ station_id, changeAdd, validateHaulSampler }) => {
	const selectedSurveyContext = useContext(SelectedSurveyContext);
	const stationsContext = useContext(StationsContext);

	const [haulCommon, setFormValue] = useState({
		gear_id: "",
		station_id: "",
		sampler_id: "",
	});

	const [meteo, setMeteo] = useState({});

	const [trawlCharacteristics, setTrawlCharacteristics] = useState({});
	const [hydrographyCharacteristics, setHydrographyCharacteristics] =
		useState({});

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
			gear: haulCommon.gear,
			sampler_id: haulCommon.sampler_id,
			stratum_id: haulCommon.stratum_id,
			station_id: station_id, // it comes from props
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

	const content = (
		<form
			className="wrapper"
			onSubmit={(e) => {
				const haul = createHaulObject();
				stationsContext.createHaul(e, haul);
				changeAdd(false);
			}}
		>
			<NewCommonDetail
				haul={haulCommon}
				handleChange={handleChange}
				validateHaulSampler={validateHaulSampler}
			/>
			<NewSpecific
				handleChangeMeteo={handleChangeMeteo}
				handleChangeTrawl={handleChangeTrawl}
				handleChangeHydrography={handleChangeHydrography}
				sampler_id={haulCommon.sampler_id}
			/>
			<UiButtonSave buttonText="Save Haul" />
		</form>
	);

	return content;
};

export default NewHaul;
