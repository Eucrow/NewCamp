import React, { Component } from "react";
/**
 * Component of button to add a new trawl
 * @param {method} props.handleAdd: method to manage the 'add' state.
 */
class UiButtonAddTrawl extends Component {
	render() {
		return (
			<button
				onClick={() => {
					this.props.handleAdd(true);
				}}
			>
				Add Trawl
			</button>
		);
	}
}

export default UiButtonAddTrawl;
