import React, { useEffect, useState, useContext } from "react";

import GlobalContext from "../../contexts/GlobalContext";
import CatchesContext from "../../contexts/CatchesContext";

import CatchButtonBar from "./CatchButtonBar";

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
const EditCatchForm = ({ catchStatus, thisCatch, editCatchStatus, catchId, handleCancel }) => {
	const [group, setGroup] = useState("");
	const [sp_id, setSp_id] = useState("");
	const [category, setCategory] = useState("");
	const [weight, setWeight] = useState("");
	const [sampled_weight, setSampled_weight] = useState("");
	const [not_measured_individuals, setNot_measured_individuals] = useState("");
	const [new_catch, setNew_catch] = useState({
		group,
		sp_id,
		category,
		sampled_weight,
		not_measured_individuals,
	});

	const globalContext = useContext(GlobalContext);
	const catchesContext = useContext(CatchesContext);

	const [style_species_invalid, setStyle_species_invalid] = useState("");

	useEffect(() => {
		setNew_catch({ group, sp_id, category, weight, sampled_weight });
	}, [group, sp_id, category, weight, sampled_weight]);

	useEffect(() => {
		if (sp_id === "") {
			setStyle_species_invalid("species--invalid");
		} else {
			setStyle_species_invalid("");
		}
	}, [sp_id]);

	const handleSubmit = (e) => {
		e.preventDefault();
		catchesContext.updateCatch(catchId);
		editCatchStatus("view");
	};

	const renderContent = () => {
		return (
			<form className="catches__table__row" onSubmit={(e) => handleSubmit(e)}>
				<input type="hidden" id="haul_id" name="haul_id" value={thisCatch.haul_id} />
				<input
					className="catches__table__cell catches__table__group"
					type="number"
					id="group"
					name="group"
					required={true}
					autoFocus
					min="1"
					max="5"
					value={thisCatch.group}
					onChange={catchesContext.handleChangeGroup(thisCatch.catch_id)}
					aria-label="Group"
				/>
				<select
					className="catches__table__cell catches__table__species"
					id="sp_code"
					name="sp_code"
					required={true}
					value={thisCatch.sp_id + "--" + thisCatch.sp_code + "--" + thisCatch.sp_name}
					onChange={catchesContext.handleChangeSpecies(thisCatch.catch_id)}
					aria-label="Species"
				>
					{globalContext.species
						.filter((s) => s.group === parseInt(thisCatch.group))
						.map((s) => (
							<option
								key={s.id + "--" + s.sp_code + "--" + s.sp_name}
								value={s.id + "--" + s.sp_code + "--" + s.sp_name}
							>
								{s.sp_code}-{s.sp_name}
							</option>
						))}
				</select>
				<input
					className="catches__table__cell catches__table__category"
					type="number"
					id="category"
					name="category"
					required={true}
					min="1"
					max="99"
					value={thisCatch.category}
					onChange={catchesContext.handleChangeCategory(thisCatch.catch_id)}
					aria-label="Category"
				/>
				<input
					className="catches__table__cell catches__table__weight"
					type="number"
					id="weight"
					name="weight"
					required={true}
					min="1"
					max="99999999"
					value={thisCatch.weight}
					onChange={catchesContext.handleChangeWeight(thisCatch.catch_id)}
					aria-label="Weight"
				/>
				<input
					className="catches__table__cell catches__table__sampledWeight"
					type="number"
					id="sampled_weight"
					name="sampled_weight"
					min="0"
					max="99999999"
					value={thisCatch.sampled_weight || ""}
					onChange={catchesContext.handleChangeSampledWeight(thisCatch.catch_id)}
					aria-label="Sampled weight"
				/>
				<input
					className="catches__table__cell catches__table__individuals"
					type="number"
					id="individuals"
					name="individuals"
					min="0"
					max="99999999"
					value={thisCatch.not_measured_individuals || ""}
					onChange={catchesContext.handleChangeNotMeasuredIndividuals(thisCatch.catch_id)}
					aria-label="Not measured individuals"
				/>
				<CatchButtonBar
					catchStatus={catchStatus}
					editCatchStatus={editCatchStatus}
					handleCancel={handleCancel}
				/>
			</form>
		);
	};

	return renderContent();
};

export default EditCatchForm;
