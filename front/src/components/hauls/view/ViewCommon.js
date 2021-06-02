import React, { Component, Fragment } from "react";

class ViewCommon extends Component {
	/**
	 * Component of the common part of the haul form.
	 * @param {object} props.haul
	 */

	render() {
		return (
			<Fragment>
				<div className="haul__cell">
					<div className="haul__label">Haul:</div>
					<div>{this.props.haul.haul}</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Station:</div>
					<div>{this.props.haul.station.station}</div>
				</div>

				<div className="haul__cell">
					<div className="haul__label">Sampler:</div>
					<div>{this.props.haul.sampler.sampler}</div>
				</div>

				{/* <div className="haul__cell">
					<div className="haul__label">Gear:</div>
					<div>{this.props.haul.gear.gear}</div>
				</div> */}

				<div className="haul__cell">
					<div className="haul__label">Valid?</div>
					<div>: {this.props.haul.valid}</div>
				</div>
			</Fragment>
		);
	}
}

export default ViewCommon;
