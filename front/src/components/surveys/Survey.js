import React, { Component } from "react";

import ViewSurvey from "./ViewSurvey";
import EditSurvey from "./EditSurvey";

/**
 * Survey component. Manage component logic.
 * @param {object} props - Survey object
 * @param {method} props.handleChange
 * @param {method} props.handleEdit
 * @param {method} props.updateSurvey
 * @param {method} props.deleteSurvey
 */
class Survey extends Component {
	renderContent() {
		let content = "";

		if (this.props.edit == this.props.survey.id) {
			content = (
				<EditSurvey
					survey={this.props.survey}
					handleEdit={this.props.handleEdit}
					handleChange={this.props.handleChange}
					updateSurvey={this.props.updateSurvey}
				/>
			);
		} else {
			content = (
				<ViewSurvey
					survey={this.props.survey}
					handleEdit={this.props.handleEdit}
					deleteSurvey={this.props.deleteSurvey}
				/>
			);
		}

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default Survey;
