import React, { Component } from "react";

import ViewEditSurveyForm from "./ViewEditSurveyForm";
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
	render() {
		return <ViewEditSurveyForm props={this.props} edit={true} />;
	}
}

export default EditSurvey;
