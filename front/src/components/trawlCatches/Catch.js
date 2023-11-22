import React, { useState } from "react";

import Sexes from "../sexes/Sexes.js";
import CatchForm from "./CatchForm.js";
import CatchButtonBar from "./CatchButtonBar.js";

// class Catch extends Component {
const Catch = ({
	this_catch,
	species,
	deleteSex,
	handleChangeGroup,
	handleChangeSpecies,
	handleChangeCategory,
	handleChangeWeight,
	handleCancelEditCatch,
	handleChangeSampledWeight,
	createCatch,
	updateCatch,
	deleteCatch,
}) => {
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
	 */

	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		// status_catch: "", // State of Catch component: "", "add", "view" or "edit".
	// 		status_catch: this.props.status_catch || "view",
	// 		view_sexes: false,
	// 	};

	// 	this.original_catch = "";

	// 	this.editCatchStatus = this.editCatchStatus.bind(this);
	// 	this.handleCancel = this.handleCancel.bind(this);
	// }

	// editCatchStatus(status) {
	// 	this.setState({
	// 		status_catch: status,
	// 	});
	// }

	const [status_catch, setStatus_catch] = useState("view");
	const [view_sexes, setView_sexes] = useState(false);
	const [original_catch, setOriginal_catch] = useState(this_catch || "");

	// handleViewSexes = (status) => {
	// 	this.setState({
	// 		view_sexes: status,
	// 	});
	// };

	//TODO: test if is possible to avoid this method
	const handleCancel = () => {
		handleCancelEditCatch(this_catch.id, original_catch);
	};

	// componentDidMount() {
	// 	this.original_catch = this.props.this_catch;
	// }

	const renderContent = () => {
		if (status_catch === "add") {
			return (
				<div className="form__row form--wide">
					<CatchForm
						status_catch={status_catch}
						species={species}
						createCatch={createCatch} //is this needed?
					/>
				</div>
			);
		} else if (status_catch === "view") {
			return (
				<div className="form__row form--wide catch">
					<CatchForm status_catch={status_catch} this_catch={this_catch} />
					<CatchButtonBar
						className="form__cell__catches--left"
						catch_id={this_catch.id}
						catch_status={status_catch}
						view_sexes={view_sexes}
						editCatchStatus={setStatus_catch}
						deleteCatch={deleteCatch}
						handleViewSexes={setView_sexes}
					/>
					<Sexes
						catch_id={this_catch.id}
						unit={this_catch.unit}
						increment={this_catch.increment}
						view_sexes={view_sexes}
					/>
				</div>
			);
		} else if (status_catch === "edit") {
			return (
				<div className="form__row">
					<CatchForm
						status_catch={status_catch}
						this_catch={this_catch}
						species={species}
						handleChangeGroup={handleChangeGroup}
						handleChangeSpecies={handleChangeSpecies}
						handleChangeCategory={handleChangeCategory}
						handleChangeWeight={handleChangeWeight}
						handleChangeSampledWeight={handleChangeSampledWeight}
					/>

					<CatchButtonBar
						catch_id={this_catch.id}
						catch_status={status_catch}
						view_sexes={view_sexes}
						editCatchStatus={setStatus_catch}
						updateCatch={updateCatch}
						handleCancel={handleCancel}
					/>
				</div>
			);
		}
	};

	return renderContent();

	// render() {
	// 	return this.renderContent();
	// }
};

export default Catch;
