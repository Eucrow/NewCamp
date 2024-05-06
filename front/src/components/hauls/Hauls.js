import React, { useState, useRef, Fragment } from "react";
import Haul from "./Haul";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

const Hauls = ({ hauls, stationId, createHaul }) => {
	/**
	 * List of hauls
	 * @param {object} hauls
	 * @param {number} stationId
	 * @param {method} createHaul
	 */

	const [addHaul, setAddHaul] = useState(false);

	// Refs used to validate haul/sampler combination
	const haulRef = useRef(null);
	const samplerRef = useRef(null);

	/**
	 * Method to check if a combination of haul / sampler_id already exists in the hauls of this component.
	 * @param {string} haul haul to check if already exists.
	 * @param {string} samplerId samplerId to check if already exists.
	 * @returns True if exists, false if doesn't.
	 */
	const haulSamplerExists = (haul, samplerId) => {
		if (typeof hauls === "undefined") {
			return false;
		}

		const sampler_exists = Object.keys(hauls).map((h) => {
			if (hauls[h]["haul"] === parseInt(haul) && hauls[h]["sampler_id"] === parseInt(samplerId)) {
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
	const validateHaulSampler = (e, haul, samplerId) => {
		const sampler_exists = haulSamplerExists(haul, samplerId);

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
				<Fragment>
					{hauls.map((haul) => {
						return (
							<Haul
								key={haul.id}
								haul={haul}
								stationId={stationId}
								validateHaulSampler={validateHaulSampler}
							/>
						);
					})}
				</Fragment>
			);
		}
	};

	const renderContent = () => {
		if (addHaul === false) {
			return (
				<Fragment>
					{renderHauls()}
					<UiButtonStatusHandle
						buttonText={"Add Haul"}
						handleMethod={setAddHaul}
						newStatus={true}
					></UiButtonStatusHandle>
				</Fragment>
			);
		} else if (addHaul === true) {
			return (
				<Fragment>
					{renderHauls()}
					<Haul
						stationId={stationId}
						addHaul={addHaul}
						handleAddHaul={setAddHaul}
						createHaul={createHaul}
						validateHaulSampler={validateHaulSampler}
						haulRef={haulRef}
						samplerRef={samplerRef}
					/>
				</Fragment>
			);
		}
	};

	return renderContent();
};

export default Hauls;
