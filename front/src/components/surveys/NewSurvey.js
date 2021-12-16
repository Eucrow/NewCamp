import React, { Component } from "react";

import NewSurveyForm from "./NewSurveyForm";

/**
 * New survey component.
 * @param {boolean} add to show or hide the NewSurvey form.
 */
class NewSurvey extends Component {
	render() {
		let content = null;

		if (this.props.add === true) {
			content = (
				<div className="wrapper">
					<NewSurveyForm />
				</div>
			);
		}

		return content;
	}
}

export default NewSurvey;
