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
			<fieldset className="wrapper haul__row">
				<legend>Meteorology</legend>
				<div className="haul__row">
					<div className="haul__cell">
						<div className="haul_label">Wind direction:</div>
						<div>{haul.meteo.wind_direction || ""}</div>
					</div>
					<div className="haul__cell">
						<div className="haul_label">Wind velocity:</div>
						<div>{haul.meteo.wind_velocity || ""}</div>
					</div>
					<div className="haul__cell">
						<div className="haul_label">Sea State:</div>
						<div>{haul.meteo.sea_state || ""}</div>
					</div>
				</div>
			</fieldset>
		);
	}
}

export default ViewMeteorology;
