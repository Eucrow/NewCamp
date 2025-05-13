import React, { useEffect, useRef, useState, useContext } from "react";

import GlobalContext from "../../contexts/GlobalContext";

import { useCatchValidation } from "../../hooks/useCatchValidation";

import CatchButtonBar from "./CatchButtonBar";
import FloatingError from "../ui/FloatingError";

/**
 * CatchForm is a functional component that represents a empty form for adding catch data.
 *
 * @component
 * @returns {JSX.Element} The rendered Catch component.
 */
const NewCatchForm = () => {
	const [newCatch, setNewCatch] = useState({
		group: "",
		sp_id: "",
		sp_code: "",
		sp_name: "",
		category: "",
		weight: "",
		sampled_weight: "",
		// not_measured_individuals: "",
	});

	const [speciesSelected, setSpeciesSelected] = useState({
		sp_code: "",
		sp_name: "",
	});

	const globalContext = useContext(GlobalContext);

	const focusRef = useRef(null);
	const weightRef = useRef(null);
	const sampledWeightRef = useRef(null);
	const categoryRef = useRef(null);

	const [activeField, setActiveField] = useState(null);

	const { validationErrors, isFormValid, isSpeciesValid, existsCatch } =
		useCatchValidation(newCatch);

	// Put focus on the group input when the group changes. This make that when the form is submitted,
	// it is reset and all fields change to "", including the group variable. So when the variable
	// group change, the useEffect runs.
	useEffect(() => {
		if (focusRef.current) {
			focusRef.current.focus();
		}
	}, [newCatch.group]);

	const handleInputChange = (field, value) => {
		if (field === "sp_code" || field === "sp_name") {
			const selSpecies = globalContext.species.find((s) => s.id === parseInt(value));
			if (selSpecies) {
				setNewCatch((prev) => ({
					...prev,
					sp_id: value,
					sp_code: selSpecies.sp_code,
					sp_name: selSpecies.sp_name,
				}));
			}
		} else {
			setNewCatch((prev) => ({ ...prev, [field]: value }));
		}
	};

	const renderContent = () => {
		return (
			<form className="catches__table__row">
				<input
					ref={focusRef}
					value={newCatch.group}
					className="catches__table__cell catches__table__group"
					type="number"
					required={true}
					id="group"
					name="group"
					min="1"
					max="5"
					onChange={(e) => handleInputChange("group", e.target.value)}
					aria-label="Group"
				/>
				<select
					className={`catches__table__cell catches__table__code ${
						isSpeciesValid === true && existsCatch === false ? "" : "species--invalid"
					}`}
					value={newCatch.sp_id}
					disabled={newCatch.group === "" ? true : false}
					required={true}
					id="sp_code"
					name="sp_code"
					onChange={(e) => handleInputChange("sp_id", e.target.value)}
					aria-label="Species code"
				>
					<option></option>
					{globalContext.species.map((s) => {
						if (s.group === parseInt(newCatch.group)) {
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
					value={newCatch.sp_id}
					disabled={newCatch.group === "" ? true : false}
					required={true}
					id="sp_name"
					name="sp_name"
					tabIndex={-1}
					onChange={(e) => handleInputChange("sp_id", e.target.value)}
					aria-label="Species"
				>
					<option value=""></option>
					{globalContext.species.map((s) => {
						if (s.group === parseInt(newCatch.group)) {
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
						value={newCatch.category}
						className={` catches__table__category ${
							existsCatch === false ? "" : "species--invalid"
						}`}
						type="number"
						required={true}
						id="category"
						name="category"
						min="1"
						max="99"
						onChange={(e) => handleInputChange("category", e.target.value)}
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
						value={newCatch.weight}
						className={` catches__table__weight ${
							validationErrors.weight ? "input-error" : ""
						}`}
						type="number"
						required={true}
						id="weight"
						name="weight"
						min="1"
						max="99999999"
						onChange={(e) => handleInputChange("weight", e.target.value)}
						onFocus={() => setActiveField("weight")}
						onBlur={() => setActiveField(null)}
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
						value={newCatch.sampled_weight}
						type="number"
						id="sampled_weight"
						name="sampled_weight"
						min="0"
						max="99999999"
						onChange={(e) => handleInputChange("sampled_weight", e.target.value)}
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
					value={newCatch.not_measured_individuals}
					type="number"
					id="individuals"
					name="individuals"
					min="0"
					max="99999999"
					onChange={(e) => handleInputChange("individuals", e.target.value)}
					aria-label="Not measured individuals"
				/>
				<CatchButtonBar
					newCatch={newCatch}
					setNewCatch={setNewCatch}
					isFormValid={isFormValid}
				/>
			</form>
		);
	};

	return renderContent();
};

export default NewCatchForm;
