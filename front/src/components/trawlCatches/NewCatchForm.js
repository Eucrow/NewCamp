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
const NewCatchForm = ({ createCatch, handleChangeAdd }) => {
	const [group, setGroup] = useState("");
	const [sp_id, setSp_id] = useState("");
	const [category, setCategory] = useState("");
	const [weight, setWeight] = useState("");
	const [sampled_weight, setSampled_weight] = useState("");
	const [not_measured_individuals, setNot_measured_individuals] = useState("");

	const [new_catch, setNew_catch] = useState({
		group: "",
		sp_id: "",
		category: "",
		weight: "",
		sampled_weight: "",
		// not_measured_individuals: "",
	});

	const globalContext = useContext(GlobalContext);

	const [style_species_invalid, setStyle_species_invalid] = useState("");

	useEffect(() => {
		setNew_catch({ group, sp_id, category, weight, sampled_weight });
	}, [group, sp_id, category, weight, sampled_weight]);

	useEffect(() => {
		if (new_catch.sp_id === "") {
			setStyle_species_invalid("species--invalid");
		} else {
			setStyle_species_invalid("");
		}
	}, [new_catch.sp_id]);

	const renderContent = () => {
		return (
			<form
				className="catches__table__row"
				onSubmit={(e) => {
					e.preventDefault();
					createCatch(new_catch);
					setNew_catch({
						group: "",
						sp_id: "",
						category: "",
						weight: "",
						sampled_weight: "",
						// not_measured_individuals: "",
					});
				}}
			>
				<input
					value={new_catch.group}
					className="catches__table__cell catches__table__group"
					type="number"
					required={true}
					autoFocus
					id="group"
					name="group"
					min="1"
					max="5"
					onChange={(e) => {
						setNew_catch({ ...new_catch, group: e.target.value });
					}}
					aria-label="Group"
				/>
				<select
					className={
						"catches__table__cell catches__table__species " + style_species_invalid
					}
					disabled={new_catch.group === "" ? true : false}
					required={true}
					id="sp_code"
					name="sp_code"
					onChange={(e) => {
						setNew_catch({ ...new_catch, sp_id: e.target.value });
					}}
					aria-label="Species"
				>
					<option>Select species...</option>
					{globalContext.species.map((s) => {
						if (s.group === parseInt(new_catch.group)) {
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
					value={new_catch.category}
					className="catches__table__cell catches__table__category"
					type="number"
					required={true}
					id="category"
					name="category"
					min="1"
					max="99"
					onChange={(e) => {
						setNew_catch({ ...new_catch, category: e.target.value });
					}}
					aria-label="Category"
				/>
				<input
					value={new_catch.weight}
					className="catches__table__cell catches__table__weight"
					type="number"
					required={true}
					id="weight"
					name="weight"
					min="1"
					max="99999999"
					onChange={(e) => {
						setNew_catch({ ...new_catch, weight: e.target.value });
					}}
					aria-label="Weight"
				/>
				<input
					className="catches__table__cell catches__table__sampledWeight"
					value={new_catch.sampled_weight}
					type="number"
					id="sampled_weight"
					name="sampled_weight"
					min="0"
					max="99999999"
					onChange={(e) => {
						setNew_catch({ ...new_catch, sampled_weight: e.target.value });
					}}
					aria-label="Sampled weight"
				/>
				<input
					className="catches__table__cell catches__table__individuals"
					value={new_catch.not_measured_individuals}
					type="number"
					id="individuals"
					name="individuals"
					min="0"
					max="99999999"
					onChange={(e) => {
						setNew_catch({ ...new_catch, not_measured_individuals: e.target.value });
					}}
					aria-label="Not measured individuals"
				/>
				<CatchButtonBar catchStatus={"add"} handleChangeAdd={handleChangeAdd} />
			</form>
		);
	};

	return renderContent();
};

export default NewCatchForm;
