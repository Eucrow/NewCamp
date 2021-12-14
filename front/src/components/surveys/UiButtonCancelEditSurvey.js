import React, { Component } from "react";
/**
 * Component of button to add a new survey
 * @param {method} props.handleAdd: method to manage the 'add' state.
 */
class UiButtonCancelEditSurvey extends Component {
	render() {
		return (
			<button
				className="buttonsWrapper__button"
				onClick={() => {
					this.props.handleAdd(false);
				}}
			>
				Cancel
			</button>
		);
	}
}

export default UiButtonCancelEditSurvey;
