import React, { Component } from "react";

import stationsContext from "../../contexts/StationsContext.js";

import ViewStation from "./ViewStation.js";
import EditStation from "./EditStation.js";

class Station extends Component {
	/**
	 *
	 * @param {Array} props.station
	 * @param {method} props.deleteStation
	 * @param {method} props.createHaul
	 * @param {method} props.deleteHaul
	 * @param {method} props.editStation
	 */

	constructor(props) {
		super(props);
		this.state = {
			edit: false,
		};

		this.handleEdit = this.handleEdit.bind(this);
	}

	static contextType = stationsContext;

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
						deleteHaul={this.props.deleteHaul}
						createHaul={this.props.createHaul}
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
