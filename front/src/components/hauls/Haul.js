import React, { Component } from "react";

// import { Link } from "react-router-dom";

import ViewCommon from "./view/ViewCommon";
import HaulDetails from "./HaulDetails";

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
				<div className="form__row">
					<ViewCommon haul={this.props.haul} />
					<div className="form__cell form__cell--right">
						<div className="buttonsWrapper">
							<this.UiShowDetailButton />
							<button
								className="buttonsWrapper__button"
								onClick={(e) => {
									this.props.deleteHaul(
										e,
										this.props.haul.station.id,
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
				<HaulDetails
					haul={this.props.haul}
					changeDetail={this.changeDetail}
				/>
			);
		}
	}

	render() {
		return this.renderContent();
	}
}

export default Haul;
