import React, { Component } from "react";

// import UiButtonUpdateSurvey from "./UiButtonUpdateSurvey";
// import UiButtonDeleteSurvey from "./UiButtonDeleteSurvey";

import ViewEditSurveyForm from "./ViewEditSurveyForm";
/**
 * Survey component
 * @param {objetc} props.survey: survey object
 * @param {method} changeEdit: to view the fields editable
 * @param {method} props.handleEdit:
 * @param {method} props.deleteSurvey:
 */
class ViewSurvey extends Component {
	render() {
		return <ViewEditSurveyForm props={this.props} edit={false} />;
	}
}

export default ViewSurvey;
