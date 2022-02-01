import React, { Component, useState, useContext } from "react";

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

	/**
	 * Validate field forms by the HTML Constrait API
	 * @returns true when all fields are valid.
	 */
	const validate = (e) => {
		return formRef.current.reportValidity();
	};

	/**
	 * Validate start date with end date
	 * @param {event} e onChange event
	 * @returns In case of error in date, show report validity.
	 */
	const validateStartDate = (e) => {
		e.target.setCustomValidity("");
		// Validate end date/start date
		if (
			typeof survey.end_date != "undefined" &&
			e.target.value > survey.end_date
		) {
			e.target.setCustomValidity(
				"Start date must be sooner than end date."
			);
		}

		return e.target.reportValidity();
	};

	/**
	 * Validate end date with start date
	 * @param {event} e onChange event
	 * @returns In case of error in date, show report validity.
	 */
	const validateEndDate = (e) => {
		e.target.setCustomValidity("");
		// Validate end date/start date
		if (
			typeof survey.start_date != "undefined" &&
			survey.start_date > e.target.value
		) {
			e.target.setCustomValidity(
				"End date must be later than start date."
			);
		}

		return e.target.reportValidity();
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
		e.target.setCustomValidity("");
		if (e.target.value.length > e.target.maxLength) {
			e.target.setCustomValidity(
				"Maximum " + e.target.maxLength + " digits."
			);
		}
		e.target.reportValidity();
	};

	/**
	 * Allow only type the number of digits of maxLength property with sign
	 * @param {event} e - Event
	 */
	const maxLengthSignCheck = (e) => {
		if (
			e.target.value.length > e.target.maxLength &&
			e.target.value.charAt(0) === "-"
		) {
			e.target.value = e.target.value.slice(0, e.target.maxLength);
		} else {
			e.target.value = e.target.value.slice(0, e.target.maxLength - 1);
		}
	};

	/**
	 * Prevent 'e' and '-' in numeric input
	 * @param {e} onKeyDown event
	 */
	const preventNegativeE = (e) => {
		if (e.key === "e" || e.key === "-") {
			e.preventDefault();
		}
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
						<label htmlFor="description">Description:</label>
						<input
							type="text"
							id="description"
							name="description"
							className="survey_description"
							required
							pattern="^[a-zA-Z0-9\s]{1,30}$"
							onChange={handleChangeNew}
						/>
					</span>
					<span className="field">
						<label htmlFor="acronym">Acronym:</label>
						<input
							type="text"
							id="acronym"
							name="acronym"
							required
							pattern="^[\w|\d]{3}$"
							onChange={handleChangeNew}
						/>
					</span>
				</div>
				<div className="survey__row">
					<span className="field">
						<label htmlFor="start_date">Start date:</label>
						<input
							type="date"
							id="start_date"
							name="start_date"
							onChange={(e) => {
								handleChangeNew(e);
								validateStartDate(e);
							}}
						/>
					</span>
					<span className="field">
						<label htmlFor="end_date">End date:</label>
						<input
							type="date"
							id="end_date"
							name="end_date"
							onChange={(e) => {
								handleChangeNew(e);
								validateEndDate(e);
							}}
						/>
					</span>
				</div>
				<div className="survey__row">
					<span className="field">
						<label htmlFor="ship">Ship:</label>
						<input
							type="text"
							id="ship"
							name="ship"
							onChange={handleChangeNew}
						/>
					</span>
					<span className="field">
						<label htmlFor="hauls_duration">
							Hauls duration (minutes):
						</label>
						<input
							type="number"
							id="hauls_duration"
							name="hauls_duration"
							min="0"
							onChange={handleChangeNew}
							onKeyDown={preventNegativeE}
						/>
					</span>
					<span className="field">
						<label htmlFor="stratification">Stratification:</label>
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
				<fieldset className="wrapper survey__row">
					<legend>Grid</legend>
					<span className="field">
						<label htmlFor="width_x">Width (miles):</label>
						<input
							type="number"
							id="width_x"
							name="width_x"
							min="0"
							max="999"
							maxLength={3}
							onChange={handleChangeNew}
							onKeyDown={preventNegativeE}
						/>
					</span>
					<span className="field">
						<label htmlFor="width_y">Height (miles):</label>
						<input
							type="number"
							id="width_y"
							name="width_y"
							min="0"
							max="999"
							maxLength={3}
							onChange={handleChangeNew}
							onKeyDown={preventNegativeE}
						/>
					</span>
					<span className="field">
						<label htmlFor="origin_x">
							Origin longitude (degrees):
						</label>
						<input
							type="number"
							id="origin_x"
							name="origin_x"
							min="-180"
							max="180"
							maxLength={7}
							onChange={handleChangeNew}
							onInput={maxLengthCheck}
						/>
					</span>
					<span className="field">
						<label htmlFor="origin_y">
							Origin latitude (degrees):
						</label>
						<input
							type="number"
							id="origin_y"
							name="origin_y"
							min="-90"
							max="90"
							maxLength={6}
							onChange={handleChangeNew}
						/>
					</span>
					<span className="field">
						<label htmlFor="unit_sample">
							Area sampled (square milles):
						</label>
						<input
							type="number"
							id="unit_sample"
							name="unit_sample"
							min="0"
							onChange={handleChangeNew}
							onKeyDown={preventNegativeE}
						/>
					</span>
				</fieldset>

				<div className="survey__row">
					<label htmlFor="comment">Comment:</label>
					<input
						type="text"
						id="comment"
						name="comment"
						className="comment"
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
