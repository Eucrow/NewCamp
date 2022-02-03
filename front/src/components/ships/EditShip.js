import React, { Component } from "react";

import UiButtonCancelEditShip from "./UiButtonCancelEditShip";
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
