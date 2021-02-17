import React, { Component } from "react";

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
				<button
					onClick={() => {
						this.props.handleEdit(true);
					}}
				>
					Edit
				</button>
				<button
					onClick={(e) => {
						if (window.confirm("Delete the ship?")) {
							this.props.deleteShip(e, this.props.ship.id);
						}
					}}
				>
					Delete
				</button>
			</div>
		);

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default ViewShip;
