import React, { Component, useState, useContext } from "react";

import { Formik } from "formik";

import SurveysContext from "../../contexts/SuverysContext";

import UiButtonCancelEditSurvey from "./UiButtonCancelEditSurvey";
import UiButtonSaveNewSurvey from "./UiButtonSaveNewSurvey";

/**
 * Survey component
 */
// class NewSurveyForm extends Component {
const NewSurveyForm = () => {
	// static contextType = SurveysContext;

	const surveysContext = useContext(SurveysContext);

	const [survey, setSurvey] = useState({});

	const formRef = React.createRef();

	// constructor(props) {
	// 	super(props);

	// 	this.form = React.createRef();

	// 	this.state = {
	// 		survey: [],
	// 	};

	// 	this.handleChangeNew = this.handleChangeNew.bind(this);
	// 	this.validate = this.validate.bind(this);
	// }

	/**
	 * Validate field forms by the HTML Constrait API
	 * @returns true when all fields are valid.
	 */
	const validate = () => {
		// Validate end date/start date
		if (survey.start_date > survey.end_date) {
			formRef.current.end_date.setCustomValidity(
				"End date must be later than start date"
			);
		} else {
			formRef.current.end_date.setCustomValidity("");
		}

		return formRef.current.reportValidity();
	};

	/**
	 * Manage fields change in 'survey' state.
	 * This method is diferent to handleChange os Surveys component.
	 * @param {event} e - Event.
	 */
	const handleChangeNew = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setSurvey((survey) => {
			return {
				...survey,
				[name]: value,
			};
		});
	};

	/**
	 * Allow only type the number of digits of maxLength property
	 * @param {event} e - Event
	 */
	const maxLengthCheck = (e) => {
		if (e.target.value.length > e.target.maxLength) {
			e.target.value = e.target.value.slice(0, e.target.maxLength);
		}
	};

	/**
	 * Allow only type the number of digits of maxLength property with sign
	 * @param {object} object
	 */
	const maxLengthSignCheck = (object) => {
		if (
			object.target.value.length > object.target.maxLength &&
			object.target.value.charAt(0) === "-"
		) {
			object.target.value = object.target.value.slice(
				0,
				object.target.maxLength
			);
		} else {
			object.target.value = object.target.value.slice(
				0,
				object.target.maxLength - 1
			);
		}
	};

	/**
	 * Prevent 'e' and '-' in numeric input
	 * @param {e} onKeyDown event
	 */
	const preventNegativeE = (e) => {
		(e.key === "e" || e.key === "-") && e.preventDefault();
	};

	const renderContent = () => {
		var content = "";

		content = (
			<form
				className="wrapper"
				ref={formRef}
				onSubmit={(e) => e.preventDefault()}
			>
				<div className="survey__row">
					<span className="field">
						<label htmlFor="description">description: </label>
						<input
							type="text"
							id="description"
							name="description"
							className="station_number"
							onChange={handleChangeNew}
							required
							pattern="^[a-zA-Z0-9\s]{1,30}$"
						/>
					</span>
					<span className="field">
						<label htmlFor="acronym">acronym: </label>
						<input
							type="text"
							id="acronym"
							name="acronym"
							onChange={handleChangeNew}
							required
							pattern="^[\w|\d]{3}$"
						/>
					</span>
				</div>
				<div className="survey__row">
					<span className="field">
						<label htmlFor="start_date">Start date: </label>
						<input
							type="date"
							id="start_date"
							name="start_date"
							onChange={handleChangeNew}
						/>
					</span>
					<span className="field">
						<label htmlFor="end_date">End date: </label>
						<input
							type="date"
							id="end_date"
							name="end_date"
							onChange={handleChangeNew}
						/>
					</span>
				</div>
				<div className="survey__row">
					<span className="field">
						<label htmlFor="width_x">Grid width (miles): </label>
						<input
							type="number"
							id="width_x"
							name="width_x"
							onChange={handleChangeNew}
							min="0"
							max="180"
							maxLength={3}
							onInput={maxLengthCheck}
							onKeyDown={preventNegativeE}
						/>
					</span>
					<span className="field">
						<label htmlFor="width_y">Grid height (miles): </label>
						<input
							type="number"
							id="width_y"
							name="width_y"
							onChange={handleChangeNew}
							min="0"
							max="90"
							maxLength={2}
							onInput={maxLengthCheck}
							onKeyDown={preventNegativeE}
						/>
					</span>
					<span className="field">
						<label htmlFor="origin_x">
							Grid origin longitude (degrees):
						</label>
						<input
							type="number"
							id="origin_x"
							name="origin_x"
							onChange={handleChangeNew}
							min="-180"
							max="180"
							maxLength={4}
							onInput={maxLengthSignCheck}
						/>
					</span>
					<span className="field">
						<label htmlFor="origin_y">
							Grid origin latitude (degrees):{" "}
						</label>
						<input
							type="number"
							id="origin_y"
							name="origin_y"
							onChange={handleChangeNew}
							min="-90"
							max="90"
							maxLength={3}
							onInput={maxLengthSignCheck}
						/>
					</span>
				</div>
				<div className="survey__row">
					<span className="field">
						<label htmlFor="ship">ship: </label>
						<input
							type="text"
							id="ship"
							name="ship"
							onChange={handleChangeNew}
						/>
					</span>
					<span className="field">
						<label htmlFor="hauls_duration">hauls_duration: </label>
						<input
							type="text"
							id="hauls_duration"
							name="hauls_duration"
							onChange={handleChangeNew}
						/>
					</span>
					<span className="field">
						<label htmlFor="unit_sample">unit_sample: </label>
						<input
							type="text"
							id="unit_sample"
							name="unit_sample"
							onChange={handleChangeNew}
						/>
					</span>
					<span className="field">
						<label htmlFor="stratification">
							stratification_id: PENDIENTE
						</label>
						<select
							id="stratification"
							name="stratification"
							onChange={handleChangeNew}
						>
							<option />

							{surveysContext.stratifications.map((st, idx) => {
								return (
									<option value={st.id} key={idx}>
										{st.id} - {st.stratification}
									</option>
								);
							})}
						</select>
					</span>
				</div>
				<div className="survey__row">
					<label htmlFor="comment">comment: </label>
					<input
						type="text"
						id="comment"
						name="comment"
						onChange={handleChangeNew}
					/>
				</div>
				<div className="survey__row">
					<div className="survey__cell survey__cell--right buttonsWrapper">
						<UiButtonSaveNewSurvey
							survey={survey}
							validate={validate}
						/>
						<UiButtonCancelEditSurvey />
					</div>
				</div>
			</form>
		);

		return content;
	};

	return renderContent();

	// render() {
	// 	return this.renderContent();
	// }
};

export default NewSurveyForm;
