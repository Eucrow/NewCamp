import React, { Component } from "react";

import SurveysContext from "../../contexts/SuverysContext";

import UiButtonCancelEditSurvey from "./UiButtonCancelEditSurvey";
import UiButtonSaveNewSurvey from "./UiButtonSaveNewSurvey";

/**
 * Survey component
 */
class NewSurveyForm extends Component {
	static contextType = SurveysContext;

	constructor(props) {
		super(props);

		this.form = React.createRef();

		this.state = {
			survey: [],
		};

		this.handleChangeNew = this.handleChangeNew.bind(this);
		this.validate = this.validate.bind(this);
	}

	/**
	 * Validate field forms by the HTML Constrait API
	 * @returns true when all fields are valid.
	 */
	validate() {
		// Validate end date/start date
		if (this.state.survey.start_date > this.state.survey.end_date) {
			this.form.current.end_date.setCustomValidity(
				"End date must be later than start date"
			);
		} else {
			this.form.current.end_date.setCustomValidity("");
		}

		return this.form.current.reportValidity();
	}

	/**
	 * Manage fields change in 'survey' state.
	 * This method is diferent to handleChange os Surveys component.
	 * @param {event} e - Event.
	 */
	handleChangeNew(e) {
		const name = e.target.name;
		const value = e.target.value;

		this.setState({
			survey: {
				...this.state.survey,
				[name]: value,
			},
		});
	}

	/**
	 * Allow only type the number of digits of maxLength property
	 * @param {object} object
	 */
	maxLengthCheck = (object) => {
		if (object.target.value.length > object.target.maxLength) {
			object.target.value = object.target.value.slice(
				0,
				object.target.maxLength
			);
		}
	};

	/**
	 * Allow only type the number of digits of maxLength property with sign
	 * @param {object} object
	 */
	maxLengthSignCheck = (object) => {
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
	preventNegativeE = (e) => {
		(e.key === "e" || e.key === "-") && e.preventDefault();
	};

	renderContent() {
		var content = "";

		content = (
			<form
				className="wrapper"
				ref={this.form}
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
							onChange={(e) => this.handleChangeNew(e)}
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
							onChange={(e) => this.handleChangeNew(e)}
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
							onChange={(e) => this.handleChangeNew(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="end_date">End date: </label>
						<input
							type="date"
							id="end_date"
							name="end_date"
							onChange={(e) => this.handleChangeNew(e)}
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
							onChange={(e) => this.handleChangeNew(e)}
							min="0"
							max="180"
							maxLength={3}
							onInput={this.maxLengthCheck}
							onKeyDown={this.preventNegativeE}
						/>
					</span>
					<span className="field">
						<label htmlFor="width_y">Grid height (miles): </label>
						<input
							type="number"
							id="width_y"
							name="width_y"
							onChange={(e) => this.handleChangeNew(e)}
							min="0"
							max="90"
							maxLength={2}
							onInput={this.maxLengthCheck}
							onKeyDown={this.preventNegativeE}
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
							onChange={(e) => this.handleChangeNew(e)}
							min="-180"
							max="180"
							maxLength={4}
							onInput={this.maxLengthSignCheck}
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
							onChange={(e) => this.handleChangeNew(e)}
							min="-90"
							max="90"
							maxLength={3}
							onInput={this.maxLengthSignCheck}
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
							onChange={(e) => this.handleChangeNew(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="hauls_duration">hauls_duration: </label>
						<input
							type="text"
							id="hauls_duration"
							name="hauls_duration"
							onChange={(e) => this.handleChangeNew(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="unit_sample">unit_sample: </label>
						<input
							type="text"
							id="unit_sample"
							name="unit_sample"
							onChange={(e) => this.handleChangeNew(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="stratification">
							stratification_id: PENDIENTE
						</label>
						<select
							id="stratification"
							name="stratification"
							onChange={(e) => this.handleChangeNew(e)}
						>
							<option />

							{this.context.stratifications.map((st, idx) => {
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
						onChange={(e) => this.handleChangeNew(e)}
					/>
				</div>
				<div className="survey__row">
					<div className="survey__cell survey__cell--right buttonsWrapper">
						<UiButtonSaveNewSurvey
							survey={this.state.survey}
							validate={this.validate}
						/>
						<UiButtonCancelEditSurvey />
					</div>
				</div>
			</form>
		);

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default NewSurveyForm;
