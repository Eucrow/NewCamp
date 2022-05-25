import React, { Component } from "react";

// import { Link } from "react-router-dom";

import ViewCommon from "./view/ViewCommon";
import EditCommon from "./edit/EditCommon";
import HaulDetails from "./HaulDetails";

import UiButtonBooleanHandle from "../ui/UiButtonBooleanHandle";
import UiButtonDelete from "../ui/UiButtonDelete";
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
			edit: false,
		};

		this.changeDetail = this.changeDetail.bind(this);
		this.changeIsEdit = this.changeIsEdit.bind(this);
		this.UiShowDetailButton = this.UiShowDetailButton.bind(this);
	}

	changeDetail(detail) {
		this.setState(() => {
			return {
				detail: detail,
			};
		});
	}

	changeIsEdit(edit) {
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
					this.changeDetail(true);
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
					<ViewCommon haul={this.props.haul} />
					<div className="form__cell form__cell--right">
						<div className="buttonsWrapper">
							<this.UiShowDetailButton />
							<UiButtonBooleanHandle
								buttonText={"Edit Haul"}
								handleMethod={this.changeIsEdit}
								newBoolean={true}
							/>
							<UiButtonDelete
								id={this.props.haul.id}
								deleteMethod={this.props.deleteHaul}
								buttonText="Delete haul"
								confirmMessage="Are you sure to delete this haul?"
							/>
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

		if ((this.state.detail === false) & (this.state.edit === true)) {
			return (
				<div className="wrapper form__row">
					<EditCommon
						haul={this.props.haul}
						// handleChangeCommonValid={this.handleChangeCommonValid}
						handleChangeCommon={this.props.handleChangeCommon}
						// handleChangeNestedIds={this.handleChangeNestedIds}
						// handleChangeStratum={this.handleChangeStratum}
						strata={this.props.strata}
						samplers={this.props.samplers}
						gears={this.props.gears}
						// validateHaulSampler={this.props.validateHaulSampler}
					/>
					<div className="form__cell form__cell--right">
						<div className="buttonsWrapper">
							{/* <this.UiShowDetailButton /> */}
							<UiButtonBooleanHandle
								buttonText={"Cancel"}
								handleMethod={this.changeIsEdit}
								newBoolean={true}
							/>
						</div>
					</div>
				</div>
			);
		}

		if (this.state.detail === true) {
			return (
				<div className="wrapper form__row">
					<ViewCommon haul={this.props.haul} />
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
