import React, { Component } from "react";

import ViewShip from "./ViewShip";
import EditShip from "./EditShip";

/**
 * Ship component. Manage component logic.
 * @param {object} props - Ship object
 * @param {method} props.handleChange
 * @param {method} props.handleEdit
 * @param {method} props.updateShip
 * @param {method} props.deleteShip
 */
class Ship extends Component {
	renderContent() {
		let content = "";

		if (this.props.edit == this.props.ship.id) {
			content = (
				<EditShip
					ship={this.props.ship}
					handleEdit={this.props.handleEdit}
					handleChange={this.props.handleChange}
					updateShip={this.props.updateShip}
				/>
			);
		} else {
			content = (
				<ViewShip
					ship={this.props.ship}
					handleEdit={this.props.handleEdit}
					deleteShip={this.props.deleteShip}
				/>
			);
		}

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default Ship;
