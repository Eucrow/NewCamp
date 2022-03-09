import React, { Component } from "react";

import ViewEditSurveyForm from "./ViewEditSurveyForm";

/**
 * Survey component. Manage component logic.
 * @param {object} props survey object
 */
class Survey extends Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
		};

		this.handleEdit = this.handleEdit.bind(this);
	}

	handleEdit(edit) {
		this.setState(() => {
			return {
				edit: edit,
			};
		});
	}

	renderContent() {
		let content = "";

		if (this.state.edit === true) {
			content = (
				<ViewEditSurveyForm
					props={this.props}
					edit={true}
					handleEdit={this.handleEdit}
				/>
			);
		} else {
			content = (
				<ViewEditSurveyForm
					props={this.props}
					edit={false}
					handleEdit={this.handleEdit}
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
