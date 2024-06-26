import React, { useEffect, useState, useContext } from "react";
import CatchButtonBar from "./CatchButtonBar";
import GlobalContext from "../../contexts/GlobalContext";

/**
 * CatchForm is a functional component that represents a form for managing catch data.
 *
 * @component
 * @param {string} catchStatus - The current status of the catch: "", "view" or "edit".
 * @param {object} thisCatch - The catch object that is currently being managed by this component.
 * @param {object} species - An object containing species data.
 * @param {function} createCatch - A function to create a new catch in the database.
 * @param {function} handleChangeGroup - A function to handle changes to the group field.
 * @param {function} handleChangeSpecies - A function to handle changes to the species field.
 * @param {function} handleChangeCategory - A function to handle changes to the category field.
 * @param {function} handleChangeWeight - A function to handle changes to the weight field.
 * @param {function} handleChangeSampledWeight - A function to handle changes to the sampled_weight field.
 * @param {function} updateCatch - A function to update the catch in the database.
 * @param {function} editCatchStatus - A function to manage the catchStatus state.
 * @param {string} catchId - The id of the catch.
 * @param {boolean} viewSexes - A boolean to manage the view of sexes.
 * @param {function} handleCancel - A function to handle cancel action.
 * @param {function} deleteCatch - A function to delete the catch from the database.
 * @param {function} handleViewSexes - A function to handle the view of sexes.
 * @param {function} handleChangeAdd - A function to handle changes to the add field.
 * @returns {JSX.Element} The rendered Catch component.
 */
const CatchForm = ({
	catchStatus,
	thisCatch,
	createCatch,
	handleChangeGroup,
	handleChangeSpecies,
	handleChangeCategory,
	handleChangeWeight,
	handleChangeSampledWeight,
	handleChangeNotMeasuredIndividuals,
	updateCatch,
	editCatchStatus,
	catchId,
	viewSexes,
	handleCancel,
	deleteCatch,
	handleViewSexes,
	handleChangeAdd,
	allowedSexes,
}) => {
	const [group, setGroup] = useState("");
	const [sp_id, setSp_id] = useState("");
	const [category, setCategory] = useState("");
	const [weight, setWeight] = useState("");
	const [sampled_weight, setSampled_weight] = useState("");
	const [not_measured_individuals, setNot_measured_individuals] = useState("");
	const [new_catch, setNew_catch] = useState({ group, sp_id, category, sampled_weight, not_measured_individuals });
	const globalContext = useContext(GlobalContext);

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

	const renderContent = () => {
		if (catchStatus === "add") {
			return (
				<form
					className="catches__table__row"
					onSubmit={(e) => {
						e.preventDefault();
						createCatch(new_catch);
					}}
				>
					<input
						value={group}
						className="catches__table__cell catches__table__group"
						type="number"
						required={true}
						autoFocus
						id="group"
						name="group"
						min="1"
						max="5"
						onChange={(e) => setGroup(e.target.value)}
						aria-label="Group"
					/>
					<select
						className={"catches__table__cell catches__table__species " + style_species_invalid}
						disabled={group === "" ? true : false}
						required={true}
						id="sp_code"
						name="sp_code"
						onChange={(e) => setSp_id(e.target.value)}
						aria-label="Species"
					>
						<option>Select species...</option>
						{globalContext.species.map((s) => {
							if (s.group === parseInt(group)) {
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
						value={category}
						className="catches__table__cell catches__table__category"
						type="number"
						required={true}
						id="category"
						name="category"
						min="1"
						max="99"
						onChange={(e) => setCategory(e.target.value)}
						aria-label="Category"
					/>
					<input
						value={weight}
						className="catches__table__cell catches__table__weight"
						type="number"
						required={true}
						id="weight"
						name="weight"
						min="1"
						max="99999999"
						onChange={(e) => setWeight(e.target.value)}
						aria-label="Weight"
					/>
					<input
						className="catches__table__cell catches__table__sampledWeight"
						type="number"
						id="sampled_weight"
						name="sampled_weight"
						min="0"
						max="99999999"
						onChange={(e) => setSampled_weight(e.target.value)}
						aria-label="Sampled weight"
					/>
					<input
						className="catches__table__cell catches__table__individuals"
						type="number"
						id="individuals"
						name="individuals"
						min="0"
						max="99999999"
						onChange={(e) => setNot_measured_individuals(e.target.value)}
						aria-label="Not measured individuals"
					/>
					<CatchButtonBar catchStatus={"add"} handleChangeAdd={handleChangeAdd} />
				</form>
			);
		} else if (catchStatus === "view" || catchStatus === "") {
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
		} else if (catchStatus === "edit") {
			return (
				<form
					className="catches__table__row"
					onSubmit={(e) => {
						e.preventDefault();
						updateCatch(catchId);
						editCatchStatus("view");
					}}
				>
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
						onChange={handleChangeGroup(thisCatch.catch_id)}
						aria-label="Group"
					/>
					<select
						className="catches__table__cell catches__table__species"
						id="sp_code"
						name="sp_code"
						required={true}
						value={thisCatch.sp_id + "--" + thisCatch.sp_code + "--" + thisCatch.sp_name}
						onChange={handleChangeSpecies(thisCatch.catch_id)}
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
						onChange={handleChangeCategory(thisCatch.catch_id)}
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
						onChange={handleChangeWeight(thisCatch.catch_id)}
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
						onChange={handleChangeSampledWeight(thisCatch.catch_id)}
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
						onChange={handleChangeNotMeasuredIndividuals(thisCatch.catch_id)}
						aria-label="Not measured individuals"
					/>
					<CatchButtonBar
						catchStatus={catchStatus}
						editCatchStatus={editCatchStatus}
						handleCancel={handleCancel}
					/>
				</form>
			);
		}
	};

	return renderContent();
};

export default CatchForm;
