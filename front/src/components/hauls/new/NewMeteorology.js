import React, { Component } from "react";

class NewMeteorology extends Component {
	/**
	 * @param props.handleChangeMeteo
	 */
	render() {
		return (
			<fieldset>
				<legend>Meteorology</legend>
				<label htmlFor="wind_direction">
					Wind direction (degrees):
				</label>
				<input
					type="text"
					id="wind_direction"
					name="wind_direction"
					onChange={this.props.handleChangeMeteo}
				/>
				<label htmlFor="wind_velocity">Wind velocity (knots)</label>
				<input
					type="text"
					id="wind_velocity"
					name="wind_velocity"
					onChange={this.props.handleChangeMeteo}
				/>
				<label htmlFor="sea_state">Sea state (Douglas scale):</label>
				<input
					type="text"
					id="sea_state"
					name="sea_state"
					onChange={this.props.handleChangeMeteo}
				/>
			</fieldset>
		);
	}
}

export default NewMeteorology;
