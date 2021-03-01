import React, { Component } from "react";
/**
 * Component of button to add a new trawl
 * @param {number} props.trawl_id: id of the trawl.
 * @param {method} props.handleEdit: method to manage the 'edit' state.
 */
class UiButtonUpdateTrawl extends Component {
	render() {
		return (
			<button
				onClick={() => {
					this.props.handleEdit(this.props.trawl_id);
				}}
			>
				Edit
			</button>
		);
	}
}

export default UiButtonUpdateTrawl;
