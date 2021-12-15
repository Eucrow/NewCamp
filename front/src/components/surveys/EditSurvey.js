import React, { Component } from "react";

import ViewEditSurveyForm from "./ViewEditSurveyForm";

/**
 * Survey component
 * @param {object} props.survey - survey object
 * @param {method} changeEdit: to view the fields editable
 */
class EditSurvey extends Component {
	render() {
		return <ViewEditSurveyForm props={this.props} edit={true} />;
	}
}

export default EditSurvey;
