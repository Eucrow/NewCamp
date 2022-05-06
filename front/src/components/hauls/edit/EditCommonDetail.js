import React, { Component, Fragment } from "react";

class EditCommonDetail extends Component {
	/**
	 * Component of the common part of the haul form.
	 * @param {object} props.haul
	 * @param {object} props.gears
	 * @param {function} props.handleChangeCommon
	 * @param {function} props.handleChangeCommonValid
	 * @param {function} props.handleChangeNestedIds
	 */
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
						onChange={this.props.handleChangeCommon}
					/>
				</label>

				<label className="form__cell">
					Stratum:
					<select
						id="stratum_id"
						name="stratum"
						className="select__largeWidth"
						value={this.props.haul.stratum.id || "choose"}
						onChange={this.props.handleChangeNestedIds}
					>
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
						name="sampler"
						className="select__normalWidth"
						value={this.props.haul.sampler.id || "choose"}
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
						onChange={this.props.handleChangeCommon}
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

export default EditCommonDetail;
