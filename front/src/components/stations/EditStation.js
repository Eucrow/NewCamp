import React, { Component, Fragment } from "react";

import Hauls from "../hauls/Hauls.js";

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
			<Fragment>
				<form className="station__row">
					{/* <label htmlFor="survey_id">Survey_id:</label>
				<input
					type="text"
					id="survey_id"
					name="survey_id"
					value={this.props.station.survey_id || ""}
					onChange={(e) => this.props.handleChangeStationFields(e, this.props.station.id)}
				/> */}
					<div className="station__cell">
						<label htmlFor="station">Station:</label>
						<input
							type="text"
							id="station"
							name="station"
							value={this.props.station.station || ""}
							onChange={(e) =>
								this.props.handleChangeStationFields(
									e,
									this.props.station.id
								)
							}
						/>
					</div>
					<div className="station__cell">
						<label htmlFor="comment">Comment:</label>
						<input
							type="text"
							id="comment"
							name="comment"
							value={this.props.station.comment || ""}
							onChange={(e) =>
								this.props.handleChangeStationFields(
									e,
									this.props.station.id
								)
							}
						/>
					</div>
					<div className="station__cell station__cell--right">
						<div className="buttonsWrapper">
							<button
								type="submit"
								onClick={(e) => {
									this.props.handleSubmitEditStation(
										e,
										this.props.station.id
									);
									this.props.changeEdit(false);
								}}
							>
								Save Station
							</button>
						</div>
					</div>
				</form>
				<Hauls
					hauls={this.props.station.hauls}
					station_id={this.props.station.id}
					deleteHaul={this.props.deleteHaul}
					createHaul={this.props.createHaul}
				/>
			</Fragment>
		);
	}
}

export default EditStation;
