import React, { Component } from "react";

import Sexes from "../sexes/Sexes.js";
import ComponentCategory from "./Category.js";

class Catch extends Component {
	/**
	 * Catch form.
	 * @param {object} props.this_catch: catch managed by this component.
	 * @param {object} props.species: species list.
	 * @param {method} props.deleteSex: delete sex of database.
	 * @param {method} props.handleChangeGroup: manage group state and field.
	 * @param {method} props.handleChangeSpecies: manage pecies state and field.
	 * @param {method} props.handleChangeCategory: manage ategory state and field.
	 * @param {method} props.handleChangeWeight: manage weight state and field.
	 * @param {method} props.handleCancelEditCatch: manage cancellation of catch edition.
	 * @param {method} props.updateCatch: update catch in database.
	 * @param {method} props.removeCatch: delete catch of database.
	 * @param {method} props.addSex: handle the new sex form.
	 */

	constructor(props) {
		super(props);
		this.state = {
			// status_catch: "", // State of Catch component: "", "add", "view" or "edit".
			status_catch: this.props.status_catch || "view",
		};

		this.original_catch = "";

		this.editCatchStatus = this.editCatchStatus.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	editCatchStatus(status) {
		this.setState({
			["status_catch"]: status,
		});
	}

	handleCancel = () => {
		this.props.handleCancelEditCatch(this.props.this_catch.id, this.original_catch);
	};

	componentDidMount() {
		this.original_catch = this.props.this_catch;
	}

	renderContent = () => {
		if (this.state.status_catch === "add") {
			return (
				<div className="form__row form--wide">
					<ComponentCategory
						status_catch={this.state.status_catch}
						species={this.props.species}
						createCatch={this.props.createCatch}
						existsCatch={this.props.existsCatch}
					/>
				</div>
			);
		} else if (this.state.status_catch === "view") {
			const this_catch = this.props.this_catch;
			const sexes = this_catch.sexes ? this_catch.sexes : [];

			return (
				<div className="form__row form--wide catch">
					<ComponentCategory
						status_catch={this.state.status_catch}
						this_catch={this.props.this_catch}
						handleChangeSampledWeight={this.props.handleChangeSampledWeight}
						updateSampledWeight={this.props.updateSampledWeight}
						createSampledWeight={this.props.createSampledWeight}
						deleteSampledWeight={this.props.deleteSampledWeight}
					/>
					<div className="form__cell form__cell--right">
						<button
							className="buttonsWrapper__button"
							onClick={() => {
								this.editCatchStatus("edit");
							}}
						>
							Edit catch
						</button>
						<button className="buttonsWrapper__button" onClick={this.props.removeCatch(this_catch.id)}>
							Remove catch
						</button>
					</div>
					<div className="form__row sexesWrapper">
						<Sexes
							sexes={sexes}
							catch_id={this.props.this_catch.id}
							unit={this.props.this_catch.unit}
							increment={this.props.this_catch.increment}
							editCatchStatus={this.editCatchStatus}
							addSex={this.props.addSex}
							deleteSex={this.props.deleteSex}
						/>
					</div>
				</div>
			);
		} else if (this.state.status_catch === "edit") {
			const this_catch = this.props.this_catch;

			return (
				<div className="form__row">
					<ComponentCategory
						status_catch={this.state.status_catch}
						this_catch={this.props.this_catch}
						species={this.props.species}
						handleChangeGroup={this.props.handleChangeGroup}
						handleChangeSpecies={this.props.handleChangeSpecies}
						handleChangeCategory={this.props.handleChangeCategory}
						handleChangeWeight={this.props.handleChangeWeight}
						deleteSampledWeight={this.props.deleteSampledWeight}
					/>

					<button
						onClick={() => {
							this.props.updateCatch(this_catch.id);
							this.editCatchStatus("view");
						}}
					>
						Save
					</button>

					<button
						onClick={() => {
							this.handleCancel();
							this.editCatchStatus("view");
						}}
					>
						Cancel
					</button>
				</div>
			);
		}
	};

	render() {
		return this.renderContent();
	}
}

export default Catch;
