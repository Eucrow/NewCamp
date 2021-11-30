import React from "react";

import SurveyButtonBar from "./SurveyButtonBar";
// import UiButtonUpdateSurvey from "./UiButtonUpdateSurvey";
// import UiButtonDeleteSurvey from "./UiButtonDeleteSurvey";

const SurveyForm = ({ props, edit }) => {
	const is_disabled = edit === true ? false : true;

	const renderedStation = (
		<form
		// onSubmit={(e) => {
		// 	props.updateSurvey(e, props.survey.id);
		// }}
		>
			<div className="survey__row">
				<label htmlFor="description">description: </label>
				<input
					type="text"
					id="description"
					name="description"
					disabled={is_disabled}
					className="station_number"
					value={props.survey.description || ""}
					onChange={(e) => props.handleChange(e, props.survey.id)}
				/>
				<label htmlFor="acronym">acronym: </label>
				<input
					type="text"
					id="acronym"
					name="acronym"
					disabled={is_disabled}
					value={props.survey.acronym || ""}
					onChange={(e) => props.handleChange(e, props.survey.id)}
				/>
			</div>
			<div className="survey__row">
				<label htmlFor="start_date">start_date: </label>
				<input
					type="text"
					id="start_date"
					name="start_date"
					disabled={is_disabled}
					value={props.survey.start_date || ""}
					onChange={(e) => props.handleChange(e, props.survey.id)}
				/>
				<label htmlFor="end_date">end_date: </label>
				<input
					type="text"
					id="end_date"
					name="end_date"
					disabled={is_disabled}
					value={props.survey.end_date || ""}
					onChange={(e) => props.handleChange(e, props.survey.id)}
				/>
			</div>
			<div className="survey__row">
				<label htmlFor="width_x">width_x: </label>
				<input
					type="text"
					id="width_x"
					name="width_x"
					disabled={is_disabled}
					value={props.survey.width_x || ""}
					onChange={(e) => props.handleChange(e, props.survey.id)}
				/>
				<label htmlFor="width_y">width_y: </label>
				<input
					type="text"
					id="width_y"
					name="width_y"
					disabled={is_disabled}
					value={props.survey.width_y || ""}
					onChange={(e) => props.handleChange(e, props.survey.id)}
				/>
				<label htmlFor="origin_x">origin_x: </label>
				<input
					type="text"
					id="origin_x"
					name="origin_x"
					disabled={is_disabled}
					value={props.survey.origin_x || ""}
					onChange={(e) => props.handleChange(e, props.survey.id)}
				/>
				<label htmlFor="origin_y">origin_y: </label>
				<input
					type="text"
					id="origin_y"
					name="origin_y"
					disabled={is_disabled}
					value={props.survey.origin_y || ""}
					onChange={(e) => props.handleChange(e, props.survey.id)}
				/>
			</div>
			<div className="survey__row">
				<label htmlFor="ship">ship: </label>
				<input
					type="text"
					id="ship"
					name="ship"
					disabled={is_disabled}
					value={props.survey.ship || ""}
					onChange={(e) => props.handleChange(e, props.survey.id)}
				/>
				<label htmlFor="hauls_duration">hauls_duration: </label>
				<input
					type="text"
					id="hauls_duration"
					name="hauls_duration"
					disabled={is_disabled}
					value={props.survey.hauls_duration || ""}
					onChange={(e) => props.handleChange(e, props.survey.id)}
				/>
				<label htmlFor="unit_sample">unit_sample: </label>
				<input
					type="text"
					id="unit_sample"
					name="unit_sample"
					disabled={is_disabled}
					value={props.survey.unit_sample || ""}
					onChange={(e) => props.handleChange(e, props.survey.id)}
				/>
				<label htmlFor="stratification_id">
					stratification_id: PENDIENTE
				</label>
				{/* <input
					type="text"
					id="stratification_id"
					name="stratification_id"
					disabled={is_disabled}
					value={props.survey.stratification_id || ""}
				/> */}
			</div>
			<div className="survey__row">
				<label htmlFor="comment">comment: </label>
				<input
					type="text"
					id="comment"
					name="comment"
					disabled={is_disabled}
					value={props.survey.comment || ""}
					onChange={(e) => props.handleChange(e, props.survey.id)}
				/>
			</div>
			<div className="survey__row">
				<div className="survey__cell survey__cell--right">
					<SurveyButtonBar props={props} edit={edit} />
				</div>
			</div>
			{/* <input type="submit" value="Save" /> */}
			{/* <UiButtonCancelEditSurvey handleEdit={props.handleEdit} /> */}
		</form>
	);

	return renderedStation;
};

export default SurveyForm;
