import React, { useEffect, useState } from "react";

import SurveysContext from "../../contexts/SurveysContext";

import SurveysButtonBar from "./SurveysButtonBar";
import Survey from "./Survey";
import NewSurveyForm from "./NewSurveyForm";

/**
 * Component list of surveys.
 * List of all the surveys stored in database.
 */
const Surveys = () => {
	const [surveys, setSurveys] = useState([]);
	const [surveysBackup, setSurveysBackup] = useState([]);
	const [stratifications, setStratifications] = useState([]);
	const [add, setAdd] = useState(false);

	const apiSurvey = "http://127.0.0.1:8000/api/1.0/survey/";
	const apiStratification = "http://127.0.0.1:8000/api/1.0/stratifications/";

	/**
	 * Manage change in fields of a previous created survey.
	 * @param {event} e - Event.
	 * @param {numeric} surveyId - Identification number of the survey which fields are managed.
	 */
	const handleChange = (e, surveyId) => {
		const name = e.target.name;
		const value = e.target.value;

		e.preventDefault();
		const newSurveys = surveys.map((survey) => {
			if (survey.id === surveyId) {
				let newSurvey = { ...survey };
				newSurvey[name] = value;
				return newSurvey;
			} else {
				return survey;
			}
		});

		setSurveys(newSurveys);
	};

	/**
	 * Get all surveys from database.
	 */
	const getSurveys = () => {
		fetch(apiSurvey)
			.then((response) => {
				if (response.status > 400) {
					alert("something were wrong getting the surveys!!");
				}
				return response.json();
			})
			.then((surveys) => {
				setSurveys(surveys);
				setSurveysBackup(surveys);
			})
			.catch((error) => console.log(error));
	};

	/**
	 * Create survey in database and update the state.
	 * @param {event} e - Event
	 * @param {object} survey - Survey object to create.
	 */
	const createSurvey = (e, survey) => {
		e.preventDefault();

		fetch(apiSurvey, {
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
				const newSurveys = [...surveys, survey];

				setSurveys(newSurveys);
			})
			.catch((error) => alert(error));
	};

	/**
	 * Update survey from database and state.
	 * @param {event} e - Event.
	 * @param {numeric} surveyId - Survey identificator of survey to update.
	 */
	const updateSurvey = (e, surveyId) => {
		e.preventDefault();
		const api = apiSurvey + surveyId;

		const updatedSurvey = surveys.filter((survey) => {
			return survey.id === surveyId;
		});

		fetch(api, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedSurvey[0]),
		})
			.then((response) => {
				if (response.status > 400) {
					alert("something were wrong updating the survey!!");
				}
				return response.json();
			})
			.catch((error) => console.log(error));
	};

	/**
	 * Restores the survey to its original state.
	 * @param {number} surveyId - The ID of the haul to be restored.
	 */

	const handleCancelEditSurvey = (e) => {
		setSurveys(surveysBackup);
	};

	/**
	 * Delete survey from database and state.
	 * @param {event} e Event.
	 * @param {numeric} surveyId Survey identificator of survey to delete.
	 */
	const deleteSurvey = (surveyId) => {
		const api = apiSurvey + surveyId;

		fetch(api, {
			method: "DELETE",
			headers: {
				"Content-type": "Application/json",
				Accept: "Application/json",
			},
		})
			.then(() => {
				const newSurveys = surveys.filter((survey) => survey.id !== surveyId);
				setSurveys(newSurveys);
			})
			.catch((error) => alert(error));
	};

	/**
	 * Get all stratifications.
	 */
	const getStratifications = () => {
		return fetch(apiStratification)
			.then((response) => {
				if (response.status > 400) {
					alert("something were wrong getting the stratifications!!");
				}
				return response.json();
			})
			.then((stratifications) => {
				setStratifications(stratifications);
			})
			.catch((error) => console.log(error));
	};

	// VALIDATIONS
	/**
	 * Prevent 'e' and '-' in numeric input
	 * @param {e} onKeyDown event
	 */
	const preventNegativeE = (e) => {
		if (e.key === "e" || e.key === "-") {
			e.preventDefault();
		}
	};

	/**
	 * Validate start date with end date
	 * @param {event} e onChange event
	 * @returns In case of error in date, show report validity.
	 */
	const validateStartDate = (e, end_date) => {
		e.target.setCustomValidity("");

		if (typeof end_date != "undefined" && e.target.value > end_date) {
			e.target.setCustomValidity("Start date must be sooner than end date.");
		}

		return e.target.reportValidity();
	};

	/**
	 * Validate end date with start date
	 * @param {event} e onChange event.
	 * @param {start_date} date Start date to compare with.
	 * @returns In case of error in date, show report validity.
	 */
	const validateEndDate = (e, start_date) => {
		e.target.setCustomValidity("");

		if (typeof start_date != "undefined" && start_date > e.target.value) {
			e.target.setCustomValidity("End date must be later than start date.");
		}

		return e.target.reportValidity();
	};

	/**
	 * Force reportValidity() of an element.
	 * Used with onInput event to show the validation messages in real time instead of show it when the form is submitted.
	 * @param {e} e onInput event.
	 */
	const forceReportValidity = (e) => {
		e.target.reportValidity();
	};

	useEffect(() => {
		getStratifications();
		getSurveys();
	}, []);

	/**
	 * Create content to render.
	 * @private
	 */
	const renderContent = () => {
		let content;

		content = (
			<SurveysContext.Provider
				value={{
					handleChange: handleChange,
					setAdd: setAdd,
					createSurvey: createSurvey,
					updateSurvey: updateSurvey,
					deleteSurvey: deleteSurvey,
					stratifications: stratifications,
					preventNegativeE: preventNegativeE,
					validateStartDate: validateStartDate,
					validateEndDate: validateEndDate,
					forceReportValidity: forceReportValidity,
					handleCancelEditSurvey: handleCancelEditSurvey,
				}}
			>
				<main>
					<header>
						<h1 className="title">Surveys</h1>
					</header>

					<div className="wrapper surveysWrapper">
						<SurveysButtonBar add={add} handleAdd={setAdd} />
						{add === true ? <NewSurveyForm /> : ""}

						{surveys.map((survey) => {
							return <Survey key={survey.id} survey={survey} />;
						})}
					</div>
				</main>
			</SurveysContext.Provider>
		);

		return content;
	};

	return renderContent();
};

export default Surveys;
