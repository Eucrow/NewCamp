import React from "react";

const MeteorologyFormNew = ({ handleChangeMeteo }) => {
	/**
	 * @param handleChangeMeteo
	 */
	const renderContent = () => {
		return (
			<fieldset className="wrapper form__row">
				<legend>Meteorology:</legend>
				<label className="form__cell">
					Wind direction (degrees):
					<input
						type="number"
						name="wind_direction"
						id="wind_direction"
						min={0}
						max={360}
						maxLength={3}
						size={3}
						onChange={(e) => {
							handleChangeMeteo(e);
						}}
					/>
				</label>
				<label className="form__cell">
					Wind velocity (knots):
					<input
						type="number"
						name="wind_velocity"
						id="wind_velocity"
						min={0}
						max={99}
						step={0.1}
						maxLength={3}
						size={3}
						onChange={(e) => {
							handleChangeMeteo(e);
						}}
					/>
				</label>
				<label className="form__cell">
					Sea state (Douglas scale):
					<input
						type="number"
						name="sea_state"
						id="sea_state"
						min={0}
						max={9}
						maxLength={1}
						size={1}
						onChange={(e) => {
							handleChangeMeteo(e);
						}}
					/>
				</label>
			</fieldset>
		);
	};

	return renderContent();
};

export default MeteorologyFormNew;
