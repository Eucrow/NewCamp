import React, { Fragment, useEffect, useState, useContext } from "react";

import CatchesContext from "../../contexts/CatchesContext.js";

import Sexes from "../sexes/Sexes.js";
import NewCatchForm from "./NewCatchForm.js";
import EditCatchForm from "./EditCatchForm.js";
import ViewCatchForm from "./ViewCatchForm.js";

/**
 * Catch component.
 * @param {object} thisCatch - The catch managed by this component.
 * @param {string} thisCatchStatus - The status of the catch.
 * @param {function} handleChangeAdd - The function to handle adding a catch.
 * @returns {JSX.Element} The rendered Catch component.
 */
const Catch = ({ thisCatch, thisCatchStatus, handleChangeAdd }) => {
	const [catchStatus, setCatchStatus] = useState(thisCatchStatus || "view");
	const [viewSexes, setViewSexes] = useState(false);
	const [allowedSexes, setAllowedSexes] = useState(false);
	const [backupCatch] = useState(thisCatch || "");

	const catchesContext = useContext(CatchesContext);

	useEffect(() => {
		if (thisCatch && thisCatch.not_measured_individuals == null) {
			setAllowedSexes(true);
		} else {
			setAllowedSexes(false);
		}
	}, [thisCatch]);

	const handleCancel = () => {
		catchesContext.handleCancelEditCatch(thisCatch.catch_id, backupCatch);
	};

	const renderContent = () => {
		if (catchStatus === "add") {
			return (
				<div className="form__row form--wide">
					<NewCatchForm handleChangeAdd={handleChangeAdd} />
				</div>
			);
		} else if (catchStatus === "view") {
			return (
				<Fragment>
					<ViewCatchForm
						catchStatus={catchStatus}
						thisCatch={thisCatch}
						handleViewSexes={setViewSexes}
						catchId={thisCatch.catch_id}
						viewSexes={viewSexes}
						allowedSexes={allowedSexes}
						editCatchStatus={setCatchStatus}
					/>
					{viewSexes && (
						<Sexes
							catchId={thisCatch.catch_id}
							spId={thisCatch.sp_id}
							viewSexes={viewSexes}
						/>
					)}
				</Fragment>
			);
		} else if (catchStatus === "edit") {
			return (
				<EditCatchForm
					catchStatus={catchStatus}
					thisCatch={thisCatch}
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
