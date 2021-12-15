import React, { Component } from "react";

import ViewEditSurveyForm from "./ViewEditSurveyForm";
/**
 * Survey component
 * @param {objetc} props.survey: survey object
 * @param {method} changeEdit: to view the fields editable
 */
class ViewSurvey extends Component {
	render() {
		return <ViewEditSurveyForm props={this.props} edit={false} />;
	}
}

export default ViewSurvey;
