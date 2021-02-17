import React, { Component } from "react";

import ViewShip from "./ViewShip";
import EditShip from "./EditShip";

class Ship extends Component {
	/**
	 * Ship component. Manage component logic.
	 * @param {object} props: ship object
	 * @param {method} props.handleChange:
	 * @param {method} props.updateShip:
	 * @param {method} props.deleteShip:
	 */

	constructor(props) {
		super(props);
		this.state = {
			edit: false,
		};

		this.handleEdit = this.handleEdit.bind(this);
	}

	handleEdit(edit) {
		this.setState(() => {
			return {
				edit: edit,
			};
		});
	}

	renderContent() {
		let content = "";

		if (this.state.edit === false) {
			content = (
				<ViewShip ship={this.props.ship} handleEdit={this.handleEdit} deleteShip={this.props.deleteShip} />
			);
		} else if (this.state.edit === true) {
			content = (
				<EditShip
					ship={this.props.ship}
					handleEdit={this.handleEdit}
					handleChange={this.props.handleChange}
					updateShip={this.props.updateShip}
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
