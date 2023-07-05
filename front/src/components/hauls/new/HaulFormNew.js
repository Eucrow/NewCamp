import React, { Fragment, useContext } from "react";

import StationsContext from "../../../contexts/StationsContext";
/**
 * Component of the common part of the haul form.
 * @param {method} handleChange
 * @param {method} handleChangeNestedIds
 * @param {method} validateHaulSampler
 */
const HaulFormNew = ({ newHaul, handleChange, validateHaulSampler, haulRef, samplerRef }) => {
	const stationsContext = useContext(StationsContext);

	const renderContent = () => {
		return (
			<Fragment>
				<label className="form__cell">
					Haul:
					<input
						type="number"
						id="haul"
						name="haul"
						className="input__noSpinner"
						required
						min="1"
						max="99"
						maxLength="2"
						size={2}
						ref={haulRef}
						onChange={(e) => {
							handleChange(e);
							validateHaulSampler(e, e.target.value, newHaul.sampler_id);
						}}
					/>
				</label>

				<label className="form__cell">
					Stratum:
					<select
						id="stratum_id"
						name="stratum_id"
						className="select__largeWidth"
						required
						value={newHaul?.stratum_id || ""}
						onChange={(e) => {
							handleChange(e);
						}}
					>
						<option value=""></option>
						{stationsContext.strata.map((stratum) => {
							return (
								<option key={stratum.id} value={stratum.id}>
									{stratum.stratum}
								</option>
							);
						})}
					</select>
				</label>

				<label className="form__cell">
					Sampler:
					<select
						id="sampler_id"
						name="sampler_id"
						className="select__normalWidth"
						required
						value={newHaul?.sampler_id || ""}
						ref={samplerRef}
						onChange={(e) => {
							handleChange(e);
							validateHaulSampler(e, newHaul.haul, e.target.value);
						}}
					>
						<option value=""></option>
						{stationsContext.samplers.map((sampler) => {
							return (
								<option key={sampler.id} value={sampler.id}>
									{sampler.sampler}
								</option>
							);
						})}
					</select>
				</label>

				<label className="form__cell">
					Gear:
					<select
						id="gear_id"
						name="gear"
						required
						value={newHaul?.gear || ""}
						onChange={(e) => {
							handleChange(e);
						}}
					>
						<option value=""></option>
						{stationsContext.gears.map((gear) => {
							return (
								<option key={gear.id} value={gear.id}>
									{gear.name}
								</option>
							);
						})}
					</select>
				</label>

				<label className="form__cell">
					Valid:
					<input
						type="checkbox"
						id="valid"
						name="valid"
						onChange={(e) => {
							handleChange(e);
						}}
					/>
				</label>
			</Fragment>
		);
	};

	return renderContent();
};

export default HaulFormNew;
