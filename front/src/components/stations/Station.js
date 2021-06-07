import React, { Component } from "react";

import ViewStation from "./ViewStation.js";
import EditStation from "./EditStation.js";

class Station extends Component {
	/**
	 *
	 * @param {Array} props.station
	 * @param {method} props.deleteStation
	 * @param {method} props.createHaul
	 * @param {method} props.deleteHaul
	 * @param {method} props.handleChangeStationFields
	 * @param {method} props.handleSubmitEditStation
	 */
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
		};

		this.apiStation = "http://127.0.0.1:8000/api/1.0/station/";

		// this.handleSubmit = this.handleSubmit.bind(this);

		this.changeEdit = this.changeEdit.bind(this);
	}

	changeEdit(edit) {
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
						changeEdit={this.changeEdit}
						deleteStation={this.props.deleteStation}
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
						changeEdit={this.changeEdit}
						handleChangeStationFields={
							this.props.handleChangeStationFields
						}
						handleSubmitEditStation={
							this.props.handleSubmitEditStation
						}
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
