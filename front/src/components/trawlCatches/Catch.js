import React, { Fragment, useEffect, useState } from "react";

import Sexes from "../sexes/Sexes.js";
import CatchForm from "./CatchForm.js";

/**
 * Catch component.
 * @param {object} props - The component props.
 * @param {object} props.thisCatch - The catch managed by this component.
 * @param {string} props.thisCatchStatus - The status of the catch.
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
	thisCatch,
	thisCatchStatus,
	handleChangeGroup,
	handleChangeSpecies,
	handleChangeCategory,
	handleChangeWeight,
	handleCancelEditCatch,
	handleChangeSampledWeight,
	handleChangeNotMeasuredIndividuals,
	handleChangeAdd,
	createCatch,
	updateCatch,
	deleteCatch,
}) => {
	const [catchStatus, setCatchStatus] = useState(thisCatchStatus || "view");
	const [viewSexes, setViewSexes] = useState(false);
	const [allowedSexes, setAllowedSexes] = useState(false);
	const [backupCatch] = useState(thisCatch || "");

	useEffect(() => {
		if (thisCatch && thisCatch.not_measured_individuals == null) {
			setAllowedSexes(true);
		} else {
			setAllowedSexes(false);
		}
	}, [thisCatch]);

	const handleCancel = () => {
		handleCancelEditCatch(thisCatch.catch_id, backupCatch);
	};

	const renderContent = () => {
		if (catchStatus === "add") {
			return (
				<div className="form__row form--wide">
					<CatchForm
						catchStatus={catchStatus}
						createCatch={createCatch}
						editCatchStatus={setCatchStatus}
						handleChangeAdd={handleChangeAdd}
						handleChangeNotMeasuredIndividuals={handleChangeNotMeasuredIndividuals}
					/>
				</div>
			);
		} else if (catchStatus === "view") {
			return (
				<Fragment>
					<CatchForm
						catchStatus={catchStatus}
						thisCatch={thisCatch}
						deleteCatch={deleteCatch}
						handleViewSexes={setViewSexes}
						catchId={thisCatch.catch_id}
						viewSexes={viewSexes}
						allowedSexes={allowedSexes}
						editCatchStatus={setCatchStatus}
					/>
					{viewSexes && (
						<Sexes
							catchId={thisCatch.catch_id}
							// unit={thisCatch.unit}
							// increment={thisCatch.increment}
							catchMeasurementTypeId={thisCatch.measurement_type_id}
							viewSexes={viewSexes}
						/>
					)}
				</Fragment>
			);
		} else if (catchStatus === "edit") {
			return (
				<CatchForm
					catchStatus={catchStatus}
					thisCatch={thisCatch}
					handleChangeGroup={handleChangeGroup}
					handleChangeSpecies={handleChangeSpecies}
					handleChangeCategory={handleChangeCategory}
					handleChangeWeight={handleChangeWeight}
					handleChangeSampledWeight={handleChangeSampledWeight}
					handleChangeNotMeasuredIndividuals={handleChangeNotMeasuredIndividuals}
					updateCatch={updateCatch}
					editCatchStatus={setCatchStatus}
					catchId={thisCatch.catch_id}
					viewSexes={viewSexes}
					handleCancel={handleCancel}
				/>
			);
		}
	};

	return renderContent();
};

export default Catch;
