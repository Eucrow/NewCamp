import React, { Component } from "react";

import ViewSurvey from "./ViewSurvey";
import EditSurvey from "./EditSurvey";

/**
 * Survey component. Manage component logic.
 * @param {object} props - Survey object
 */
class Survey extends Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
		};

		this.changeEdit = this.changeEdit.bind(this);
	}

	changeEdit(edit) {
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
				<div className="wrapper">
					<EditSurvey
						survey={this.props.survey}
						changeEdit={this.changeEdit}
					/>
				</div>
			);
		} else {
			content = (
				<div className="wrapper">
					<ViewSurvey
						survey={this.props.survey}
						changeEdit={this.changeEdit}
					/>
				</div>
			);
		}

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default Survey;
