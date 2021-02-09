import React, { Component } from "react";

// import Hauls from "../hauls/Hauls.js";

class EditStation extends Component {
	/**
	 *
	 * @param {Array} props.station
	 * @param {method} props.changeEdit
	 * @param {method} props.handleChangeStationFields
	 * @param {method} props.handleSubmitEditStation
	 */

	constructor(props) {
		super(props);
		this.state = {};
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

				<input
					type="submit"
					value="Save Station"
					onClick={(e) => {
						this.props.handleSubmitEditStation(e, this.props.station.id);
						this.props.changeEdit(false);
					}}
				/>
			</form>
		);
	}
}

export default EditStation;
