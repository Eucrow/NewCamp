import React, { Component } from "react";

import StationsContext from "../../../contexts/StationsContext";

import HaulButtonBar from "../HaulButtonBar";

class ViewCommon extends Component {
	/**
	 * Component of the common part of the haul form.
	 * @param {object} props.haul
	 * @param {boolena} edit
	 * @param {method} handleEdit
	 */

	static contextType = StationsContext;

	render() {
		return (
			<form>
				<label className="form__cell">
					Haul:
					<input
						type="number"
						name="haul"
						id="haul"
						className="input__noSpinner"
						disabled
						min="1"
						max="99"
						maxLength="2"
						size={2}
						value={this.props.haul.haul}
					/>
				</label>

				<label className="form__cell">
					Stratum:
					<select
						id="stratum_id"
						name="stratum_id"
						className="select__largeWidth"
						disabled
					>
						<option
							key={this.props.haul.stratum_id}
							value={this.props.haul.stratum_id}
						>
							{this.props.haul.stratum}
						</option>
					</select>
				</label>

				<label className="form__cell">
					Sampler:
					<select
						id="sampler_id"
						name="sampler"
						className="select__normalWidth"
						disabled
					>
						<option
							key={this.props.haul.sampler.id}
							value={this.props.haul.sampler.id}
						>
							{this.props.haul.sampler}
						</option>
					</select>
				</label>

				<label className="form__cell">
					Gear:
					<select id="gear_id" name="gear" disabled>
						<option
							key={this.props.haul.gear}
							value={this.props.haul.gear}
						>
							{this.props.haul.gear}
						</option>
					</select>
				</label>

				<label className="form__cell">
					Valid:
					<input
						type="checkbox"
						name="valid"
						id="valid"
						disabled
						defaultChecked={this.props.haul.valid}
					/>
				</label>
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

export default ViewCommon;
