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
					Sampler:
					<select
						id="sampler_id"
						name="sampler_id"
						className="select__normalWidth"
						autoFocus
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

				{newHaul.sampler_id === "1" ? (
					<label className="form__cell">
						Gear:
						<select
							id="trawl_id"
							name="trawl"
							required
							value={newHaul?.trawl || ""}
							onChange={(e) => {
								handleChange(e);
							}}
						>
							<option value=""></option>
							{stationsContext.trawls.map((trawl) => {
								return (
									<option key={trawl.id} value={trawl.id}>
										{trawl.name}
									</option>
								);
							})}
						</select>
					</label>
				) : null}

				{newHaul.sampler_id === "2" ? (
					<label className="form__cell">
						Gear:
						<select
							id="ctd_id"
							name="ctd"
							required
							value={newHaul?.ctd || ""}
							onChange={(e) => {
								handleChange(e);
							}}
						>
							<option value=""></option>
							{stationsContext.ctds.map((ctd) => {
								return (
									<option key={ctd.id} value={ctd.id}>
										{ctd.name}
									</option>
								);
							})}
						</select>
					</label>
				) : null}

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

				{newHaul.sampler_id === "1" ? (
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
				) : null}
			</Fragment>
		);
	};

	return renderContent();
};

export default HaulFormNew;
