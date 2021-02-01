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
				Station: {this.props.station.station} - Comments: {this.props.station.comment} -
				<button
					onClick={(e) => {
						this.props.changeEdit(true);
					}}
				>
					Edit
				</button>
				<button
					onClick={(e) => {
						if (window.confirm("Delete the station?")) {
							this.props.deleteStation(e, this.props.station.id);
						}
					}}
				>
					Remove
				</button>
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
