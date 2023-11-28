import React, { useState } from "react";

import Sexes from "../sexes/Sexes.js";
import CatchForm from "./CatchForm.js";

const Catch = ({
	this_catch,
	this_catch_status,
	species,
	handleChangeGroup,
	handleChangeSpecies,
	handleChangeCategory,
	handleChangeWeight,
	handleCancelEditCatch,
	handleChangeSampledWeight,
	handleChangeAdd,
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

	const [catch_status, setCatch_status] = useState(this_catch_status || "view");
	const [view_sexes, setView_sexes] = useState(false);
	const [original_catch, setOriginal_catch] = useState(this_catch || "");

	//TODO: test if is possible to avoid this method
	const handleCancel = () => {
		handleCancelEditCatch(this_catch.id, original_catch);
	};

	const renderContent = () => {
		if (catch_status === "add") {
			return (
				<div className="form__row form--wide">
					<CatchForm
						catch_status={catch_status}
						species={species}
						createCatch={createCatch}
						editCatchStatus={setCatch_status}
						handleChangeAdd={handleChangeAdd}
					/>
				</div>
			);
		} else if (catch_status === "view") {
			return (
				<div className="form__row form--wide catch">
					<CatchForm
						catch_status={catch_status}
						this_catch={this_catch}
						deleteCatch={deleteCatch}
						handleViewSexes={setView_sexes}
						catch_id={this_catch.id}
						view_sexes={view_sexes}
						editCatchStatus={setCatch_status}
					/>
					<Sexes
						catch_id={this_catch.id}
						unit={this_catch.unit}
						increment={this_catch.increment}
						view_sexes={view_sexes}
					/>
				</div>
			);
		} else if (catch_status === "edit") {
			return (
				<div className="form__row">
					<CatchForm
						catch_status={catch_status}
						this_catch={this_catch}
						species={species}
						handleChangeGroup={handleChangeGroup}
						handleChangeSpecies={handleChangeSpecies}
						handleChangeCategory={handleChangeCategory}
						handleChangeWeight={handleChangeWeight}
						handleChangeSampledWeight={handleChangeSampledWeight}
						updateCatch={updateCatch}
						editCatchStatus={setCatch_status}
						catch_id={this_catch.id}
						view_sexes={view_sexes}
						handleCancel={handleCancel}
					/>
				</div>
			);
		}
	};

	return renderContent();
};

export default Catch;
