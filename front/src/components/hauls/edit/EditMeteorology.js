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
			<fieldset class="wrapper form__row">
				<legend>Meteorology:</legend>
				<div className="form__cell">
					<label htmlFor="wind_direction">
						Wind direction (degrees):
					</label>
					<input
						type="number"
						name="wind_direction"
						id="wind_direction"
						min={0}
						max={360}
						maxLength={3}
						size={3}
						value={haul.meteo.wind_direction || ""}
						onChange={this.props.handleChangeMeteorology}
					/>
				</div>
				<div className="form__cell">
					<label htmlFor="wind_velocity">
						Wind velocity (knots):
					</label>
					<input
						type="number"
						name="wind_velocity"
						id="wind_velocity"
						min={0}
						max={99}
						step={0.1}
						maxLength={3}
						size={3}
						value={haul.meteo.wind_velocity || ""}
						onChange={this.props.handleChangeMeteorology}
					/>
				</div>
				<div className="form__cell">
					<label htmlFor="sea_state">
						Sea state (Douglas scale):
					</label>
					<input
						type="number"
						name="sea_state"
						id="sea_state"
						min={0}
						max={9}
						maxLength={1}
						size={1}
						value={haul.meteo.sea_state || ""}
						onChange={this.props.handleChangeMeteorology}
					/>
				</div>
			</fieldset>
		);
	}
}

export default EditMeteorology;
