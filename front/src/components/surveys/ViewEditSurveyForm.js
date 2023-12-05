import React, { useContext, useRef } from "react";

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
	const inputRef = useRef();

	const handleSubmit = (e) => {
		surveysContext.updateSurvey(e, survey.id);
		handleEdit(false);
		// 3. Here we blur the input field, which is no longer focused.
		if (inputRef.current) {
			inputRef.current.blur();
		}
	};

	// 1. This callback is called to set focus and select content of the input field.
	const callbackRef = (element) => {
		if (element) {
			element.focus();
			element.select();
			// 2. Here we create a ref to the input field, which is focused and selected.
			inputRef.current = element;
		}
	};

	const renderedSurvey = (
		<form className="wrapper form__row form__wide" onSubmit={handleSubmit}>
			<div className="form__row">
				<label className="form__cell">
					Description:
					<input
						type="text"
						id="description"
						name="description"
						disabled={is_disabled}
						required
						pattern="^[a-zA-Z0-9\s]{1,30}$"
						value={survey.description || ""}
						onChange={(e) => surveysContext.handleChange(e, survey.id)}
						ref={callbackRef}
					/>
				</label>
				<label className="form__cell">
					Acronym:
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
				</label>
			</div>
			<div className="form__row">
				<label className="form__cell">
					Start date:
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
				</label>
				<label className="form__cell">
					End date:
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
				</label>
			</div>
			<div className="form__row">
				<label className="form__cell">
					Ship:
					<input
						type="text"
						id="ship"
						name="ship"
						disabled={is_disabled}
						value={survey.ship || ""}
						onChange={(e) => surveysContext.handleChange(e, survey.id)}
					/>
				</label>
				<label className="form__cell">
					Hauls duration (minutes):
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
				</label>
				<label className="form__cell">
					Stratification:
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
				</label>
			</div>
			<fieldset className="wrapper form__row">
				<legend>Grid</legend>
				<label className="form__cell">
					Width (miles):
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
				</label>
				<label className="form__cell">
					Height (miles):
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
				</label>
				<label className="form__cell">
					Origin longitude (degrees):
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
				</label>
				<label className="form__cell">
					Origin latitude (degrees):
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
				</label>
			</fieldset>

			<div className="form__row">
				<label className="form__cell">
					Comment:
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
				</label>
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
