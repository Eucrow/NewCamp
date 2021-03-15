import React, { Component } from "react";
/**
 * Component of button to add a new survey
 * @param {method} props.handleEdit: method to manage the 'edit' state.
 */
class UiButtonCancelEditSurvey extends Component {
	render() {
		return (
			<button
				onClick={() => {
					this.props.handleEdit(false);
				}}
			>
				Cancel
			</button>
		);
	}
}

export default UiButtonCancelEditSurvey;
