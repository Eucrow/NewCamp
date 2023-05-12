import React, { useContext, useState, Fragment } from "react";

import StationsContext from "../../../contexts/StationsContext";

import HaulFormNew from "./HaulFormNew";

import MeteorologyFormNew from "./MeteorologyFormNew.js";
import HydrographyFormNew from "./HydrographyFormNew.js";
import TrawlFormNew from "./TrawlFormNew.js";

import UiButtonSave from "../../ui/UiButtonSave";
import UiButtonCancel from "../../ui/UiButtonCancel";

/**
 * New haul component
 * @param {number} props.station_id
 * @param {method} props.changeAdd
 * @param {method} props.validateHaulSampler
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

	const [meteo, setMeteo] = useState({});

	const [trawlCharacteristics, setTrawlCharacteristics] = useState({});

	const [hydrographyCharacteristics, setHydrographyCharacteristics] = useState({});

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

		setHydrographyCharacteristics((prev_state) => {
			return {
				...prev_state,
				[name]: value,
			};
		});
	};

	const renderDetail = () => {
		if (newHaul.sampler_id === "1") {
			return (
				<Fragment>
					<MeteorologyFormNew handleChangeMeteo={handleChangeMeteo} />
					<TrawlFormNew handleChangeTrawl={handleChangeTrawl} />
				</Fragment>
			);
		} else if (newHaul.sampler_id === "2") {
			return <HydrographyFormNew handleChangeHydrography={handleChangeHydrography} />;
		} else {
			//TODO: return error message instead of null
			return null;
		}
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
				{/* {renderDetail()} */}

				<UiButtonSave buttonText="Save Haul" />

				<UiButtonCancel handleMethod={handleAdd} text={"Cancel"} />
			</form>
		);
	};

	return renderContent();
};

export default HaulHandleNew;
