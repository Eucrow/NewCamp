import React, { Component } from "react";

// import Hauls from "../hauls/Hauls.js";

class EditStation extends Component {
	/**
	 *
	 * @param {Array} props.station
	 * @param {method} props.changeEdit
	 * @param {method} props.handleChangeStationFields
	 */

	constructor(props) {
		super(props);
		this.state = {};

		this.apiStation = "http://127.0.0.1:8000/api/1.0/station/";

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();

		const api = this.apiStation + this.props.station.id;

		fetch(api, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(this.state.data),
		})
			.then(() => {
				this.props.changeEdit(false);
			})
			.catch((error) => console.log(error));
	}

	render() {
		return (
			<form>
				{/* <label htmlFor="survey_id">Survey_id:</label>
				<input
					type="text"
					id="survey_id"
					name="survey_id"
					value={this.props.station.survey_id || ""}
					onChange={(e) => this.props.handleChangeStationFields(e, this.props.station.id)}
				/> */}
				<label htmlFor="station">Station:</label>
				<input
					type="text"
					id="station"
					name="station"
					value={this.props.station.station || ""}
					onChange={(e) => this.props.handleChangeStationFields(e, this.props.station.id)}
				/>
				<label htmlFor="comment">Comment:</label>
				<input
					type="text"
					id="comment"
					name="comment"
					value={this.props.station.comment || ""}
					onChange={(e) => this.props.handleChangeStationFields(e, this.props.station.id)}
				/>

				<input type="submit" value="Save Station" onClick={this.handleSubmit} />
			</form>
		);
	}
}

export default EditStation;
