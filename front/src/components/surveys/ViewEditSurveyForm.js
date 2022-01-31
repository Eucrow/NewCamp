import React, { useContext } from "react";

import SurveysContext from "../../contexts/SuverysContext";

import SurveyButtonBar from "./SurveyButtonBar";

/**
 * ViewEditSurveyForm component
 * @param {object} props.survey: survey object
 * @param {method} changeEdit: make fields editable/non editable
 */
const ViewEditSurveyForm = ({ props, edit }) => {
	const surveysContext = useContext(SurveysContext);
	const is_disabled = edit === true ? false : true;

	const renderedSurvey = (
		<form className="wrapper">
			<div className="survey__row">
				<span className="field">
					<label htmlFor="description">Description:</label>
					<input
						type="text"
						id="description"
						name="description"
						disabled={is_disabled}
						className="survey_description"
						required
						value={props.survey.description || ""}
						onChange={(e) =>
							surveysContext.handleChange(e, props.survey.id)
						}
					/>
				</span>
				<span className="field">
					<label htmlFor="acronym">Acronym:</label>
					<input
						type="text"
						id="acronym"
						name="acronym"
						required
						disabled={is_disabled}
						value={props.survey.acronym || ""}
						onChange={(e) =>
							surveysContext.handleChange(e, props.survey.id)
						}
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
						disabled={is_disabled}
						value={props.survey.start_date || ""}
						onChange={(e) =>
							surveysContext.handleChange(e, props.survey.id)
						}
					/>
				</span>
				<span className="field">
					<label htmlFor="end_date">End date:</label>
					<input
						type="date"
						id="end_date"
						name="end_date"
						disabled={is_disabled}
						value={props.survey.end_date || ""}
						onChange={(e) =>
							surveysContext.handleChange(e, props.survey.id)
						}
					/>
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
						disabled={is_disabled}
						value={props.survey.width_x || ""}
						onChange={(e) =>
							surveysContext.handleChange(e, props.survey.id)
						}
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
						disabled={is_disabled}
						value={props.survey.width_y || ""}
						onChange={(e) =>
							surveysContext.handleChange(e, props.survey.id)
						}
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
						disabled={is_disabled}
						value={props.survey.origin_x || ""}
						onChange={(e) =>
							surveysContext.handleChange(e, props.survey.id)
						}
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
						maxLength={6}
						disabled={is_disabled}
						value={props.survey.origin_y || ""}
						onChange={(e) =>
							surveysContext.handleChange(e, props.survey.id)
						}
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
						disabled={is_disabled}
						value={props.survey.unit_sample || ""}
						onChange={(e) =>
							surveysContext.handleChange(e, props.survey.id)
						}
					/>
				</span>
			</fieldset>
			<div className="survey__row">
				<span className="field">
					<label htmlFor="ship">Ship:</label>
					<input
						type="text"
						id="ship"
						name="ship"
						disabled={is_disabled}
						value={props.survey.ship || ""}
						onChange={(e) =>
							surveysContext.handleChange(e, props.survey.id)
						}
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
						disabled={is_disabled}
						value={props.survey.hauls_duration || ""}
						onChange={(e) =>
							surveysContext.handleChange(e, props.survey.id)
						}
					/>
				</span>
				<span className="field">
					<label htmlFor="stratification_id">Stratification:</label>
					<input
						type="text"
						id="stratification_id"
						name="stratification_id"
						disabled={is_disabled}
						value={props.survey.stratification || ""}
					/>
				</span>
			</div>
			<div className="survey__row">
				<label htmlFor="comment">Comment:</label>
				<input
					type="text"
					id="comment"
					name="comment"
					className="comment"
					disabled={is_disabled}
					value={props.survey.comment || ""}
					onChange={(e) =>
						surveysContext.handleChange(e, props.survey.id)
					}
				/>
			</div>
			<div className="survey__row">
				<SurveyButtonBar props={props} edit={edit} />
			</div>
		</form>
	);

	return renderedSurvey;
};

export default ViewEditSurveyForm;
