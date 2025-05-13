import React, { useState, useContext, useRef } from "react";

import GlobalContext from "../../contexts/GlobalContext";
import CatchesContext from "../../contexts/CatchesContext";
import CatchContext from "../../contexts/CatchContext";

import { useCatchValidation } from "../../hooks/useCatchValidation";

import CatchButtonBar from "./CatchButtonBar";
import FloatingError from "../ui/FloatingError";

/**
 * EditCatchForm is a functional component that represents the form to edit catch.
 *
 * @component
 * @param {string} catchStatus - The current status of the catch: "", "view" or "edit".
 * @param {object} thisCatch - The catch object that is currently being managed by this component.
 * @param {function} editCatchStatus - A function to manage the catchStatus state.
 * @param {string} catchId - The id of the catch.
 * @param {function} handleCancel - A function to handle cancel action.
 * @returns {JSX.Element} The rendered Catch component.
 */
const EditCatchForm = () => {
	const globalContext = useContext(GlobalContext);
	const catchesContext = useContext(CatchesContext);
	const catchContext = useContext(CatchContext);

	const weightRef = useRef(null);
	const sampledWeightRef = useRef(null);
	const categoryRef = useRef(null);

	const [activeField, setActiveField] = useState(null);

	const { validationErrors, isFormValid, isSpeciesValid, existsCatch } = useCatchValidation(
		catchContext.thisCatch
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		catchesContext.updateCatch(catchContext.thisCatch.catch_id);
		catchContext.editCatchStatus("view");
	};

	const renderContent = () => {
		return (
			<form className="catches__table__row" onSubmit={(e) => handleSubmit(e)}>
				<input
					type="hidden"
					id="haul_id"
					name="haul_id"
					value={catchContext.thisCatch.haul_id}
				/>
				<div className="catches__table__cell">
					<input
						className={` catches__table__group ${
							existsCatch === false ? "" : "species--invalid"
						}`}
						type="number"
						id="group"
						name="group"
						required={true}
						autoFocus
						min="1"
						max="5"
						value={catchContext.thisCatch.group}
						onChange={catchesContext.handleChangeGroup(catchContext.thisCatch.catch_id)}
						aria-label="Group"
					/>
				</div>
				<select
					className={`catches__table__cell catches__table__code ${
						isSpeciesValid === true && existsCatch === false ? "" : "species--invalid"
					}`}
					value={catchContext.thisCatch.sp_id}
					disabled={catchContext.thisCatch.group === "" ? true : false}
					required={true}
					id="sp_code"
					name="sp_code"
					onChange={catchesContext.handleChangeSpecies(catchContext.thisCatch.catch_id)}
					aria-label="Species code"
				>
					<option></option>
					{globalContext.species.map((s) => {
						if (s.group === parseInt(catchContext.thisCatch.group)) {
							return (
								<option value={s.id} key={s.id}>
									{s.sp_code}
								</option>
							);
						} else {
							return null;
						}
					})}
				</select>
				<select
					className={`catches__table__cell catches__table__species ${
						isSpeciesValid === true && existsCatch === false ? "" : "species--invalid"
					}`}
					value={catchContext.thisCatch.sp_id}
					disabled={catchContext.thisCatch.group === "" ? true : false}
					required={true}
					id="sp_name"
					name="sp_name"
					// tabIndex={-1} // In edit mode the select species must be focusable
					onChange={catchesContext.handleChangeSpecies(catchContext.thisCatch.catch_id)}
					aria-label="Species"
				>
					<option value=""></option>
					{globalContext.species.map((s) => {
						if (s.group === parseInt(catchContext.thisCatch.group)) {
							return (
								<option value={s.id} key={s.id}>
									{s.sp_name}
								</option>
							);
						} else {
							return null;
						}
					})}
				</select>
				<div className="catches__table__cell">
					<input
						className={` catches__table__category ${
							existsCatch === false ? "" : "species--invalid"
						}`}
						type="number"
						id="category"
						name="category"
						required={true}
						min="1"
						max="99"
						value={catchContext.thisCatch.category}
						onChange={(e) => {
							catchesContext.handleChangeCategory(catchContext.thisCatch.catch_id)(e);
						}}
						aria-label="Category"
					/>
					<FloatingError
						message={validationErrors.category}
						show={existsCatch}
						inputRef={categoryRef}
					/>
				</div>
				<div className="catches__table__cell">
					<input
						className={` catches__table__weight ${
							validationErrors.weight ? "input-error" : ""
						}`}
						type="number"
						id="weight"
						name="weight"
						required={true}
						min="1"
						max="99999999"
						value={catchContext.thisCatch.weight}
						onChange={catchesContext.handleChangeWeight(
							catchContext.thisCatch.catch_id
						)}
						onFocus={() => setActiveField("weight")}
						onBlur={() => setActiveField(null)}
						aria-label="Weight"
					/>
					<FloatingError
						message={validationErrors.weight}
						show={activeField === "weight"}
						inputRef={weightRef}
					/>
				</div>
				<div className="catches__table__cell">
					<input
						className={`catches__table__sampledWeight ${
							validationErrors.sampledWeight ? "input-error" : ""
						} `}
						type="number"
						id="sampled_weight"
						name="sampled_weight"
						min="0"
						max="99999999"
						value={catchContext.thisCatch.sampled_weight || ""}
						onChange={catchesContext.handleChangeSampledWeight(
							catchContext.thisCatch.catch_id
						)}
						aria-label="Sampled weight"
						onFocus={() => setActiveField("sampledWeight")}
						onBlur={() => setActiveField(null)}
					/>
					<FloatingError
						message={validationErrors.sampledWeight}
						show={activeField === "sampledWeight"}
						inputRef={sampledWeightRef}
					/>
				</div>
				<input
					className="catches__table__cell catches__table__individuals"
					type="number"
					id="individuals"
					name="individuals"
					min="0"
					max="99999999"
					value={catchContext.thisCatch.not_measured_individuals || ""}
					onChange={catchesContext.handleChangeNotMeasuredIndividuals(
						catchContext.thisCatch.catch_id
					)}
					aria-label="Not measured individuals"
				/>
				<CatchButtonBar isFormValid={isFormValid} />
			</form>
		);
	};

	return renderContent();
};

export default EditCatchForm;
