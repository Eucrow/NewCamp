import React, { Component } from "react";
/**
 * Component of button to add a new trawl
 * @param {method} props.handleEdit: method to manage the 'edit' state.
 */
class UiButtonCancelEditTrawl extends Component {
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

export default UiButtonCancelEditTrawl;
