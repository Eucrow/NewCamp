import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";

import ComponentsUiRemoveStationButton from "../../ui/RemoveStationButton.js";

class ComponentsStationOptions extends Component {
	/**
	 * Component with option of every survey
	 * @param {number} props.survey_id
	 * @param {function} props.deleteStation: pass onDelete function to remove the station from parent state.
	 */

	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
		this.apiStation = "Stations/station/" + this.props.station_id;
	}

	render() {
		return (
			// <ul>
			//     <li><Link to={{pathname: this.apiStation, state: {isEdit: true }}}> edit </Link></li>
			//     {/* <li><Link to={{pathname: this.api, state: {isEdit: false }}}> hauls </Link></li> */}
			//     <li>Hauls</li>
			//     <li><ComponentsUiRemoveStationButton station_id={ this.props.station_id } onDelete={ this.onDelete } /></li>
			// </ul>
			<Fragment>
				<Link style={{ display: "inline" }} to={{ pathname: this.apiStation, state: { isEdit: true } }}>
					{" "}
					edit{" "}
				</Link>
				-
				<ComponentsUiRemoveStationButton
					style={{ display: "inline" }}
					station_id={this.props.station_id}
					deleteStation={this.props.deleteStation}
				/>
			</Fragment>
		);
	}
}

export default ComponentsStationOptions;
