import React, { Component } from "react";

class NewCommon extends Component {
	/**
	 * Component of the common part of the haul form.
	 * @param {object} props.haul
	 * @param {object} props.strata
	 * @param {object} props.samplers
	 * @param {object} props.gears
	 * @param {method} props.handleChange
	 * @param {method} props.handleChangeNestedIds
	 */

	render() {
		return (
			<fieldset>
				<legend>Common information:</legend>

				<label htmlFor="haul">Haul:</label>
				<input
					type="text"
					id="haul"
					name="haul"
					onChange={this.props.handleChange}
				/>

				<label htmlFor="stratum_id">Stratum:</label>
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
				<select
					id="gear_id"
					name="gear"
					value={this.props.haul.gear || "choose"}
					onChange={this.props.handleChange}
				>
					<option disabled value="choose">
						--choose a gear--
					</option>
					{this.props.gears.map((gear) => {
						return (
							<option key={gear.name} value={gear.name}>
								{gear.name}
							</option>
						);
					})}
				</select>

				<label htmlFor="valid">Valid:</label>
				<input
					type="checkbox"
					id="valid"
					name="valid"
					onChange={this.props.handleChange}
				/>
			</fieldset>
		);
	}
}

export default NewCommon;
