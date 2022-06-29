import React, { Component } from "react";

import ViewCommon from "./view/ViewCommon";
import EditCommonForm from "./edit/EditCommonForm";
import HaulDetails from "./HaulDetails";
import ComponentsTrawlCatches from "../trawlCatches/TrawlHaulCatches";

class Haul extends Component {
	/**
	 * Haul component
	 * @param {object} haul
	 * @param {number} station_id
	 * @param {method} validateHaulSampler
	 */
	constructor(props) {
		super(props);
		this.state = {
			detail: false, // True to view detail fo the haul, false to not to.
			edit: false,
		};

		this.handleDetail = this.handleDetail.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.UiShowDetailButton = this.UiShowDetailButton.bind(this);
	}

	handleDetail(detail) {
		this.setState(() => {
			return {
				detail: detail,
			};
		});
	}

	handleEdit(edit) {
		this.setState(() => {
			return {
				edit: edit,
			};
		});
	}

	UiShowDetailButton() {
		return (
			<button
				className="buttonsWrapper__button"
				onClick={() => {
					this.handleDetail(true);
				}}
			>
				Show detail
			</button>
		);
	}

	renderContent() {
		if ((this.state.detail === false) & (this.state.edit === false)) {
			return (
				<div className="wrapper form__row">
					<ViewCommon
						haul={this.props.haul}
						edit={this.state.edit}
						handleEdit={this.handleEdit}
						handleDetail={this.handleDetail}
					/>
					<ComponentsTrawlCatches haul_id={this.props.haul.id} />
				</div>
			);
		}

		if ((this.state.detail === false) & (this.state.edit === true)) {
			return (
				<div className="wrapper form__row">
					<EditCommonForm
						haul={this.props.haul}
						station_id={this.props.station_id}
						edit={this.state.edit}
						handleEdit={this.handleEdit}
						samplers={this.props.samplers}
					/>
				</div>
			);
		}

		if (this.state.detail === true) {
			return (
				<div className="wrapper form__row">
					<ViewCommon haul={this.props.haul} />
					<HaulDetails
						haul={this.props.haul}
						handleDetail={this.handleDetail}
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
