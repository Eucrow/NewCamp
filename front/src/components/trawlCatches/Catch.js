import React, { Component } from "react";

import Sexes from "../sexes/Sexes.js";
import ComponentCategory from "./Category.js";
import CatchButtonBar from "./CatchButtonBar.js";

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
	 * @param {method} props.deleteCatch: delete catch of database.
	 * @param {method} props.addSex: handle the new sex form.
	 */

	constructor(props) {
		super(props);
		this.state = {
			// status_catch: "", // State of Catch component: "", "add", "view" or "edit".
			status_catch: this.props.status_catch || "view",
			view_sexes: false,
		};

		this.original_catch = "";

		this.editCatchStatus = this.editCatchStatus.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	editCatchStatus(status) {
		this.setState({
			status_catch: status,
		});
	}

	handleViewSexes = (status) => {
		this.setState({
			view_sexes: status,
		});
	};

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
			return (
				<div className="form__row form--wide catch">
					<ComponentCategory
						status_catch={this.state.status_catch}
						this_catch={this.props.this_catch}
						// handleChangeSampledWeight={this.props.handleChangeSampledWeight}
						// updateSampledWeight={this.props.updateSampledWeight}
						// createSampledWeight={this.props.createSampledWeight}
						// deleteSampledWeight={this.props.deleteSampledWeight}
					/>
					<CatchButtonBar
						catch_id={this.props.this_catch.id}
						catch_status={this.state.status_catch}
						view_sexes={this.state.view_sexes}
						editCatchStatus={this.editCatchStatus}
						deleteCatch={this.props.deleteCatch}
						handleViewSexes={this.handleViewSexes}
					/>
					<div className="form__row sexesWrapper">
						<Sexes
							catch_id={this.props.this_catch.id}
							has_sexes={this.props.this_catch.has_sexes}
							unit={this.props.this_catch.unit}
							increment={this.props.this_catch.increment}
							editCatchStatus={this.editCatchStatus}
							addSex={this.props.addSex}
							deleteSex={this.props.deleteSex}
							handleViewSexes={this.handleViewSexes}
							view_sexes={this.state.view_sexes}
						/>
					</div>
				</div>
			);
		} else if (this.state.status_catch === "edit") {
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
						handleChangeSampledWeight={this.props.handleChangeSampledWeight}
						// deleteSampledWeight={this.props.deleteSampledWeight}
					/>

					<CatchButtonBar
						catch_id={this.props.this_catch.id}
						catch_status={this.state.status_catch}
						view_sexes={this.state.view_sexes}
						editCatchStatus={this.editCatchStatus}
						updateCatch={this.props.updateCatch}
						handleCancel={this.handleCancel}
					/>
				</div>
			);
		}
	};

	render() {
		return this.renderContent();
	}
}

export default Catch;
