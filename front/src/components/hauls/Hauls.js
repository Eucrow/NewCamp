// import React, { Component, Fragment } from "react";

// import SelectedSurveyContext from "../../contexts/SelectedSuveryContext";
// import Haul from "./Haul";
// import HaulHandleNew from "./new/HaulHandleNew";
// import UiButtonAdd from "../ui/UiButtonAdd";
// import UiButtonCancel from "../ui/UiButtonCancel";

import React, { useState } from "react";
import Haul from "./Haul";
import HaulHandleNew from "./new/HaulHandleNew";
import UiButtonAdd from "../ui/UiButtonAdd";
import UiButtonCancel from "../ui/UiButtonCancel";

const Hauls = (props) => {
	/**
	 * List of hauls
	 * @param {object} hauls
	 * @param {object} station_id
	 * @param {object} sampler_id
	 */

	const [add, setAdd] = useState(false);

	/**
	 * Method to check if a combination of haul / sampler_id already exists in the hauls of this component.
	 * @param {string} haul haul to check if alreay exists.
	 * @param {string} sampler_id sampler_id to check if alreay exists.
	 * @returns True if exists, false if doesn't.
	 */
	const haulSamplerExists = (haul, sampler_id) => {
		const sampler_exists = Object.keys(props.hauls).map((h) => {
			if (props.hauls[h]["haul"] === parseInt(haul) && props.hauls[h]["sampler_id"] === parseInt(sampler_id)) {
				return true;
			} else {
				return false;
			}
		});
		return sampler_exists.some((s) => s === true);
	};

	/**
	 * Validate the combination of sampler_id / haul.
	 * @param {event} e event.
	 * @param {string} sampler_id sampler to check if is valid.
	 * @param {string} haul haul to check if is valid.
	 * @returns Throw reportValidity, showing an error when the validation is not passed.
	 */
	const validateHaulSampler = (e, haul, sampler_id) => {
		const sampler_exists = haulSamplerExists(haul, sampler_id);

		if (sampler_exists === true) {
			e.target.setCustomValidity("This combination of haul/sampler already exists.");
		} else {
			e.target.setCustomValidity("");
		}
		return e.target.reportValidity();
	};

	/**
	 * Method to render list of hauls
	 * @returns {character} List of hauls in html.
	 */
	const renderHauls = () => {
		if (props.hauls) {
			return (
				<div>
					{props.hauls.map((haul) => {
						return (
							<Haul
								key={haul.id}
								haul={haul}
								station_id={props.station_id}
								validateHaulSampler={validateHaulSampler}
							/>
						);
					})}
				</div>
			);
		} else {
			return "there are not hauls";
		}
	};

	const renderContent = () => {
		if (add === false) {
			return (
				<>
					{renderHauls()}
					<UiButtonAdd handleAdd={setAdd} text={"Add haul"} />
				</>
			);
		} else if (add === true) {
			return (
				<>
					{renderHauls()}
					<HaulHandleNew
						station_id={props.station_id}
						changeAdd={setAdd}
						createHaul={props.createHaul}
						validateHaulSampler={validateHaulSampler}
					/>
					<UiButtonCancel handleMethod={setAdd} text={"Cancel"} />
				</>
			);
		}
	};

	return renderContent();
};

export default Hauls;
