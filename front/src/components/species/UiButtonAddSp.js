import React, { Component } from "react";

import SpeciesContext from "../../contexts/SpeciesContext";
/**
 * Component of button to add a new ship
 */
class UiButtonAddSp extends Component {
	static contextType = SpeciesContext;

	renderContent() {
		var content = null;

		if (this.props.add === false) {
			content = (
				<button
					className="buttonsWrapper__button"
					onClick={() => {
						this.context.handleAdd(true);
					}}
				>
					Add Species
				</button>
			);
		}
		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default UiButtonAddSp;
