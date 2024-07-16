import React, { useState } from "react";

import MeasurementButtonBar from "./MeasurementButtonBar";

/**
 * Renders a form for creating a new measurement.
 * @param {boolean} add - Indicates whether the form is in "add" mode.
 * @param {function} setAdd - Function to update the "add" state.
 * @param {function} createMeasurement - Function to create a new measurement.
 * @returns {JSX.Element} The rendered form.
 */
const MeasurementFormNew = ({ add, setAdd, createMeasurement }) => {
	const [measurement, setMeasurement] = useState([
		{
			name: "",
			increment: "",
			conversion_factor: "",
		},
	]);

	/**
	 * Handles the change event for form inputs.
	 * @param {Event} e - The change event.
	 */
	const handleChange = (e) => {
		e.preventDefault();
		const name = e.target.name;
		const value = e.target.value;

		setMeasurement(() => {
			return { ...measurement, [name]: value };
		});
	};

	/**
	 * Renders the content of the form.
	 * @returns {JSX.Element} The rendered content.
	 */
	const renderContent = () => {
		const handleSubmit = (e) => {
			createMeasurement(e, measurement);
			setAdd(false);
		};

		const content = (
			<form className="wrapper" onSubmit={handleSubmit}>
				<div className="form__row">
					<div className="form__cell">
						<label>
							Name:
							<input type="text" id="name" name="name" size={6} onChange={(e) => handleChange(e)} />
						</label>
					</div>
					<div className="form__cell noSpinner">
						<label>
							Increment (mm):
							<input
								type="number"
								id="increment"
								name="increment"
								min="0"
								max="9999"
								size={4}
								step={1}
								onChange={(e) => handleChange(e)}
							/>
						</label>
					</div>
					<div className="form__cell noSpinner">
						<label>
							Conversion factor:
							<input
								type="number"
								id="conversion_factor"
								name="conversion_factor"
								min="0"
								max="9999"
								size={4}
								step={0.001}
								onChange={(e) => handleChange(e)}
							/>
						</label>
					</div>
					<MeasurementButtonBar add={add} setAdd={setAdd} />
				</div>
			</form>
		);
		return content;
	};

	return renderContent();
};

export default MeasurementFormNew;
