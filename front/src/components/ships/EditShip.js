import React, { Component } from "react";

import UiButtonCancelEditShip from "./UiButtonCancelEditShip";

/**
 * Ship component
 * @param {object} props.ship - ship object
 * @param {method} props.handleChange
 * @param {method} props.handleEdit
 * @param {method} props.updateShip
 */
class EditShip extends Component {
	renderContent() {
		var content = "";

		content = (
			<form
				onSubmit={(e) => {
					this.props.updateShip(e, this.props.ship.id);
				}}
			>
				<div>
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						value={this.props.ship.name || ""}
						onChange={(e) => this.props.handleChange(e, this.props.ship.id)}
					/>
					<label htmlFor="datras_id">DATRAS code:</label>
					<input
						type="text"
						id="datras_id"
						name="datras_id"
						value={this.props.ship.datras_id || ""}
						onChange={(e) => this.props.handleChange(e, this.props.ship.id)}
					/>
					<label htmlFor="length">Length:</label>
					<input
						type="text"
						id="length"
						name="length"
						value={this.props.ship.length || ""}
						onChange={(e) => this.props.handleChange(e, this.props.ship.id)}
					/>
					<label htmlFor="main_power">Main Power:</label>
					<input
						type="text"
						id="main_power"
						name="main_power"
						value={this.props.ship.main_power || ""}
						onChange={(e) => this.props.handleChange(e, this.props.ship.id)}
					/>
					<label htmlFor="year_built">Year built:</label>
					<input
						type="text"
						id="year_built"
						name="year_built"
						value={this.props.ship.year_built || ""}
						onChange={(e) => this.props.handleChange(e, this.props.ship.id)}
					/>
					<input type="submit" value="Save" />
					<UiButtonCancelEditShip handleEdit={this.props.handleEdit} />
				</div>
			</form>
		);

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default EditShip;
