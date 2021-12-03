import React, { Component } from "react";
/**
 * Component of button to add a new survey
 * @param {method} props.handleAdd: method to manage the 'add' state.
 * FALTA
 */
class UiButtonSaveNewSurvey extends Component {
	render() {
		return (
			<button
				className="buttonsWrapper__button"
				onClick={(e) => {
					this.props.createSurvey(e, this.props.survey);
					this.props.handleAdd(false);
				}}
			>
				Save Survey
			</button>
		);
	}
}

export default UiButtonSaveNewSurvey;
