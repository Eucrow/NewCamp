import React, { Component } from "react";

import ViewEditShipForm from "./ViewEditShipForm";

/**
 * Ship component
 * @param {object} props.ship - ship object
 */
class EditShip extends Component {
	render() {
		return <ViewEditShipForm props={this.props} edit={true} />;
	}
}

export default EditShip;
