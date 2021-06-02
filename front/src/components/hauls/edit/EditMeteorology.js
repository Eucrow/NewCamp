import React, { Component } from "react";
class EditMeteorology extends Component {
	/**
	 * Component of meteorology form of haul.
	 * @param {object} props.haul
	 * @param {method} props.handleChangeMeteorology
	 */

	render() {
		const haul = this.props.haul;

		return (
			<fieldset class="wrapper">
				<legend>Meteorology:</legend>
				<label htmlFor="wind_direction">Wind direction:</label>
				<input
					type="text"
					name="wind_direction"
					id="wind_direction"
					value={haul.meteo.wind_direction || ""}
					onChange={this.props.handleChangeMeteorology}
				/>
				<label htmlFor="wind_velocity">Wind Velocity:</label>
				<input
					type="text"
					name="wind_velocity"
					id="wind_velocity"
					value={haul.meteo.wind_velocity || ""}
					onChange={this.props.handleChangeMeteorology}
				/>
				<label htmlFor="sea_state">Sea State:</label>
				<input
					type="text"
					name="sea_state"
					id="sea_state"
					value={haul.meteo.sea_state || ""}
					onChange={this.props.handleChangeMeteorology}
				/>
			</fieldset>
		);
	}
}

export default EditMeteorology;
