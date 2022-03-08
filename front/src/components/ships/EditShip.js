import React, { Component } from "react";

import ViewEditShipForm from "./ViewEditShipForm";

/**
 * Ship component
 * @param {object} props.ship ship object
 * @param {method} handleEdit
 */
class EditShip extends Component {
	render() {
		return (
			<ViewEditShipForm
				props={this.props}
				edit={true}
				handleEdit={this.props.handleEdit}
			/>
		);
	}
}

export default EditShip;
