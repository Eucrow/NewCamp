import React, { useState, useRef } from "react";

import MeasurementButtonBar from "./MeasurementButtonBar";

/**
 * Renders a form for creating a new measurement.
 * @param {boolean} add - Indicates whether the form is in "add" mode.
 * @param {function} setAdd - Function to update the "add" state.
 * @param {function} createMeasurement - Function to create a new measurement.
 * @returns {JSX.Element} The rendered form.
 */
const MeasurementFormNew = ({ add, setAdd, createMeasurement, isNameValid, validateMeasurementName }) => {
	const [measurement, setMeasurement] = useState([
		{
			name: "",
			increment: "",
			conversion_factor: "",
		},
	]);

	const nameRef = useRef(null);
	const incrementRef = useRef(null);
	const conversionFactorRef = useRef(null);

	const [isFormValid, setIsFormValid] = useState(false);

	const validateForm = () => {
		const isNameValid = nameRef.current.checkValidity();
		const isIncrementValid = incrementRef.current.checkValidity();
		const isConversionFactorValid = conversionFactorRef.current.checkValidity();

		setIsFormValid(isNameValid && isIncrementValid && isConversionFactorValid);
	};

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

		if (name === "name") {
			validateMeasurementName(e, value);
		}
		validateForm();
	};

	const handleSubmit = (e) => {
		createMeasurement(e, measurement);
		setAdd(false);
	};

	/**
	 * Renders the content of the form.
	 * @returns {JSX.Element} The rendered content.
	 */
	const renderContent = () => {
		const content = (
			<form className="wrapper" onSubmit={handleSubmit}>
				<div className="form__row">
					<div className="form__cell">
						<label>
							Name:
							<input
								type="text"
								id="name"
								name="name"
								autoFocus
								ref={nameRef}
								required
								autoComplete="off"
								size={6}
								onInput={(e) => handleChange(e)}
								onChange={(e) => handleChange(e)}
							/>
						</label>
					</div>
					<div className="form__cell noSpinner">
						<label>
							Increment (mm):
							<input
								type="number"
								id="increment"
								name="increment"
								ref={incrementRef}
								required
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
								ref={conversionFactorRef}
								required
								min="0"
								max="9999"
								size={4}
								step={0.001}
								onChange={(e) => handleChange(e)}
							/>
						</label>
					</div>
					<MeasurementButtonBar
						add={add}
						setAdd={setAdd}
						isNameValid={isNameValid}
						isFormValid={isFormValid}
					/>
				</div>
			</form>
		);
		return content;
	};

	return renderContent();
};

export default MeasurementFormNew;
