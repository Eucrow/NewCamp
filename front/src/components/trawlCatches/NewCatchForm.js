import React, { useEffect, useRef, useState, useContext } from "react";

import CatchButtonBar from "./CatchButtonBar";

import GlobalContext from "../../contexts/GlobalContext";

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
		category: "",
		weight: "",
		sampled_weight: "",
		// not_measured_individuals: "",
	});

	const [style_species_invalid, setStyle_species_invalid] = useState("");

	const globalContext = useContext(GlobalContext);

	const focusRef = useRef(null);

	const [isFormValid, setIsFormValid] = useState(false);

	// Put focus on the group input when the group changes. This make that when the form is submitted,
	// it is reset and all fields change to "", including the group variable. So when the variable
	// group change, the useEffect runs.
	useEffect(() => {
		if (focusRef.current) {
			focusRef.current.focus();
		}
	}, [newCatch.group]);

	// Check if the species is selected. If not, set the style_species_invalid to species--invalid.
	useEffect(() => {
		if (newCatch.sp_id === "") {
			setStyle_species_invalid("species--invalid");
		} else {
			setStyle_species_invalid("");
		}
	}, [newCatch.sp_id]);

	const validateWeight = () => {
		return newCatch.weight >= newCatch.sampled_weight;
	};

	const validateRequired = () => {
		const requiredFields = {
			group: newCatch.group,
			sp_id: newCatch.sp_id,
			category: newCatch.category,
			weight: newCatch.weight,
		};

		const isValid = Object.values(requiredFields).every(
			(value) => value !== null && value !== "" && value !== "Select species..."
		);

		return isValid;
	};

	const validateForm = () => {
		const isValid = validateWeight() && validateRequired();
		setIsFormValid(isValid);
	};

	// Add useEffect to check validation whenever form fields change
	useEffect(() => {
		validateForm();
	}, [newCatch]);

	const handleInputChange = (field, value) => {
		setNewCatch((prev) => ({ ...prev, [field]: value }));
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
					className={
						"catches__table__cell catches__table__species " + style_species_invalid
					}
					disabled={newCatch.group === "" ? true : false}
					required={true}
					id="sp_code"
					name="sp_code"
					onChange={(e) => handleInputChange("sp_id", e.target.value)}
					aria-label="Species"
				>
					<option>Select species...</option>
					{globalContext.species.map((s) => {
						if (s.group === parseInt(newCatch.group)) {
							return (
								<option value={s.id} key={s.id}>
									{s.sp_code}-{s.sp_name}
								</option>
							);
						} else {
							return null;
						}
					})}
				</select>
				<input
					value={newCatch.category}
					className="catches__table__cell catches__table__category"
					type="number"
					required={true}
					id="category"
					name="category"
					min="1"
					max="99"
					onChange={(e) => handleInputChange("category", e.target.value)}
					aria-label="Category"
				/>
				<input
					value={newCatch.weight}
					className="catches__table__cell catches__table__weight"
					type="number"
					required={true}
					id="weight"
					name="weight"
					min="1"
					max="99999999"
					onChange={(e) => handleInputChange("weight", e.target.value)}
					aria-label="Weight"
				/>
				<input
					className="catches__table__cell catches__table__sampledWeight"
					value={newCatch.sampled_weight}
					type="number"
					id="sampled_weight"
					name="sampled_weight"
					min="0"
					max="99999999"
					onChange={(e) => handleInputChange("sampled_weight", e.target.value)}
					aria-label="Sampled weight"
				/>
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
