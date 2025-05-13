import React, { useState, useEffect, useContext } from "react";

import "../../contexts/CatchesContext.js";

import Catch from "./Catch.js";
import CatchesButtonBar from "./CatchesButtonBar.js";
import CatchesContext from "../../contexts/CatchesContext.js";
import GlobalContext from "../../contexts/GlobalContext.js";

/**
 * Renders a list of catches for a specific haul.
 * @param {number}haul_id - The id of the haul.
 * @returns {JSX.Element} The Catches component.
 */
const Catches = ({ haul_id }) => {
	const [catches, setCatches] = useState([]);
	const [add, setAdd] = useState(false);
	const [editingCatchId, setEditingCatchId] = useState(null);

	const globalContext = useContext(GlobalContext);

	const apiCatches = "http://127.0.0.1:8000/api/1.0/catches/" + haul_id;
	const apiCreateCatch = "http://127.0.0.1:8000/api/1.0/catches/new";
	const apiEditRemoveCatch = "http://127.0.0.1:8000/api/1.0/catch";

	const deleteCatch = (idx) => {
		const request = { id: idx };

		fetch(apiEditRemoveCatch, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(request),
		})
			.then(() => {
				setCatches(
					catches.filter((c) => {
						return idx !== c.catch_id;
					})
				);
			})
			.catch((error) => alert(error));
	};

	/**
	 * Method to manage the group field.
	 * @param {number} idx - The index of the catch.
	 */
	const handleChangeGroup = (idx) => (evt) => {
		const value = evt.target.value;

		const newCatches = catches.map((c) => {
			if (idx !== c.catch_id) return c;
			return { ...c, group: value };
		});

		setCatches(newCatches);
	};

	/**
	 * Method to manage the species field.
	 * @param {number} idx - The index of the catch.
	 */
	const handleChangeSpecies = (idx) => (evt) => {
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

	/**
	 * Method to manage the category field.
	 * @param {number} idx - The index of the catch.
	 */
	const handleChangeCategory = (idx) => (evt) => {
		const value = evt.target.value;

		const newCatches = catches.map((c) => {
			if (c.catch_id !== idx) return c;
			return {
				...c,
				category: value,
			};
		});

		setCatches(newCatches);
		// }
	};

	/**
	 * Method to manage the weight field.
	 * @param {number} idx - The index of the catch.
	 */
	const handleChangeWeight = (idx) => (evt) => {
		const value = evt.target.value;

		const newCatches = catches.map((c) => {
			if (c.catch_id !== idx) return c;
			return {
				...c,
				weight: value,
			};
		});

		setCatches(newCatches);
	};

	/**
	 * Method to manage the sampled weight field.
	 * @param {number} idx - The index of the catch.
	 */
	const handleChangeSampledWeight = (idx) => (evt) => {
		const value = evt.target.value;

		const newCatches = catches.map((c) => {
			if (c.catch_id !== idx) return c;
			return {
				...c,
				sampled_weight: value,
			};
		});

		setCatches(newCatches);
	};

	/**
	 * Method to manage the sampled weight field.
	 * @param {number} idx - The index of the catch.
	 */
	const handleChangeNotMeasuredIndividuals = (idx) => (evt) => {
		const value = evt.target.value === "0" ? null : evt.target.value;

		const newCatches = catches.map((c) => {
			if (c.catch_id !== idx) return c;
			return {
				...c,
				not_measured_individuals: value,
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

	/**
	 * Method to update a catch in the database.
	 * @param {number} idx - The index of the catch to update.
	 */
	const updateCatch = (idx) => {
		const updatedCatch = catches.find(function (c) {
			return idx === c.catch_id;
		});

		const request = {
			catch_id: updatedCatch.catch_id,
			haul_id: updatedCatch.haul,
			sp_code: updatedCatch.sp_code,
			group: updatedCatch.group,
			category: updatedCatch.category,
			weight: updatedCatch.weight,
			sampled_weight:
				updatedCatch.sampled_weight === "0" ? null : updatedCatch.sampled_weight,
			not_measured_individuals:
				updatedCatch.not_measured_individuals === "0"
					? null
					: updatedCatch.not_measured_individuals,
		};

		fetch(apiEditRemoveCatch, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request),
		})
			.then((response) => response.json())
			.then(() => {
				setEditingCatchId(null);
			})
			.catch((error) => alert(error));
	};

	/**
	 * Method to check if a catch with a specific haul_id, sp_id, and category exists in the list of catches.
	 * @param {number} sp_id - The id of the species to check.
	 * @param {string} category - The category of the catch to check.
	 * @param {number} originalCatchId - The id of the original catch being edited (if any).
	 * @returns {boolean} Returns true if the catch exists, false otherwise.
	 */
	const existsCatch = (sp_id, category, originalCatchId) => {
		if (!sp_id || !category) return false;

		// Start with all catches except the one being edited
		const activeCatches = originalCatchId
			? catches.filter((item) => item.catch_id !== originalCatchId)
			: catches;

		return activeCatches.some(
			(item) =>
				parseInt(item.sp_id) === parseInt(sp_id) &&
				parseInt(item.category) === parseInt(category)
		);
	};

	/**
	 * Method to create a new catch.
	 * If the catch already exists, it alerts the user.
	 * @param {Object} newCatch - The new catch to be created.
	 */
	const createCatch = async (newCatch) => {
		try {
			// add haul id to data request:
			newCatch["haul_id"] = haul_id;

			const exists = await existsCatch(newCatch.haul_id, newCatch.sp_id, newCatch.category);
			if (exists === true) {
				alert("Catch already exists");
				return;
			}

			// Create new catch
			const response = await fetch(apiCreateCatch, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newCatch),
			});
			if (!response.ok) {
				throw new Error(
					"Something went wrong! " + response.status + " " + response.statusText
				);
			}

			const createdCatch = await response.json();
			setCatches([createdCatch, ...catches]);
		} catch (error) {
			console.error("Error creating catch: ", error);
			alert("Error creating catch: " + error.message);
		}
	};

	useEffect(() => {
		const fetchCatches = async () => {
			// Save scroll position
			const scrollY = window.scrollY;

			try {
				const data = await fetch(apiCatches);
				if (!data.ok) {
					throw new Error("Something went wrong! " + data.status + " " + data.statusText);
				}
				setCatches(await data.json());
			} catch (error) {
				console.error("Error fetching data: ", error);
			} finally {
				// Restore scroll position
				window.scrollTo(0, scrollY);
			}
		};
		fetchCatches();
	}, [apiCatches]);

	const renderContent = () => {
		return (
			<CatchesContext.Provider
				value={{
					handleChangeGroup: handleChangeGroup,
					handleChangeSpecies: handleChangeSpecies,
					handleChangeCategory: handleChangeCategory,
					handleChangeWeight: handleChangeWeight,
					handleChangeSampledWeight: handleChangeSampledWeight,
					handleChangeNotMeasuredIndividuals: handleChangeNotMeasuredIndividuals,
					handleCancelEditCatch: handleCancelEditCatch,
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
						<div className="catches__table__row catches__table__header">
							<div className="catches__table__cell catches__table__group">Group</div>
							<div className="catches__table__cell catches__table__code">Code</div>
							<div className="catches__table__cell catches__table__species">
								Species
							</div>
							<div className="catches__table__cell catches__table__category">
								Category
							</div>
							<div className="catches__table__cell catches__table__weight">
								Weight (g.)
							</div>
							<div className="catches__table__cell catches__table__sampledWeight">
								Sampled weight (g.)
							</div>
							<div className="catches__table__cell catches__table__individuals">
								Not measured individuals
							</div>
							{add === false && (
								<div className="catches__table__cell catches__table__buttonBar">
									<CatchesButtonBar add={add} handleChangeAdd={setAdd} />
								</div>
							)}
						</div>

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
