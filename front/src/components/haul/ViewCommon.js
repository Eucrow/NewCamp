import React, { Component } from "react";

class ViewCommon extends Component {
	/**
	 * Component of the common part of the haul form.
	 * @param {object} props.haul
	 */

	render() {
		const haul = this.props.haul;
		return (
			<div key={this.props.haul.id} style={{ display: "inline" }}>
				Haul: {this.props.haul.haul} - Station: {this.props.haul.station.station} - Sampler:
				{this.props.haul.sampler.id} - Gear: {this.props.haul.gear} - Valid?: {this.props.haul.valid} -
			</div>
		);
	}
}

export default ViewCommon;
