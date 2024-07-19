import React, { useState, useRef } from "react";

import MeasurementButtonBar from "./MeasurementButtonBar";

/**
 * Represents a form for creating a new measurement.
 * @param {boolean} add - Indicates whether to add a new measurement.
 * @param {function} setAdd - Function to set the add state.
 * @param {function} createMeasurement - Function to create a new measurement.
 * @param {boolean} isNameValid - Indicates whether the measurement name is valid.
 * @param {function} validateMeasurementName - Function to validate the measurement name.
 * @returns {JSX.Element} The rendered MeasurementFormNew component.
 */
const MeasurementFormNew = ({ add, setAdd, createMeasurement, isNameValid, validateMeasurementName }) => {
	const [measurement, setMeasurement] = useState({
		name: "",
		increment: "",
		conversion_factor: "",
	});

	const nameRef = useRef(null);
	const incrementRef = useRef(null);
	const conversionFactorRef = useRef(null);

	const [isFormValid, setIsFormValid] = useState(false);

	/**
	 * Validates the form inputs and updates the form validity state.
	 */
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

		setMeasurement((prevMeasurement) => {
			return { ...prevMeasurement, [name]: value };
		});

		if (name === "name") {
			validateMeasurementName(e, value);
		}
		validateForm();
	};

	/**
	 * Handles the form submission event.
	 * @param {Event} e - The form submission event.
	 */
	const handleSubmit = (e) => {
		createMeasurement(e, measurement);
		setAdd(false);
	};

	/**
	 * Renders the content of the form.
	 * @returns {JSX.Element} The rendered content.
	 */
	const renderContent = () => {
		return (
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
	};

	return renderContent();
};

export default MeasurementFormNew;
