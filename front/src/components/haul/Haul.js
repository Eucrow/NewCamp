import React, { Component, Fragment } from "react";

import ViewHaulDetails from "./HaulDetails";

class Haul extends Component {
	/**
	 * Haul component
	 * @param {array} props.haul: haul.
	 */
	constructor(props) {
		super(props);
		this.state = {
			detail: false, // True to view detail fo the haul, false to not to.
		};

		this.changeDetail = this.changeDetail.bind(this);
		this.renderContent = this.renderContent.bind(this);
	}

	changeDetail(detail) {
		this.setState(() => {
			return {
				detail: detail,
			};
		});
	}

	renderContent() {
		if (this.state.detail === false) {
			return (
				<div style={{ display: "inline" }}>
					<div key={this.props.haul.id} style={{ display: "inline" }}>
						Haul: {this.props.haul.haul} - Station: {this.props.haul.station.station} - Sampler:
						{this.props.haul.sampler.sampler} - Valid?:{this.props.haul.valid} -
					</div>
					<button
						style={{ display: "inline" }}
						onClick={() => {
							this.changeDetail(true);
						}}
					>
						Show detail
					</button>
				</div>
			);
		}

		if (this.state.detail === true) {
			return (
				<Fragment style={{ display: "inline" }}>
					<ViewHaulDetails haul={this.props.haul} />
					<button
						style={{ display: "inline" }}
						onClick={() => {
							this.changeDetail(false);
						}}
					>
						Hide detail
					</button>
				</Fragment>
			);
		}
	}

	render() {
		return this.renderContent();
	}
}

export default Haul;
