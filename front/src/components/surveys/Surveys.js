import React, { Component, Fragment } from "react";

import UiButtonAddSurvey from "./UiButtonAddSurvey";
import NewSurveyForm from "./NewSurveyForm";
import Survey from "./Survey";
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
			// edit: null, // null to not edit any survey; survey_id to edit that survey_id.
		};

		this.apiSurvey = "http://127.0.0.1:8000/api/1.0/survey/";
		this.apiStratification =
			"http://127.0.0.1:8000/api/1.0/stratifications/";

		this.handleChange = this.handleChange.bind(this);
		// this.handleEdit = this.handleEdit.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.createSurvey = this.createSurvey.bind(this);
		this.updateSurvey = this.updateSurvey.bind(this);
		this.deleteSurvey = this.deleteSurvey.bind(this);

		this.getStratifications = this.getStratifications.bind(this);

		this.renderContent = this.renderContent.bind(this);
	}

	/**
	 * Manage change in fields
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
	 * Manage change of 'edit' state.
	 * @param {Event} e - Event.
	 * @param {(numeric|null)} status - Identification number of the survey which fields are managed. If 'null', none is edited.
	 */
	// handleEdit(status) {
	// 	this.setState({
	// 		edit: status,
	// 	});
	// }

	/**
	 * Manage change of 'add' state.
	 * @param {boolean} status - Identification number of the survey which fields are managed.
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
				if (response.status == 200) {
					// this.handleEdit(null);
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

	/**
	 * Create content to render.
	 * @private
	 */
	renderContent() {
		let content;

		let contentNewSurvey = this.state.add ? (
			<NewSurveyForm
				stratifications={this.state.stratifications}
				handleChange={this.handleChange}
				handleAdd={this.handleAdd}
				createSurvey={this.createSurvey}
			/>
		) : (
			<div>
				<UiButtonAddSurvey handleAdd={this.handleAdd} />
			</div>
		);

		content = (
			<main>
				<header>
					<h1 className="title">Surveys</h1>
				</header>

				<div className="wrapper surveysWrapper">
					{contentNewSurvey}
					{this.state.surveys.map((survey) => {
						return (
							<Survey
								key={survey.id}
								ref={this.surveyElement}
								survey={survey}
								handleChange={this.handleChange}
								updateSurvey={this.updateSurvey}
								deleteSurvey={this.deleteSurvey}
							/>
						);
					})}
				</div>
			</main>
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
