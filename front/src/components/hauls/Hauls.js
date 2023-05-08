import React, { useState, useRef } from "react";
import Haul from "./Haul";
import UiButtonAdd from "../ui/UiButtonAdd";

const Hauls = ({ hauls, station_id, createHaul }) => {
	/**
	 * List of hauls
	 * @param {object} hauls
	 * @param {number} station_id
	 * @param {method} createHaul
	 */

	const [add, setAdd] = useState(false);

	// Refs used to validate haul/sampler combination
	const haulRef = useRef(null);
	const samplerRef = useRef(null);

	/**
	 * Method to check if a combination of haul / sampler_id already exists in the hauls of this component.
	 * @param {string} haul haul to check if alreay exists.
	 * @param {string} sampler_id sampler_id to check if alreay exists.
	 * @returns True if exists, false if doesn't.
	 */
	const haulSamplerExists = (haul, sampler_id) => {
		const sampler_exists = Object.keys(hauls).map((h) => {
			if (hauls[h]["haul"] === parseInt(haul) && hauls[h]["sampler_id"] === parseInt(sampler_id)) {
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
			haulRef.current.setCustomValidity("This combination of haul/sampler already exists.");
			samplerRef.current.setCustomValidity("This combination of haul/sampler already exists.");
		} else {
			haulRef.current.setCustomValidity("");
			samplerRef.current.setCustomValidity("");
		}
		return haulRef.current.reportValidity();
	};

	/**
	 * Method to render list of hauls
	 * @returns {character} List of hauls in html.
	 */
	const renderHauls = () => {
		if (hauls) {
			return (
				<div>
					{hauls.map((haul) => {
						return (
							<Haul
								key={haul.id}
								haul={haul}
								station_id={station_id}
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
					<Haul
						station_id={station_id}
						add={add}
						handleAdd={setAdd}
						createHaul={createHaul}
						validateHaulSampler={validateHaulSampler}
						haulRef={haulRef}
						samplerRef={samplerRef}
					/>
				</>
			);
		}
	};

	return renderContent();
};

export default Hauls;
