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
			<fieldset className="wrapper form__row">
				<legend>Meteorology:</legend>
				<div className="form__cell">
					<label htmlFor="wind_direction">
						Wind direction (degrees):
					</label>
					<input
						type="number"
						name="wind_direction"
						id="wind_direction"
						disabled
						min={0}
						max={360}
						maxLength={3}
						size={3}
						value={haul.meteo.wind_direction || ""}
					/>
				</div>
				<div className="form__cell">
					<label htmlFor="wind_velocity">
						Wind Velocity (knots):
					</label>
					<input
						type="number"
						name="wind_velocity"
						id="wind_velocity"
						disabled
						min={0}
						max={99}
						step={0.1}
						maxLength={3}
						size={3}
						value={haul.meteo.wind_velocity || ""}
					/>
				</div>
				<div className="form__cell">
					<label htmlFor="sea_state">Sea State:</label>
					<input
						type="number"
						name="sea_state"
						id="sea_state"
						disabled
						min={0}
						max={9}
						maxLength={1}
						size={1}
						value={haul.meteo.sea_state || ""}
					/>
				</div>
			</fieldset>
		);
	}
}

export default ViewMeteorology;
