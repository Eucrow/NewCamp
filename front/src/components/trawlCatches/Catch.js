import React, { Fragment, useEffect, useState, useContext } from "react";

import CatchesContext from "../../contexts/CatchesContext.js";
import CatchContext from "../../contexts/CatchContext.js";

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
	// const [haulHasLengths, setHaulHasLengths] = useState(false);

	const catchesContext = useContext(CatchesContext);

	const editCatchStatus = (status) => {
		catchesContext.setEditingCatchId(thisCatch.catch_id);
		setCatchStatus(status);
	};

	useEffect(() => {
		if (thisCatch && thisCatch.not_measured_individuals == null) {
			setAllowedSexes(true);
		} else {
			setAllowedSexes(false);
		}
		// if (thisCatch && thisCatch.haul_has_lengths) {
		// 	setHaulHasLengths(thisCatch.haul_has_lengths);
		// } else {
		// 	setHaulHasLengths(false);
		// }
	}, [thisCatch]);

	const handleCancel = () => {
		catchesContext.handleCancelEditCatch(thisCatch.catch_id, backupCatch);
		editCatchStatus("view");
		catchesContext.setEditingCatchId(null);
	};

	const renderContent = () => {
		if (catchStatus === "add") {
			return <NewCatchForm />;
		} else if (catchStatus === "view") {
			return (
				<Fragment>
					<ViewCatchForm />
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
			return <EditCatchForm />;
		}
	};

	return (
		<CatchContext.Provider
			value={{
				catchStatus,
				setCatchStatus,
				thisCatch,
				handleChangeAdd,
				viewSexes,
				allowedSexes,
				editCatchStatus,
				setViewSexes,
				handleCancel,
				// haulHasLengths,
				// setHaulHasLengths,
			}}
		>
			{renderContent()}
		</CatchContext.Provider>
	);
};

export default Catch;
