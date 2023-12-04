import React, { useContext } from "react";

import SurveysContext from "../../contexts/SurveysContext";

import SurveyButtonBar from "./SurveyButtonBar";

/**
 * ViewEditSurveyForm component
 * @param {object} survey survey object.
 * @param {boolean} edit variable to indicate if the element is edited or not.
 * @param {method} handleEdit method to handle de 'edit' boolean variable.
 */
const ViewEditSurveyForm = ({ survey, edit, handleEdit }) => {
	const surveysContext = useContext(SurveysContext);
	const is_disabled = edit === true ? false : true;

	const handleSubmit = (e) => {
		surveysContext.updateSurvey(e, survey.id);
		handleEdit(false);
	};

	const renderedSurvey = (
		<form className="wrapper" onSubmit={handleSubmit}>
			<div className="form__row">
				<span className="field">
					<label htmlFor="description">Description:</label>
					<input
						type="text"
						id="description"
						name="description"
						disabled={is_disabled}
						className="survey_description"
						required
						autoFocus
						pattern="^[a-zA-Z0-9\s]{1,30}$"
						value={survey.description || ""}
						onChange={(e) => surveysContext.handleChange(e, survey.id)}
					/>
				</span>
				<span className="field">
					<label htmlFor="acronym">Acronym:</label>
					<input
						type="text"
						id="acronym"
						name="acronym"
						disabled={is_disabled}
						required
						size={3}
						pattern="^[\w\d]{3}$"
						value={survey.acronym || ""}
						onChange={(e) => surveysContext.handleChange(e, survey.id)}
					/>
				</span>
			</div>
			<div className="form__row">
				<span className="field">
					<label htmlFor="start_date">Start date:</label>
					<input
						type="date"
						id="start_date"
						name="start_date"
						disabled={is_disabled}
						value={survey.start_date || ""}
						onChange={(e) => {
							surveysContext.handleChange(e, survey.id);
							surveysContext.validateStartDate(e, survey.end_date);
						}}
					/>
				</span>
				<span className="field">
					<label htmlFor="end_date">End date:</label>
					<input
						type="date"
						id="end_date"
						name="end_date"
						disabled={is_disabled}
						value={survey.end_date || ""}
						onChange={(e) => {
							surveysContext.handleChange(e, survey.id);
							surveysContext.validateEndDate(e, survey.start_date);
						}}
					/>
				</span>
			</div>
			<div className="form__row">
				<span className="field">
					<label htmlFor="ship">Ship:</label>
					<input
						type="text"
						id="ship"
						name="ship"
						disabled={is_disabled}
						value={survey.ship || ""}
						onChange={(e) => surveysContext.handleChange(e, survey.id)}
					/>
				</span>
				<span className="field">
					<label htmlFor="hauls_duration">Hauls duration (minutes):</label>
					<input
						type="number"
						id="hauls_duration"
						name="hauls_duration"
						min="0"
						size={4}
						disabled={is_disabled}
						value={survey.hauls_duration || ""}
						onChange={(e) => surveysContext.handleChange(e, survey.id)}
						onKeyDown={surveysContext.preventNegativeE}
					/>
				</span>
				<span className="field">
					<label htmlFor="stratification">Stratification:</label>
					<select
						id="stratification"
						name="stratification"
						disabled={is_disabled}
						required
						value={survey.stratification || ""}
						onChange={(e) => surveysContext.handleChange(e, survey.id)}
					>
						<option />
						{surveysContext.stratifications.map((st, idx) => {
							return (
								<option value={st.id} key={idx}>
									{st.stratification}
								</option>
							);
						})}
					</select>
				</span>
			</div>
			<fieldset className="wrapper form__row">
				<legend>Grid</legend>
				<span className="field">
					<label htmlFor="width_x">Width (miles):</label>
					<input
						type="number"
						id="width_x"
						name="width_x"
						min="0"
						max="999"
						size={3}
						maxLength={3}
						disabled={is_disabled}
						value={survey.width_x || ""}
						onChange={(e) => surveysContext.handleChange(e, survey.id)}
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
						size={3}
						disabled={is_disabled}
						value={survey.width_y || ""}
						onChange={(e) => surveysContext.handleChange(e, survey.id)}
						onKeyDown={surveysContext.preventNegativeE}
					/>
				</span>
				<span className="field">
					<label htmlFor="origin_x">Origin longitude (degrees):</label>
					<input
						type="number"
						id="origin_x"
						name="origin_x"
						min="-180"
						max="180"
						step={0.001}
						size={8}
						disabled={is_disabled}
						value={survey.origin_x || ""}
						onChange={(e) => surveysContext.handleChange(e, survey.id)}
						onInput={surveysContext.forceReportValidity}
					/>
				</span>
				<span className="field">
					<label htmlFor="origin_y">Origin latitude (degrees):</label>
					<input
						type="number"
						id="origin_y"
						name="origin_y"
						min="-90"
						max="90"
						step={0.001}
						size={7}
						disabled={is_disabled}
						value={survey.origin_y || ""}
						onChange={(e) => surveysContext.handleChange(e, survey.id)}
						onInput={surveysContext.forceReportValidity}
					/>
				</span>
			</fieldset>

			<div className="form__row">
				<span className="field__comment">
					<label htmlFor="comment">Comment:</label>
					<textarea
						id="comment"
						name="comment"
						className="comment"
						rows="2"
						maxLength={1000}
						disabled={is_disabled}
						value={survey.comment || ""}
						onChange={(e) => surveysContext.handleChange(e, survey.id)}
					/>
				</span>
			</div>
			<div className="form__row">
				<SurveyButtonBar
					survey={survey}
					edit={edit}
					handleEdit={handleEdit}
					deleteSurvey={surveysContext.deleteSurvey}
				/>
			</div>
		</form>
	);

	return renderedSurvey;
};

export default ViewEditSurveyForm;
