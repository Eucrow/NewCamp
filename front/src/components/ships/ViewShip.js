import React, { Component } from "react";

import ViewEditShipFrom from "./ViewEditShipForm";
/**
 * Ship component
 * @param {object} props.ship: ship object
 * @param {method} props.handleEdit:
 * @param {method} props.deleteShip:
 */
class ViewShip extends Component {
	render() {
		return (
			<ViewEditShipFrom
				props={this.props}
				edit={false}
				handleEdit={this.props.handleEdit}
			/>
		);
	}
}

export default ViewShip;
