import React, { Component } from "react";

import UiButtonAddSurvey from "./UiButtonAddSurvey";
import NewSurvey from "./NewSurvey";
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
			add: false, // true to add new survey; false to not to.
			edit: null, // null to not edit any survey; survey_id to edit that survey_id.
		};

		this.apiSurvey = "http://127.0.0.1:8000/api/1.0/survey/";

		this.handleChange = this.handleChange.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.createSurvey = this.createSurvey.bind(this);
		this.updateSurvey = this.updateSurvey.bind(this);
		this.deleteSurvey = this.deleteSurvey.bind(this);
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
	handleEdit(status) {
		this.setState({
			edit: status,
		});
	}

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
					this.handleEdit(null);
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
	 * Create content to render.
	 * @private
	 */
	renderContent() {
		let content = "";

		if (this.state.add === false) {
			content = (
				<div>
					<UiButtonAddSurvey handleAdd={this.handleAdd} />
					{this.state.surveys.map((survey) => {
						return (
							<Survey
								key={survey.id}
								survey={survey}
								edit={this.state.edit}
								handleEdit={this.handleEdit}
								handleChange={this.handleChange}
								updateSurvey={this.updateSurvey}
								deleteSurvey={this.deleteSurvey}
							/>
						);
					})}
				</div>
			);
		} else if (this.state.add === true) {
			content = (
				<div>
					<NewSurvey
						handleChange={this.handleChange}
						handleAdd={this.handleAdd}
						createSurvey={this.createSurvey}
					/>
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
			);
		}

		return content;
	}

	componentDidMount() {
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
