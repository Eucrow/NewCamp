import React, { Component, Fragment } from "react";

import Hauls from "../hauls/Hauls";
import StationForm from "./StationForm";

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
				<StationForm props={this.props} edit={false} />
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
