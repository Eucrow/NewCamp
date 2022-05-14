import React, { Component } from "react";

// import { Link } from "react-router-dom";

import ViewCommonSimple from "./view/ViewCommonSimple";
import HaulDetails from "./HaulDetails";

class Haul extends Component {
	/**
	 * Haul component
	 * @param {array} props.haul: haul.
	 * @param {object} props.strata
	 * @param {object} props.samplers
	 * @param {object} props.gears
	 * @param {method} props.validateHaulSampler
	 */
	constructor(props) {
		super(props);
		this.state = {
			detail: false, // True to view detail fo the haul, false to not to.
		};

		this.changeDetail = this.changeDetail.bind(this);
		this.UiShowDetailButton = this.UiShowDetailButton.bind(this);
	}

	changeDetail(detail) {
		this.setState(() => {
			return {
				detail: detail,
			};
		});
	}

	UiShowDetailButton() {
		return (
			<button
				className="buttonsWrapper__button"
				onClick={() => {
					this.changeDetail(true);
				}}
			>
				Show detail
			</button>
		);
	}

	renderContent() {
		if (this.state.detail === false) {
			return (
				<div className="wrapper form__row">
					<ViewCommonSimple haul={this.props.haul} />
					<div className="form__cell form__cell--right">
						<div className="buttonsWrapper">
							<this.UiShowDetailButton />
							<button
								className="buttonsWrapper__button"
								onClick={(e) => {
									this.props.deleteHaul(
										e,
										this.props.station_id,
										this.props.haul.id
									);
								}}
							>
								Delete haul
							</button>
							{/* <Link
								to={{
									pathname:
										this.routeTrawlCatches +
										this.props.haul.id,
									sampler_id: this.props.sampler_id,
									haul_id: this.props.haul_id,
								}}
							>
								view catches
							</Link> */}
						</div>
					</div>
				</div>
			);
		}

		if (this.state.detail === true) {
			return (
				<div className="wrapper">
					<HaulDetails
						haul={this.props.haul}
						changeDetail={this.changeDetail}
						strata={this.props.strata}
						samplers={this.props.samplers}
						gears={this.props.gears}
						validateHaulSampler={this.props.validateHaulSampler}
					/>
				</div>
			);
		}
	}

	render() {
		return this.renderContent();
	}
}

export default Haul;
