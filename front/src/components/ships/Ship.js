import React, { Component } from "react";

import ViewShip from "./ViewShip";
import EditShip from "./EditShip";

/**
 * Ship component. Manage component logic.
 * @param {object} props - Ship object
 */
class Ship extends Component {
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

		if (this.state.edit === true) {
			content = (
				<EditShip ship={this.props.ship} handleEdit={this.handleEdit} />
			);
		} else {
			content = (
				<ViewShip ship={this.props.ship} handleEdit={this.handleEdit} />
			);
		}

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default Ship;
