import React, { useState, useContext } from "react";

import CatchesContext from "../../contexts/CatchesContext.js";
import GlobalContext from "../../contexts/GlobalContext.js";

import { useSortCatches } from "../../hooks/useSortCatches.js";
import { useCatchesCrud } from "../../hooks/useCatchesCrud.js";

import Catch from "./Catch.js";
import CatchesHeader from "./CatchesHeader.js";

/**
 * Renders a list of catches for a specific haul.
 * @param {number}haul_id - The id of the haul.
 * @returns {JSX.Element} The Catches component.
 */
const Catches = ({ haul_id }) => {
	const [add, setAdd] = useState(false);
	const [editingCatchId, setEditingCatchId] = useState(null);
	const { catches, setCatches, existsCatch, createCatch, updateCatch, deleteCatch } =
		useCatchesCrud(haul_id);
	const { sortCatches, sortConfig } = useSortCatches(catches);

	const globalContext = useContext(GlobalContext);

	/**
	 * Method to manage the group field.
	 * @param {number} idx - The index of the catch.
	 */
	const handleChangeGroup = (idx) => (evt) => {
		const value = evt.target.value;

		const newCatches = catches.map((c) => {
			if (idx !== c.catch_id) return c;
			return {
				...c,
				group: value,
				sp_id: "",
				sp_code: "",
				sp_name: "",
			};
		});

		setCatches(newCatches);
	};

	const handleChangeSpeciesName = (idx) => (evt) => {
		const sp_id = parseInt(evt.target.value);

		const species = globalContext.species.filter((s) => {
			if (s.id === sp_id) {
				return s;
			}
			return false;
		})[0];

		const newCatches = catches.map((c) => {
			if (idx !== c.catch_id) return c;
			return {
				...c,
				sp_id: sp_id,
				sp_code: species.sp_code,
				sp_name: species.sp_name,
			};
		});

		setCatches(newCatches);
	};

	const handleChangeSpeciesCode = (idx, sp_group) => (evt) => {
		const sp_code = parseInt(evt.target.value);

		const species = globalContext.species.find((s) => {
			if (s.sp_code === parseInt(sp_code) && s.group === parseInt(sp_group)) {
				return s;
			}
			return false;
		});

		const newCatches = catches.map((c) => {
			if (idx !== c.catch_id) return c;
			return {
				...c,
				sp_id: species.id,
				sp_code: sp_code,
				sp_name: species.sp_name,
			};
		});

		setCatches(newCatches);
	};

	/**
	 * Method to handle input changes for catch fields.
	 * @param {number} idx - The index of the catch being edited.
	 * @param {string} field - The field being edited (e.g., 'weight', 'sampled_weight', 'not_measured_individuals').
	 * @returns {function} A function that takes an event and updates the catch field.
	 * */
	const handleInputChange = (idx, field) => (evt) => {
		const value = evt.target.value === "0" || evt.target.value === "" ? null : evt.target.value;

		const newCatches = catches.map((c) => {
			if (c.catch_id !== idx) return c;
			return {
				...c,
				[field]: value,
			};
		});

		setCatches(newCatches);
	};

	/**
	 * Manage cancellation of catch edition.
	 * @param {number} idx haul id.
	 * @param {object} backupCatch catch state previous to the edition.
	 */
	const handleCancelEditCatch = (idx, backupCatch) => {
		const newCatches = catches.map((c) => {
			if (c.catch_id !== idx) return c;
			return {
				...c,
				id: backupCatch.catch_id,
				group: backupCatch.group,
				weight: backupCatch.weight,
				sampled_weight: backupCatch.sampled_weight,
				not_measured_individuals: backupCatch.not_measured_individuals,
				category: backupCatch.category,
				sp_code: backupCatch.sp_code,
				sp_id: backupCatch.sp_id,
				sp_name: backupCatch.sp_name,
			};
		});

		setCatches(newCatches);
		setEditingCatchId(null);
	};

	const handleChangeSexLengths = (idx, sex) => (lengths) => {
		// Sum up all number_individuals from the lengths array
		const totalIndividuals = lengths.reduce((sum, length) => {
			return sum + (Number(length.number_individuals) || 0);
		}, 0);

		const newCatches = catches.map((c) => {
			if (c.catch_id !== idx) return c;

			// Update the individuals_by_sex object for the specific sex
			const updatedIndividualsBySex = {
				...c.individuals_by_sex,
				[sex]: totalIndividuals,
			};

			return {
				...c,
				individuals_by_sex: updatedIndividualsBySex,
			};
		});

		setCatches(newCatches);
	};

	const handleSortCatches = (field) => {
		const sortedData = sortCatches(field);
		setCatches(sortedData);
	};

	const renderContent = () => {
		return (
			<CatchesContext.Provider
				value={{
					handleChangeGroup: handleChangeGroup,
					handleChangeSpeciesName: handleChangeSpeciesName,
					handleChangeSpeciesCode: handleChangeSpeciesCode,
					handleCancelEditCatch: handleCancelEditCatch,
					handleInputChange: handleInputChange,
					handleChangeSexLengths: handleChangeSexLengths,
					// TODO: I don't understand why can't add handleChangeAdd to the context?
					// handleChangeAdd: setAdd,
					createCatch: createCatch,
					updateCatch: updateCatch,
					deleteCatch: deleteCatch,
					add: add,
					editingCatchId: editingCatchId,
					setEditingCatchId: setEditingCatchId,
					existsCatch: existsCatch,
					haul_id: haul_id,
				}}
			>
				<fieldset className="wrapper catchesList">
					<legend>Fauna list</legend>

					<div className="catches__table">
						<CatchesHeader
							sortConfig={sortConfig}
							handleSortCatches={handleSortCatches}
							add={add}
							setAdd={setAdd}
						/>

						{add === true ? (
							<Catch thisCatchStatus="add" handleChangeAdd={setAdd} />
						) : null}
						{catches.map((c) => {
							return <Catch key={c.catch_id} thisCatch={c} />;
						})}
					</div>
				</fieldset>
			</CatchesContext.Provider>
		);
	};

	return renderContent();
};

export default Catches;
