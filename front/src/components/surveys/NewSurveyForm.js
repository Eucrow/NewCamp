import React, { useState, useContext } from "react";

import SurveysContext from "../../contexts/SuverysContext";

import UiButtonCancelEditSurvey from "./UiButtonCancelEditSurvey";
import UiButtonSaveNewSurvey from "./UiButtonSaveNewSurvey";

/**
 * Survey component
 */
const NewSurveyForm = () => {
	const surveysContext = useContext(SurveysContext);

	const [survey, setSurvey] = useState({});

	const formRef = React.createRef();

	/**
	 * Manage the onSubmit event.
	 * @param {event} e - onSubmit event.
	 */
	const handleSubmit = (e) => {
		surveysContext.createSurvey(e, survey);
		surveysContext.handleAdd(false);
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

	const renderContent = () => {
		var content = "";

		content = (
			<form className="wrapper" ref={formRef} onSubmit={handleSubmit}>
				<div className="survey__row">
					<span className="field">
						<label htmlFor="description">Description:</label>
						<input
							type="text"
							id="description"
							name="description"
							className="survey_description"
							required
							autoFocus
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
								surveysContext.validateStartDate(
									e,
									survey.end_date
								);
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
								surveysContext.validateEndDate(
									e,
									survey.start_date
								);
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
							onKeyDown={surveysContext.preventNegativeE}
						/>
					</span>
					<span className="field">
						<label htmlFor="stratification">Stratification:</label>
						<select
							id="stratification"
							name="stratification"
							required
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
							onKeyDown={surveysContext.preventNegativeE}
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
							onKeyDown={surveysContext.preventNegativeE}
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
							step={0.001}
							onChange={handleChangeNew}
							onInput={surveysContext.forceReportValidity}
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
							step={0.001}
							onChange={handleChangeNew}
							onInput={surveysContext.forceReportValidity}
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
							onKeyDown={surveysContext.preventNegativeE}
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
						<UiButtonSaveNewSurvey survey={survey} />
						<UiButtonCancelEditSurvey />
					</div>
				</div>
			</form>
		);

		return content;
	};

	return renderContent();
};

export default NewSurveyForm;
