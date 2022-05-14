import React, { useState, useContext } from "react";

import SurveysContext from "../../contexts/SuverysContext";

import UiButtonSave from "../ui/UiButtonSave";
import UiButtonCancel from "../ui/UiButtonCancel";

/**
 * Survey component
 */
const NewSurveyForm = () => {
	const surveysContext = useContext(SurveysContext);

	const [survey, setSurvey] = useState({});

	const formRef = React.createRef();

	/**
	 * Manage fields change in 'survey' state.
	 * This method is diferent to handleChange os Surveys component.
	 * @param {event} e - Event.
	 */
	const handleChange = (e) => {
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
	 * Manage the onSubmit event.
	 * @param {event} e - onSubmit event.
	 */
	const handleSubmit = (e) => {
		surveysContext.createSurvey(e, survey);
		surveysContext.handleAdd(false);
	};

	const renderContent = () => {
		const content = (
			<form className="wrapper" ref={formRef} onSubmit={handleSubmit}>
				<div className="form__row">
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
							onChange={handleChange}
						/>
					</span>
					<span className="field">
						<label htmlFor="acronym">Acronym:</label>
						<input
							type="text"
							id="acronym"
							name="acronym"
							required
							size={3}
							pattern="^[\w|\d]{3}$"
							onChange={handleChange}
							onInput={surveysContext.forceReportValidity}
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
							onChange={(e) => {
								handleChange(e);
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
								handleChange(e);
								surveysContext.validateEndDate(
									e,
									survey.start_date
								);
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
							onChange={handleChange}
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
							size={4}
							onChange={handleChange}
							onKeyDown={surveysContext.preventNegativeE}
						/>
					</span>
					<span className="field">
						<label htmlFor="stratification">Stratification:</label>
						<select
							id="stratification"
							name="stratification"
							required
							onChange={handleChange}
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
							onChange={handleChange}
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
							size={3}
							maxLength={3}
							onChange={handleChange}
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
							size={8}
							step={0.001}
							onChange={handleChange}
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
							size={7}
							step={0.001}
							onChange={handleChange}
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
							onChange={handleChange}
						/>
					</span>
				</div>
				<div className="form__row">
					<div className="survey__cell survey__cell--right buttonsWrapper">
						<UiButtonSave buttonText={"Save Survey"} />
						<UiButtonCancel
							handleMethod={surveysContext.handleAdd}
						/>
					</div>
				</div>
			</form>
		);

		return content;
	};

	return renderContent();
};

export default NewSurveyForm;
