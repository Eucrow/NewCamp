import React, { Component } from "react";

import StationsContext from "../../../contexts/StationsContext";

import HaulButtonBar from "../HaulButtonBar";

class EditCommonForm extends Component {
	/**
	 * Component of the common part of the haul form.
	 * @param {object} haul
	 * @param {number} station_id
	 * @param {boolean} edit
	 * @param {method} handleChangeCommonValid
	 * @param {method} handleChangeNestedIds
	 * @param {method} validateHaulSampler
	 */

	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	static contextType = StationsContext;

	handleSubmit(e, haul_id, station_id) {
		this.context.updateHaulCommon(e, haul_id, station_id);
		this.props.handleEdit(false);
	}

	render() {
		const haul = this.props.haul;

		return (
			<form
				onSubmit={(e) =>
					this.handleSubmit(e, haul.id, this.props.station_id)
				}
			>
				<div className="form__row">
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
							}}
						/>
					</label>
					<label className="form__cell">
						Stratum:
						<select
							id="stratum_id"
							name="stratum_id"
							className="select__largeWidth"
							value={this.props.haul.stratum_id || "choose"}
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
							{this.context.samplers.map((sampler) => {
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
							className="select__gear"
							value={this.props.haul.gear || "choose"}
							onChange={(e) => {
								this.context.handleChangeGear(e, haul.id);
							}}
						>
							{this.context.gears.map((gear) => {
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
							name="valid"
							id="valid"
							defaultChecked={haul.valid}
							onChange={(e) => {
								this.context.handleChangeCommonValid(haul.id);
							}}
						/>
					</label>
				</div>
				<div className="form__row">
					<HaulButtonBar
						haul_id={this.props.haul.id}
						edit={this.props.edit}
						handleEdit={this.props.handleEdit}
						deleteHaul={this.context.deleteHaul}
					/>
				</div>
			</form>
		);
	}
}

export default EditCommonForm;
