import React, { Component } from "react";

class NewCommon extends Component {
	/**
	 * Component of the common part of the haul form.
	 * @param {number} props.haul
	 * @param {function} props.handleChangeCommon
	 * @param {function} props.handleChangeCommonValid
	 */

	render() {
		return (
			<fieldset>
				<legend>Common information:</legend>

				<label htmlFor="haul">Haul:</label>
				<input type="text" id="haul" name="haul" onChange={this.props.handleChange} />

				<label htmlFor="stratum_id">Stratum: </label>
				<select
					id="stratum_id"
					name="stratum"
					value={this.props.haul.stratum.id || "choose"}
					onChange={this.props.handleChangeNestedIds}
				>
					<option disabled value="choose">
						--chose a stratum--
					</option>
					{this.props.strata.map((stratum) => {
						return (
							<option key={stratum.id} value={stratum.id}>
								{stratum.stratum}
							</option>
						);
					})}
				</select>

				<label htmlFor="sampler_id">Sampler: </label>
				<select
					id="sampler_id"
					name="sampler"
					value={this.props.haul.sampler.id || "choose"}
					onChange={this.props.handleChangeNestedIds}
				>
					<option disabled value="choose">
						--chose a sampler--
					</option>
					{this.props.samplers.map((sampler) => {
						return (
							<option key={sampler.id} value={sampler.id}>
								{sampler.sampler}
							</option>
						);
					})}
				</select>

				<label htmlFor="gear">Gear:</label>
				<input type="text" id="gear" name="gear" onChange={this.props.handleChange} />

				<label htmlFor="valid">Valid:</label>
				<input type="checkbox" id="valid" name="valid" onChange={this.props.handleChange} />
			</fieldset>
		);
	}
}

export default NewCommon;
