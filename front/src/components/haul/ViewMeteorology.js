import React, { Component } from "react";

class ViewMeteorology extends Component {
	/**
	 * Component of meteorology form of haul.
	 * @param {number} props.haul
	 */

	constructor(props) {
		super(props);
	}

	render() {
		const haul = this.props.haul;
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
