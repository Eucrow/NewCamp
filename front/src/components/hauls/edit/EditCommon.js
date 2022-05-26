import React, { Component, Fragment } from "react";

import StationsContext from "../../../contexts/StationsContext";

class EditCommon extends Component {
	/**
	 * Component of the common part of the haul form.
	 * @param {object} props.haul
	 * @param {object} props.gears
	 * @param {method} props.handleChangeCommonValid
	 * @param {method} props.handleChangeNestedIds
	 * handleChangeStratum
	 * @param {method} props.validateHaulSampler
	 */

	static contextType = StationsContext;

	render() {
		const haul = this.props.haul;

		return (
			<Fragment>
				<label className="form__cell">
					Haul:
					<input
						type="number"
						name="haul"
						id="haul"
						className="input__noSpinner"
						min="1"
						max="99"
						maxLength="2"
						size={2}
						value={haul.haul || ""}
						onChange={(e) => {
							this.context.handleChangeCommonHaul(e, haul.id);
							// this.props.validateHaulSampler(e);
						}}
					/>
				</label>

				<label className="form__cell">
					Stratum:
					<select
						id="stratum_id"
						name="stratum"
						className="select__largeWidth"
						value={this.props.haul.stratum_id || "choose"}
						// onChange={this.props.handleChangeNestedIds}
						// onChange={this.props.handleChangeStratum}
						onChange={(e) => {
							this.context.handleChangeStratum(e, haul.id);
						}}
					>
						{this.context.strata.map((stratum) => {
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
						name="sampler"
						className="select__normalWidth"
						disabled
						value={this.props.haul.sampler_id || "choose"}
						onChange={this.props.handleChangeNestedIds}
					>
						{this.props.samplers.map((sampler) => {
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
						value={this.props.haul.gear || "choose"}
						onChange={(e) => {
							this.context.handleChangeCommonHaul(e, haul.id);
						}}
					>
						{this.props.gears.map((gear) => {
							return (
								<option key={gear.name} value={gear.name}>
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
						name="valid"
						id="valid"
						defaultChecked={haul.valid}
						onChange={this.props.handleChangeCommonValid}
					/>
				</label>
			</Fragment>
		);
	}
}

export default EditCommon;
