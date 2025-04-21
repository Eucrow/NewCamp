import React, { useEffect, useState, useContext } from "react";
import CatchButtonBar from "./CatchButtonBar";
import GlobalContext from "../../contexts/GlobalContext";

/**
 * View CatchForm is a functional component that represents a form to view catch data.
 *
 * @component
 * @param {string} catchStatus - The current status of the catch: "", "view" or "edit".
 * @param {object} thisCatch - The catch object that is currently being managed by this component.
 * @param {function} editCatchStatus - A function to manage the catchStatus state.
 * @param {boolean} viewSexes - A boolean to manage the view of sexes.
 * @param {function} deleteCatch - A function to delete the catch from the database.
 * @param {function} handleViewSexes - A function to handle the view of sexes.
 * @param {object} allowedSexes - An object containing allowedSexes state, which allow to add sexes to the catch or don't.
 * @returns {JSX.Element} The rendered Catch component.
 */
const ViewCatchForm = ({
	catchStatus,
	thisCatch,
	editCatchStatus,
	viewSexes,
	deleteCatch,
	handleViewSexes,
	allowedSexes,
}) => {
	const renderContent = () => {
		return (
			<form className="catches__table__row">
				<input
					className="catches__table__cell catches__table__group"
					type="number"
					id="group"
					name="group"
					min="1"
					max="5"
					disabled
					value={thisCatch.group}
					aria-label="Group"
				/>
				<select
					className="catches__table__cell catches__table__species"
					id="sp_code"
					name="sp_code"
					disabled
					aria-label="Species"
				>
					<option key={thisCatch.sp_id}>{thisCatch.sp_name}</option>
				</select>
				<input
					className="catches__table__cell catches__table__category"
					type="number"
					id="category"
					name="category"
					min="1"
					max="99"
					disabled
					value={thisCatch.category}
					aria-label="Category"
				/>
				<input
					className="catches__table__cell catches__table__weight"
					type="number"
					id="weight"
					name="weight"
					min="1"
					max="99999999"
					disabled
					value={thisCatch.weight}
					aria-label="Weight"
				/>
				<input
					className="catches__table__cell catches__table__sampledWeight"
					disabled
					type="number"
					id="sampled_weight"
					name="sampled_weight"
					min="0"
					max="99999999"
					value={thisCatch.sampled_weight || ""}
					aria-label="Sampled weight"
				/>
				<input
					className="catches__table__cell catches__table__individuals"
					disabled
					type="number"
					id="individuals"
					name="individuals"
					min="0"
					max="99999999"
					value={thisCatch.not_measured_individuals || ""}
					aria-label="Not measured individuals"
				/>
				<CatchButtonBar
					className=""
					catchId={thisCatch.catch_id}
					catchStatus={catchStatus}
					viewSexes={viewSexes}
					editCatchStatus={editCatchStatus}
					deleteCatch={deleteCatch}
					handleViewSexes={handleViewSexes}
					allowedSexes={allowedSexes}
				/>
			</form>
		);
	};

	return renderContent();
};

export default ViewCatchForm;
