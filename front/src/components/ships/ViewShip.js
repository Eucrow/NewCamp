import React, { Component } from "react";

import UiButtonUpdateShip from "./UiButtonUpdateShip";
import UiButtonDeleteShip from "./UiButtonDeleteShip";

class ViewShip extends Component {
	/**
	 * Ship component
	 * @param {objetc} props.ship: ship object
	 * @param {method} handleEdit:
	 * @param {method} deleteShip:
	 */

	renderContent() {
		let content = "";

		content = (
			<div>
				Ship: {this.props.ship.name}-- DATRAS code:
				{this.props.ship.datras_id}-- Length: {this.props.ship.length}-- Main power:
				{this.props.ship.main_power}-- Year built: {this.props.ship.year_built}
				<UiButtonUpdateShip handleEdit={this.props.handleEdit} ship_id={this.props.ship.id} />
				<UiButtonDeleteShip deleteShip={this.props.deleteShip} ship_id={this.props.ship.id} />
			</div>
		);

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default ViewShip;
