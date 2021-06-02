import React, { Component, Fragment } from "react";

import Hauls from "../hauls/Hauls";

class ViewStation extends Component {
	/**
	 *
	 * @param {Array} props.station
	 * @param {method} props.deleteStation
	 * @param {method} props.createHaul
	 * @param {method} props.deleteHaul
	 */

	render() {
		return (
			<Fragment>
				<div className="station__row">
					<div className="station__cell">
						<div className="station__label">Station:</div>
						<h2> {this.props.station.station}</h2>
					</div>
					<div className="station__cell">
						<div className="station__label">Comments:</div>
						<div>{this.props.station.comment}</div>
					</div>
					<div className="station__cell station__cell--right">
						<div className="buttonsWrapper">
							<button
								className="buttonsWrapper__button"
								onClick={(e) => {
									this.props.changeEdit(true);
								}}
							>
								Edit Station
							</button>
							<button
								className="buttonsWrapper__button"
								onClick={(e) => {
									if (window.confirm("Delete the station?")) {
										this.props.deleteStation(
											e,
											this.props.station.id
										);
									}
								}}
							>
								Delete Station
							</button>
						</div>
					</div>
				</div>
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

export default ViewStation;
