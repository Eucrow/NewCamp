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

	// handleSubmit(event) {
	// 	event.preventDefault();

	// 	const api = this.apiStation + this.props.station.id;

	// 	fetch(api, {
	// 		method: "PUT",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(this.state.data),
	// 	})
	// 		.then(() => {
	// 			this.props.changeEdit(false);
	// 		})
	// 		.catch((error) => console.log(error));
	// }

	renderContent() {
		if (this.state.edit === false) {
			return (
				<li key={this.props.station.id}>
					<ViewStation
						station={this.props.station}
						changeEdit={this.changeEdit}
						deleteStation={this.props.deleteStation}
						deleteHaul={this.props.deleteHaul}
						createHaul={this.props.createHaul}
					/>
				</li>
			);
		} else if (this.state.edit === true) {
			return (
				<li key={this.props.station.id}>
					<EditStation
						station={this.props.station}
						changeEdit={this.changeEdit}
						handleChangeStationFields={this.props.handleChangeStationFields}
						handleSubmitEditStation={this.props.handleSubmitEditStation}
					/>
				</li>
			);
		}
	}

	render() {
		return this.renderContent();
	}
}

export default Station;
