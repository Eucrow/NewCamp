import React, { Component, Fragment } from "react";

class NewCommonDetail extends Component {
	/**
	 * Component of the common part of the haul form.
	 * @param {object} props.haul
	 * @param {object} props.strata
	 * @param {object} props.samplers
	 * @param {object} props.gears
	 * @param {method} props.handleChange
	 * @param {method} props.handleChangeNestedIds
	 * @param {method} props.validateHaulSampler
	 */

	render() {
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
						onChange={(e) => {
							this.props.handleChange(e);
							this.props.validateHaulSampler(
								e,
								e.target.value,
								this.props.haul.sampler_id
							);
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
						value={this.props.haul.stratum_id || "choose"}
						onChange={this.props.handleChange}
					>
						<option value="" selected></option>
						{this.props.strata.map((stratum) => {
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
						value={this.props.haul.sampler_id || "choose"}
						onChange={(e) => {
							this.props.handleChange(e);
							this.props.validateHaulSampler(
								e,
								this.props.haul.haul,
								e.target.value
							);
						}}
					>
						<option value="" selected></option>
						{this.props.samplers.map((sampler) => {
							return (
								<option key={sampler.id} value={sampler.id}>
									{sampler.sampler}
								</option>
							);
						})}
					</select>{" "}
				</label>

				<label className="form__cell">
					Gear:
					<select
						id="gear_id"
						name="gear"
						required
						value={this.props.haul.gear || "choose"}
						onChange={this.props.handleChange}
					>
						<option value="" selected></option>
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
						id="valid"
						name="valid"
						onChange={this.props.handleChange}
					/>
				</label>
			</Fragment>
		);
	}
}

export default NewCommonDetail;
