import React, { Component } from "react";

import ViewEditShipForm from "./ViewEditShipForm";

/**
 * Ship component. Manage component logic.
 * @param {object} props ship object
 */
class Ship extends Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
		};

		this.handleEdit = this.handleEdit.bind(this);
	}

	handleEdit(status) {
		this.setState(() => {
			return {
				edit: status,
			};
		});
	}

	renderContent() {
		let content = "";

		if (this.state.edit === true) {
			content = <ViewEditShipForm props={this.props} edit={true} handleEdit={this.handleEdit} />;
		} else {
			content = <ViewEditShipForm props={this.props} edit={false} handleEdit={this.handleEdit} />;
		}

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default Ship;
