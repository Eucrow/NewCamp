import React, { Component } from "react";

import UiButtonUpdateShip from "./UiButtonUpdateShip";
import UiButtonDeleteShip from "./UiButtonDeleteShip";
import ViewEditShipFrom from "./ViewEditShipForm";
/**
 * Ship component
 * @param {objetc} props.ship: ship object
 * @param {method} props.handleEdit:
 * @param {method} props.deleteShip:
 */
class ViewShip extends Component {
	render() {
		return <ViewEditShipFrom props={this.props} edit={false} />;
	}
}

export default ViewShip;
