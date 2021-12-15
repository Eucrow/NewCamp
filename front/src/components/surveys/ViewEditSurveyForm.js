import React, { useContext } from "react";

import SurveysContext from "../../contexts/SuverysContext";

import SurveyButtonBar from "./SurveyButtonBar";

/**
 * ViewEditSurveyForm component
 * @param {object} props.survey: survey object
 * @param {method} changeEdit: nake fields editable/non editable
 */
const ViewEditSurveyForm = ({ props, edit }) => {
	const surveysContext = useContext(SurveysContext);
	const is_disabled = edit === true ? false : true;

	const renderedSurvey = (
		<form>
			<div className="survey__row">
				<span className="field">
					<label htmlFor="description">description: </label>
					<input
						type="text"
						id="description"
						name="description"
						disabled={is_disabled}
						className="station_number"
						value={props.survey.description || ""}
						onChange={(e) =>
							surveysContext.handleChange(e, props.survey.id)
						}
					/>
				</span>
				<span className="field">
					<label htmlFor="acronym">acronym: </label>
					<input
						type="text"
						id="acronym"
						name="acronym"
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
					<label htmlFor="start_date">start_date: </label>
					<input
						type="text"
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
					<label htmlFor="end_date">end_date: </label>
					<input
						type="text"
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
			<div className="survey__row">
				<span className="field">
					<label htmlFor="width_x">width_x: </label>
					<input
						type="text"
						id="width_x"
						name="width_x"
						disabled={is_disabled}
						value={props.survey.width_x || ""}
						onChange={(e) =>
							surveysContext.handleChange(e, props.survey.id)
						}
					/>
				</span>
				<span className="field">
					<label htmlFor="width_y">width_y: </label>
					<input
						type="text"
						id="width_y"
						name="width_y"
						disabled={is_disabled}
						value={props.survey.width_y || ""}
						onChange={(e) =>
							surveysContext.handleChange(e, props.survey.id)
						}
					/>
				</span>
				<span className="field">
					<label htmlFor="origin_x">origin_x: </label>
					<input
						type="text"
						id="origin_x"
						name="origin_x"
						disabled={is_disabled}
						value={props.survey.origin_x || ""}
						onChange={(e) =>
							surveysContext.handleChange(e, props.survey.id)
						}
					/>
				</span>
				<span className="field">
					<label htmlFor="origin_y">origin_y: </label>
					<input
						type="text"
						id="origin_y"
						name="origin_y"
						disabled={is_disabled}
						value={props.survey.origin_y || ""}
						onChange={(e) =>
							surveysContext.handleChange(e, props.survey.id)
						}
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
						disabled={is_disabled}
						value={props.survey.ship || ""}
						onChange={(e) =>
							surveysContext.handleChange(e, props.survey.id)
						}
					/>
				</span>
				<span className="field">
					<label htmlFor="hauls_duration">hauls_duration: </label>
					<input
						type="text"
						id="hauls_duration"
						name="hauls_duration"
						disabled={is_disabled}
						value={props.survey.hauls_duration || ""}
						onChange={(e) =>
							surveysContext.handleChange(e, props.survey.id)
						}
					/>
				</span>
				<span className="field">
					<label htmlFor="unit_sample">unit_sample: </label>
					<input
						type="text"
						id="unit_sample"
						name="unit_sample"
						disabled={is_disabled}
						value={props.survey.unit_sample || ""}
						onChange={(e) =>
							surveysContext.handleChange(e, props.survey.id)
						}
					/>
				</span>
				<span className="field">
					<label htmlFor="stratification_id">
						stratification_id:
					</label>
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
				<label htmlFor="comment">comment: </label>
				<input
					type="text"
					id="comment"
					name="comment"
					disabled={is_disabled}
					value={props.survey.comment || ""}
					onChange={(e) =>
						surveysContext.handleChange(e, props.survey.id)
					}
				/>
			</div>
			<div className="survey__row">
				<div className="survey__cell survey__cell--right">
					<SurveyButtonBar props={props} edit={edit} />
				</div>
			</div>
		</form>
	);

	return renderedSurvey;
};

export default ViewEditSurveyForm;
