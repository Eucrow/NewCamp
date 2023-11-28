import React, { useState } from "react";

import Sexes from "../sexes/Sexes.js";
import CatchForm from "./CatchForm.js";

/**
 * Catch component.
 * @param {object} props - The component props.
 * @param {object} props.this_catch - The catch managed by this component.
 * @param {string} props.this_catch_status - The status of the catch.
 * @param {object[]} props.species - The list of species.
 * @param {function} props.handleChangeGroup - The function to handle group changes.
 * @param {function} props.handleChangeSpecies - The function to handle species changes.
 * @param {function} props.handleChangeCategory - The function to handle category changes.
 * @param {function} props.handleChangeWeight - The function to handle weight changes.
 * @param {function} props.handleCancelEditCatch - The function to handle cancellation of catch edition.
 * @param {function} props.handleChangeSampledWeight - The function to handle sampled weight changes.
 * @param {function} props.handleChangeAdd - The function to handle adding a catch.
 * @param {function} props.createCatch - The function to create a catch.
 * @param {function} props.updateCatch - The function to update a catch.
 * @param {function} props.deleteCatch - The function to delete a catch.
 * @returns {JSX.Element} The rendered Catch component.
 */
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
	const [catch_status, setCatch_status] = useState(this_catch_status || "view");
	const [view_sexes, setView_sexes] = useState(false);
	const [original_catch] = useState(this_catch || "");

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
