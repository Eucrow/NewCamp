import React from "react";

const MeteorologyFormEdit = ({ meteorology, handleChangeMeteorology }) => {
	/**
	 * Component of meteorology form of haul.
	 * @param {object} props.haul
	 * @param {method} props.handleChangeMeteorology
	 */

	const renderContent = () => {
		return (
			<fieldset className="wrapper form__row">
				<legend>Meteorology:</legend>
				<div className="form__cell">
					<label htmlFor="wind_direction">Wind direction (degrees):</label>
					<input
						type="number"
						name="wind_direction"
						id="wind_direction"
						min={0}
						max={360}
						maxLength={3}
						size={3}
						value={meteorology.wind_direction || ""}
						onChange={(e) => {
							handleChangeMeteorology(e);
						}}
					/>
				</div>
				<div className="form__cell">
					<label htmlFor="wind_velocity">Wind velocity (knots):</label>
					<input
						type="number"
						name="wind_velocity"
						id="wind_velocity"
						min={0}
						max={99}
						step={0.1}
						maxLength={3}
						size={3}
						value={meteorology.wind_velocity || ""}
						onChange={(e) => {
							handleChangeMeteorology(e);
						}}
					/>
				</div>
				<div className="form__cell">
					<label htmlFor="sea_state">Sea state (Douglas scale):</label>
					<input
						type="number"
						name="sea_state"
						id="sea_state"
						min={0}
						max={9}
						maxLength={1}
						size={1}
						value={meteorology.sea_state || ""}
						onChange={(e) => {
							handleChangeMeteorology(e);
						}}
					/>
				</div>
			</fieldset>
		);
	};

	return renderContent();
};

export default MeteorologyFormEdit;
