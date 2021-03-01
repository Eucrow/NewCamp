import React, { Component } from "react";

import ViewGear from "./ViewGear";
import EditGear from "./EditGear";

/**
 * Gear component. Manage component logic.
 * @param {object} props - Gear object
 * @param {method} props.handleChange
 * @param {method} props.handleEdit
 * @param {method} props.updateGear
 * @param {method} props.deleteGear
 */
class Gear extends Component {
	renderContent() {
		let content = "";

		if (this.props.edit == this.props.gear.id) {
			content = (
				<EditGear
					gear={this.props.gear}
					handleEdit={this.props.handleEdit}
					handleChange={this.props.handleChange}
					updateGear={this.props.updateGear}
				/>
			);
		} else {
			content = (
				<ViewGear
					gear={this.props.gear}
					handleEdit={this.props.handleEdit}
					deleteGear={this.props.deleteGear}
				/>
			);
		}

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default Gear;
