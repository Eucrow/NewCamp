import React, { Component } from "react";
/**
 * Component of button to add a new survey
 * @param {method} props.handleAdd: method to manage the 'add' state.
 */
class UiButtonAddSurvey extends Component {
	render() {
		return (
			<button
				onClick={() => {
					this.props.handleAdd(true);
				}}
			>
				Add Survey
			</button>
		);
	}
}

export default UiButtonAddSurvey;
