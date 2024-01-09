import React, { useState, useEffect } from "react";

import Catch from "./Catch.js";
import CatchesButtonBar from "./CatchesButtonBar.js";

/**
 * Renders a list of catches for a specific haul.
 * @param {number}haul_id - The id of the haul.
 * @returns {JSX.Element} The Catches component.
 */
const Catches = ({ haul_id }) => {
	const [catches, setCatches] = useState([]);
	const [add, setAdd] = useState(false);

	const apiCatches = "http://127.0.0.1:8000/api/1.0/catches/" + haul_id;
	const apiCatch = "http://127.0.0.1:8000/api/1.0/catch/";
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
						return idx !== c.id;
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
			if (idx !== c.id) return c;
			return { ...c, group: value };
		});

		setCatches(newCatches);
	};

	/**
	 * Method to manage the species field.
	 * @param {number} idx - The index of the catch.
	 */
	const handleChangeSpecies = (idx) => (evt) => {
		const value = evt.target.value;
		const val = value.split("--");
		const sp = val[0];
		const sp_code = val[1];
		const sp_name = val[2];

		const newCatches = catches.map((c) => {
			if (idx !== c.id) return c;
			return {
				...c,
				sp_id: sp,
				sp_code: sp_code,
				sp_name: sp_name,
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

		// Firstly, get the data of catch to modify
		const thisCatch = catches.find((c) => {
			if (c.id === idx) {
				return c;
			}
			return false;
		});

		// Secondly, check if exists another catch whith the same species and category
		const repeatedCatch = catches.some(
			(c) => (c.group === thisCatch.group) & (c.sp_code === thisCatch.sp_code) & (c.category === parseInt(value))
		);

		// And finally save the state or thrown an alert.
		if (repeatedCatch === true) {
			alert("This category of the species already exists");
		} else if (repeatedCatch === false) {
			const newCatches = catches.map((c) => {
				if (c.id !== idx) return c;
				return {
					...c,
					category: value,
				};
			});

			setCatches(newCatches);
		}
	};

	/**
	 * Method to manage the weight field.
	 * @param {number} idx - The index of the catch.
	 */
	const handleChangeWeight = (idx) => (evt) => {
		const value = evt.target.value;

		const newCatches = catches.map((c) => {
			if (c.id !== idx) return c;
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
			if (c.id !== idx) return c;
			return {
				...c,
				sampled_weight: value,
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
			if (c.id !== idx) return c;
			return {
				...c,
				id: backupCatch.id,
				group: backupCatch.group,
				weight: backupCatch.weight,
				sampled_weight: backupCatch.sampled_weight,
				category: backupCatch.category,
				sp_code: backupCatch.sp_code,
				sp_id: backupCatch.sp_id,
				sp_name: backupCatch.sp_name,
			};
		});

		setCatches(newCatches);
	};

	/**
	 * Method to update a catch in the database.
	 * @param {number} idx - The index of the catch to update.
	 */
	const updateCatch = (idx) => {
		const updatedCatch = catches.find(function (c) {
			return idx === c.id;
		});

		const request = {
			catch_id: updatedCatch.id,
			haul_id: updatedCatch.haul,
			sp_code: updatedCatch.sp_code,
			group: updatedCatch.group,
			category: updatedCatch.category,
			weight: updatedCatch.weight,
			sampled_weight: updatedCatch.sampled_weight,
		};

		fetch(apiEditRemoveCatch, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request),
		})
			.then((response) => response.json())
			.catch((error) => alert(error));
	};

	/**
	 * Method to check if a catch with a specific haul_id, sp_id, and category exists in the list of catches.
	 * @param {number} haulId - The id of the haul to check.
	 * @param {number} spId - The id of the species to check.
	 * @param {string} category - The category of the catch to check.
	 * @returns {boolean} Returns true if the catch exists, false otherwise.
	 */
	const existsCatch = (haulId, spId, category) => {
		const thisApiCatch = apiCatch + haulId + "/" + spId + "/" + category;

		return fetch(thisApiCatch).then((response) => {
			if (response.status === 200) {
				return true;
			} else {
				return false;
			}
		});
	};

	/**
	 * Method to create a new catch.
	 * If the catch already exists, it alerts the user.
	 * @param {Object} newCatch - The new catch to be created.
	 */
	const createCatch = (newCatch) => {
		// add haul id to data request:
		newCatch["haul_id"] = haul_id;

		existsCatch(newCatch.haul_id, newCatch.sp_id, newCatch.category).then((response) => {
			if (response === true) {
				alert("Catch already exists");
			} else {
				fetch(apiCreateCatch, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newCatch),
				})
					.then((response) => response.json())
					.then((c) => {
						const newCatches = [c, ...catches];
						setCatches(newCatches);
						setAdd(false);
					})
					.catch((error) => console.log(error));
			}
		});
	};

	useEffect(() => {
		const fetchCatches = async () => {
			try {
				const data = await fetch(apiCatches);
				if (!data.ok) {
					throw new Error("Something went wrong! " + data.status + " " + data.statusText);
				}
				setCatches(await data.json());
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};
		fetchCatches();
	}, [apiCatches]);

	const renderContent = () => {
		return (
			<fieldset className="wrapper form__row form--wide catchesList">
				<legend>Fauna list</legend>
				<CatchesButtonBar add={add} handleChangeAdd={setAdd} />
				{add === true ? (
					<Catch thisCatchStatus="add" createCatch={createCatch} handleChangeAdd={setAdd} />
				) : null}
				{catches.map((c) => {
					return (
						<Catch
							key={c.id}
							thisCatch={c}
							handleChangeSampledWeight={handleChangeSampledWeight}
							handleChangeGroup={handleChangeGroup}
							handleChangeSpecies={handleChangeSpecies}
							handleChangeCategory={handleChangeCategory}
							handleChangeWeight={handleChangeWeight}
							handleCancelEditCatch={handleCancelEditCatch}
							updateCatch={updateCatch}
							deleteCatch={deleteCatch}
						/>
					);
				})}
			</fieldset>
		);
	};

	return renderContent();
};

export default Catches;
