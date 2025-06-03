import React, { useContext } from "react";

import CatchesButtonBar from "./CatchesButtonBar.js";

import UiIconUp from "../ui/UiIconUp";
import UiIconDown from "../ui/UiIconDown";
import UiIconSexesMale from "../ui/UiIconSexesMale";
import UiIconSexesFemale from "../ui/UiIconSexesFemale";
import UiIconSexesUnknown from "../ui/UiIconSexesUnknown";

const CatchesHeader = ({ sortConfig, handleSortCatches, add, setAdd }) => {
	const renderContent = () => {
		return (
			<div className="catches__table__row catches__table__header">
				<div
					className="catches__table__cell catches__table__group sort__container"
					onClick={() => handleSortCatches("group")}
				>
					Group
					<div className="sort__container__arrow">
						{sortConfig.field === "group" && sortConfig.direction === "asc" ? (
							<UiIconUp />
						) : (
							<UiIconDown />
						)}
					</div>
				</div>
				<div
					className="catches__table__cell catches__table__code sort__container"
					onClick={() => handleSortCatches("sp_code")}
				>
					Code
					<div className="sort__container__arrow">
						{sortConfig.field === "sp_code" && sortConfig.direction === "asc" ? (
							<UiIconUp />
						) : (
							<UiIconDown />
						)}
					</div>
				</div>
				<div
					className="catches__table__cell catches__table__species sort__container"
					onClick={() => handleSortCatches("sp_name")}
				>
					Species
					<div className="sort__container__arrow">
						{sortConfig.field === "sp_name" && sortConfig.direction === "asc" ? (
							<UiIconUp />
						) : (
							<UiIconDown />
						)}
					</div>
				</div>
				<div className="catches__table__cell catches__table__category">Category</div>
				<div className="catches__table__cell catches__table__weight">Weight (g.)</div>
				<div className="catches__table__cell catches__table__sampledWeight">
					Sampled weight (g.)
				</div>
				<div className="catches__table__cell catches__table__individuals">
					Not measured individuals
				</div>
				<div className="catches__table__cell hasLengths__container">
					<div className="hasLengths__header">individuals measured</div>
					<div className="hasLengths__row">
						<div className="hasLengths__row__sex hasLengths__header__icon">
							<UiIconSexesMale />
						</div>
						<div className="hasLengths__row__sex hasLengths__header__icon">
							<UiIconSexesFemale />
						</div>
						<div className="hasLengths__row__sex hasLengths__header__icon">
							<UiIconSexesUnknown />
						</div>
					</div>
				</div>
				{add === false && (
					<div className="catches__table__cell catches__table__buttonBar">
						<CatchesButtonBar add={add} handleChangeAdd={setAdd} />
					</div>
				)}
			</div>
		);
	};

	return renderContent();
};

export default CatchesHeader;
