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

		this.changeEdit = this.changeEdit.bind(this);
	}

	changeEdit(edit) {
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
				<EditShip ship={this.props.ship} changeEdit={this.changeEdit} />
			);
		} else {
			content = (
				<ViewShip ship={this.props.ship} changeEdit={this.changeEdit} />
			);
		}

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default Ship;
