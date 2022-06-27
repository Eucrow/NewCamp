import React, { Component } from "react";

import stationsContext from "../../contexts/StationsContext.js";

import ViewStation from "./ViewStation.js";
import EditStation from "./EditStation.js";

/**
 *
 * @param {Array} station
 */
class Station extends Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
		};

		this.handleEdit = this.handleEdit.bind(this);
	}

	static contextType = stationsContext;
	/**
	 * Handle edit state.
	 * @param {boolean} edit
	 */
	handleEdit(edit) {
		this.setState(() => {
			return {
				edit: edit,
			};
		});
	}

	renderContent() {
		if (this.state.edit === false) {
			return (
				<div className="wrapper">
					<ViewStation
						station={this.props.station}
						handleEdit={this.handleEdit}
					/>
				</div>
			);
		} else if (this.state.edit === true) {
			return (
				<div className="wrapper">
					<EditStation
						station={this.props.station}
						handleEdit={this.handleEdit}
					/>
				</div>
			);
		}
	}

	render() {
		return this.renderContent();
	}
}

export default Station;
