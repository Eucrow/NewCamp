import React, { Component, Fragment } from "react";

import Hauls from "../hauls/Hauls";
import ViewEditStationForm from "./ViewEditStationForm";

class EditStation extends Component {
	/**
	 *
	 * @param {Array} props.station
	 * @param {method} props.handleEdit
	 */

	render() {
		return (
			<Fragment>
				<ViewEditStationForm
					station={this.props.station}
					handleEdit={this.props.handleEdit}
					edit={true}
				/>
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
