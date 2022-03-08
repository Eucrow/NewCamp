import React, { Component } from "react";

import ViewEditSurveyForm from "./ViewEditSurveyForm";

/**
 * Survey component
 * @param {object} props survey object
 * @param {method} handleEdit method to handle de 'edit' boolean variable.
 */
class EditSurvey extends Component {
	render() {
		return (
			<ViewEditSurveyForm
				props={this.props}
				edit={true}
				handleEdit={this.props.handleEdit}
			/>
		);
	}
}

export default EditSurvey;
