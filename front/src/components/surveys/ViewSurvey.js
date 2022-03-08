import React, { Component } from "react";

import ViewEditSurveyForm from "./ViewEditSurveyForm";
/**
 * Survey component
 * @param {object} props survey object.
 * @param {boolean} edit variable to indicate if the element is edited or not.
 * @param {method} handleEdit method to handle de 'edit' boolean variable.
 */
class ViewSurvey extends Component {
	render() {
		return (
			<ViewEditSurveyForm
				props={this.props}
				edit={false}
				handleEdit={this.props.handleEdit}
			/>
		);
	}
}

export default ViewSurvey;
