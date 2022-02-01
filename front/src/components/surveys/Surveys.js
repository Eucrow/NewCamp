import React, { Component } from "react";

import SurveysContext from "../../contexts/SuverysContext";

import SurveysButtonBar from "./SurveysButtonBar";
import Survey from "./Survey";
import NewSurvey from "./NewSurvey";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

/**
 * Component list of surveys.
 * List of all the surveys stored in database.
 */
class Surveys extends Component {
	constructor(props) {
		super(props);
		this.state = {
			surveys: [],
			stratifications: [],
			add: false, // true to add new survey; false to not to.
		};

		this.apiSurvey = "http://127.0.0.1:8000/api/1.0/survey/";
		this.apiStratification =
			"http://127.0.0.1:8000/api/1.0/stratifications/";

		this.handleChange = this.handleChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.createSurvey = this.createSurvey.bind(this);
		this.updateSurvey = this.updateSurvey.bind(this);
		this.deleteSurvey = this.deleteSurvey.bind(this);

		this.getStratifications = this.getStratifications.bind(this);

		this.maxLengthCheck = this.maxLengthCheck.bind(this);
		this.preventNegativeE = this.preventNegativeE.bind(this);
		this.validateStartDate = this.validateStartDate.bind(this);
		this.validateEndDate = this.validateEndDate.bind(this);

		this.renderContent = this.renderContent.bind(this);
	}

	/**
	 * Manage change in fields of a previous created survey.
	 * @param {event} e - Event.
	 * @param {numeric} survey_id - Identification number of the survey which fields are managed.
	 */
	handleChange(e, survey_id) {
		const name = e.target.name;
		const value = e.target.value;

		e.preventDefault();
		const newSurveys = this.state.surveys.map((survey) => {
			if (survey.id === survey_id) {
				var newSurvey = survey;
				newSurvey[name] = value;
				return newSurvey;
			} else {
				return survey;
			}
		});

		this.setState(() => {
			return {
				surveys: newSurveys,
			};
		});
	}

	/**
	 * Manage change of 'add' state.
	 * @param {boolean} status true to show the "Add Survey" button.
	 */
	handleAdd(status) {
		this.setState(() => {
			return {
				add: status,
			};
		});
	}

	/**
	 * Create survey in database and update the state.
	 * @param {event} e - Event
	 * @param {object} survey - Survey object to create.
	 */
	createSurvey(e, survey) {
		e.preventDefault();

		fetch(this.apiSurvey, {
			method: "POST",
			headers: {
				"Content-type": "Application/json",
				Accept: "Application/json",
			},
			body: JSON.stringify(survey),
		})
			.then((response) => {
				return response.json();
			})
			.then((survey) => {
				const newSurveys = [...this.state.surveys, survey];

				this.setState({
					surveys: newSurveys,
				});
			})
			.catch((error) => alert(error));
	}

	/**
	 * Update survey from database and state.
	 * @param {event} e - Event.
	 * @param {numeric} survey_id - Survey identificator of survey to update.
	 */
	updateSurvey(e, survey_id) {
		e.preventDefault();
		const api = this.apiSurvey + survey_id;

		const updatedSurvey = this.state.surveys.filter((survey) => {
			return survey.id === survey_id;
		});

		fetch(api, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedSurvey[0]),
		})
			.then((response) => {
				if (response.status === 200) {
					//TODO: something should be here!!
				} else {
					alert("Something is wrong.");
				}
			})
			.catch((error) => console.log(error));
	}

	/**
	 * Delete survey from database and state.
	 * @param {event} e Event.
	 * @param {numeric} survey_id Survey identificator of survey to delete.
	 */
	deleteSurvey(e, survey_id) {
		e.preventDefault();

		const api = this.apiSurvey + survey_id;

		fetch(api, {
			method: "DELETE",
			headers: {
				"Content-type": "Application/json",
				Accept: "Application/json",
			},
		})
			.then(() => {
				const newSurveys = this.state.surveys.filter(
					(survey) => survey.id !== survey_id
				);

				this.setState({
					surveys: newSurveys,
				});
			})
			.catch((error) => alert(error));
	}
	/**
	 * Get all stratifications.
	 */
	getStratifications() {
		return fetch(this.apiStratification)
			.then((response) => {
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Something went wrong!" };
					});
				}
				return response.json();
			})
			.then((stratifications) => {
				this.setState(() => {
					return {
						stratifications: stratifications,
					};
				});
			})
			.catch((error) => console.log(error));
	}

	// VALIDATIONS
	/**
	 * Allow only type the number of digits of maxLength property
	 * @param {event} e - Event
	 */
	maxLengthCheck(e) {
		e.target.setCustomValidity("");
		if (e.target.value.length > e.target.maxLength) {
			e.target.setCustomValidity(
				"Maximum " + e.target.maxLength + " digits."
			);
		}
		e.target.reportValidity();
	}

	/**
	 * Prevent 'e' and '-' in numeric input
	 * @param {e} onKeyDown event
	 */
	preventNegativeE(e) {
		if (e.key === "e" || e.key === "-") {
			e.preventDefault();
		}
	}

	/**
	 * Validate start date with end date
	 * @param {event} e onChange event
	 * @returns In case of error in date, show report validity.
	 */
	validateStartDate(e, end_date) {
		e.target.setCustomValidity("");

		if (typeof end_date != "undefined" && e.target.value > end_date) {
			e.target.setCustomValidity(
				"Start date must be sooner than end date."
			);
		}

		return e.target.reportValidity();
	}

	/**
	 * Validate end date with start date
	 * @param {event} e onChange event.
	 * @param {start_date} date Start date to compare with.
	 * @returns In case of error in date, show report validity.
	 */
	validateEndDate(e, start_date) {
		e.target.setCustomValidity("");

		if (typeof start_date != "undefined" && start_date > e.target.value) {
			e.target.setCustomValidity(
				"End date must be later than start date."
			);
		}

		return e.target.reportValidity();
	}

	/**
	 * Create content to render.
	 * @private
	 */
	renderContent() {
		let content;

		content = (
			<SurveysContext.Provider
				value={{
					handleChange: this.handleChange,
					handleAdd: this.handleAdd,
					createSurvey: this.createSurvey,
					updateSurvey: this.updateSurvey,
					deleteSurvey: this.deleteSurvey,
					stratifications: this.state.stratifications,
					maxLengthCheck: this.maxLengthCheck,
					preventNegativeE: this.preventNegativeE,
					validateStartDate: this.validateStartDate,
					validateEndDate: this.validateEndDate,
				}}
			>
				<main>
					<header>
						<h1 className="title">Surveys</h1>
					</header>

					<div className="wrapper surveysWrapper">
						<NewSurvey add={this.state.add} />
						<SurveysButtonBar add={this.state.add} />
						{this.state.surveys.map((survey) => {
							return <Survey key={survey.id} survey={survey} />;
						})}
					</div>
				</main>
			</SurveysContext.Provider>
		);

		return content;
	}

	componentDidMount() {
		this.getStratifications();

		fetch(this.apiSurvey)
			.then((response) => {
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Something went wrong!" };
					});
				}
				return response.json();
			})
			.then((surveys) => {
				this.setState(() => {
					return { surveys };
				});
			})
			.catch((error) => console.log(error));
	}

	render() {
		return this.renderContent();
	}
}

export default Surveys;
