import React, { Component } from "react";

class ViewMeteorology extends Component {
	/**
	 * Component of meteorology form of haul.
	 * @param {object} props.haul
	 */

	render() {
		const haul = this.props.haul;

		if (haul.meteo === null) return null;

		return (
			<fieldset>
				<legend>Meteorology:</legend>
				Wind direction: {haul.meteo.wind_direction || ""}
				Wind velocity: {haul.meteo.wind_velocity || ""}
				Sea State: {haul.meteo.sea_state || ""}
			</fieldset>
		);
	}
}

export default ViewMeteorology;
