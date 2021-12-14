import React, { Component } from "react";

import SurveyForm from "./SurveyForm";
// import UiButtonCancelEditSurvey from "./UiButtonCancelEditSurvey";

/**
 * Survey component
 * @param {object} props.survey - survey object
 * @param {method} changeEdit: to view the fields editable
 * @param {method} props.handleChange
 * @param {method} props.handleEdit
 * @param {method} props.updateSurvey
 */
class EditSurvey extends Component {
	// renderContent() {
	// 	var content = "";

	// 	content = (
	// 		<form
	// 			onSubmit={(e) => {
	// 				this.props.updateSurvey(e, this.props.survey.id);
	// 			}}
	// 		>
	// 			<label htmlFor="start_date">acronym: </label>
	// 			<input
	// 				type="text"
	// 				id="acronym"
	// 				name="acronym"
	// 				value={this.props.survey.acronym || ""}
	// 				onChange={(e) =>
	// 					this.props.handleChange(e, this.props.survey.id)
	// 				}
	// 			/>
	// 			<label htmlFor="start_date">description: </label>
	// 			<input
	// 				type="text"
	// 				id="description"
	// 				name="description"
	// 				value={this.props.survey.description || ""}
	// 				onChange={(e) =>
	// 					this.props.handleChange(e, this.props.survey.id)
	// 				}
	// 			/>
	// 			<label htmlFor="start_date">start_date: </label>
	// 			<input
	// 				type="text"
	// 				id="start_date"
	// 				name="start_date"
	// 				value={this.props.survey.start_date || ""}
	// 				onChange={(e) =>
	// 					this.props.handleChange(e, this.props.survey.id)
	// 				}
	// 			/>
	// 			<label htmlFor="end_date">end_date: </label>
	// 			<input
	// 				type="text"
	// 				id="end_date"
	// 				name="end_date"
	// 				value={this.props.survey.end_date || ""}
	// 				onChange={(e) =>
	// 					this.props.handleChange(e, this.props.survey.id)
	// 				}
	// 			/>
	// 			<label htmlFor="width_x">width_x: </label>
	// 			<input
	// 				type="text"
	// 				id="width_x"
	// 				name="width_x"
	// 				value={this.props.survey.width_x || ""}
	// 				onChange={(e) =>
	// 					this.props.handleChange(e, this.props.survey.id)
	// 				}
	// 			/>
	// 			<label htmlFor="width_y">width_y: </label>
	// 			<input
	// 				type="text"
	// 				id="width_y"
	// 				name="width_y"
	// 				value={this.props.survey.width_y || ""}
	// 				onChange={(e) =>
	// 					this.props.handleChange(e, this.props.survey.id)
	// 				}
	// 			/>
	// 			<label htmlFor="origin_x">origin_x: </label>
	// 			<input
	// 				type="text"
	// 				id="origin_x"
	// 				name="origin_x"
	// 				value={this.props.survey.origin_x || ""}
	// 				onChange={(e) =>
	// 					this.props.handleChange(e, this.props.survey.id)
	// 				}
	// 			/>
	// 			<label htmlFor="origin_y">origin_y: </label>
	// 			<input
	// 				type="text"
	// 				id="origin_y"
	// 				name="origin_y"
	// 				value={this.props.survey.origin_y || ""}
	// 				onChange={(e) =>
	// 					this.props.handleChange(e, this.props.survey.id)
	// 				}
	// 			/>
	// 			<label htmlFor="ship">ship: </label>
	// 			<input
	// 				type="text"
	// 				id="ship"
	// 				name="ship"
	// 				value={this.props.survey.ship || ""}
	// 				onChange={(e) =>
	// 					this.props.handleChange(e, this.props.survey.id)
	// 				}
	// 			/>
	// 			<label htmlFor="hauls_duration">hauls_duration: </label>
	// 			<input
	// 				type="text"
	// 				id="hauls_duration"
	// 				name="hauls_duration"
	// 				value={this.props.survey.hauls_duration || ""}
	// 				onChange={(e) =>
	// 					this.props.handleChange(e, this.props.survey.id)
	// 				}
	// 			/>
	// 			<label htmlFor="unit_sample">unit_sample: </label>
	// 			<input
	// 				type="text"
	// 				id="unit_sample"
	// 				name="unit_sample"
	// 				value={this.props.survey.unit_sample || ""}
	// 				onChange={(e) =>
	// 					this.props.handleChange(e, this.props.survey.id)
	// 				}
	// 			/>
	// 			<label htmlFor="comment">comment: </label>
	// 			<input
	// 				type="text"
	// 				id="comment"
	// 				name="comment"
	// 				value={this.props.survey.comment || ""}
	// 				onChange={(e) =>
	// 					this.props.handleChange(e, this.props.survey.id)
	// 				}
	// 			/>
	// 			<label htmlFor="stratification_id">stratification_id: </label>
	// 			<input
	// 				type="text"
	// 				id="stratification_id"
	// 				name="stratification_id"
	// 				value={this.props.survey.stratification_id || ""}
	// 			/>
	// 			<input type="submit" value="Save" />
	// 			<UiButtonCancelEditSurvey handleEdit={this.props.handleEdit} />
	// 		</form>
	// 	);

	// 	return content;
	// }

	// render() {
	// 	return this.renderContent();
	// }

	render() {
		return <SurveyForm props={this.props} edit={true} />;
	}
}

export default EditSurvey;
