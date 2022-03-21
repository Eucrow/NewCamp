import React, { Component, Fragment } from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

import Hauls from "../hauls/Hauls";
import ViewEditStationForm from "./ViewEditStationForm";

class ViewStation extends Component {
	/**
	 *
	 * @param {Array} props.station
	 * @param {method} props.handleEdit
	 * @param {method} props.createHaul
	 * @param {method} props.deleteHaul
	 */

	render() {
		return (
			<Fragment>
				{/* <ViewEditStationForm props={this.props} edit={false} /> */}
				<ViewEditStationForm
					station={this.props.station}
					handleEdit={this.props.handleEdit}
					edit={false}
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

export default ViewStation;
