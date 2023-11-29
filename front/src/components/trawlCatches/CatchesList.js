import React, { useState, useEffect } from "react";

import Catch from "./Catch.js";
import CatchesButtonBar from "./CatchesButtonBar.js";

/**
 * Renders a list of catches for a specific haul.
 * @param {number}haul_id - The id of the haul.
 * @returns {JSX.Element} The CatchesList component.
 */
const CatchesList = ({ haul_id }) => {
	const [catches, setCatches] = useState([]);
	const [species, setSpecies] = useState([]);
	const [, setPlaceholder] = useState("Loading");
	const [add, setAdd] = useState(false);

	const apiCatches = "http://127.0.0.1:8000/api/1.0/catches/";
	const apiCatch = "http://127.0.0.1:8000/api/1.0/catch/";
	const apiCreateCatch = "http://127.0.0.1:8000/api/1.0/catches/new";
	// TODO: change the apiSpecies api to only return the id, sp_name, group and sp_code variables.
	const apiSpecies = "http://127.0.0.1:8000/api/1.0/species";
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
	 * Method to manage the group field. When it is changed, get the species of the group.
	 * Then, update the state.
	 *
	 * @param {number} idx - The index of the catch.
	 * @returns {Function} The handleChangeGroup function.
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
	 * Method to manage the species field. When it is changed, it splits the value into species, species code, and species name.
	 * Then, it updates the state with the new species information.
	 *
	 * @param {number} idx - The index of the catch.
	 * @returns {Function} The handleChangeSpecies function which takes an event as an argument.
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
	 * Method to manage the category field. When it is changed, it updates the state with the new category information.
	 *
	 * @param {number} idx - The index of the catch.
	 * @returns {Function} The handleChangeCategory function which takes an event as an argument.
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
	 * @param {object} old_state catch state previous to the edition.
	 */
	const handleCancelEditCatch = (idx, old_state) => {
		const newCatches = catches.map((c) => {
			if (c.id !== idx) return c;
			return {
				...c,
				id: old_state.id,
				group: old_state.group,
				weight: old_state.weight,
				sampled_weight: old_state.sampled_weight,
				category: old_state.category,
				sp_code: old_state.sp_code,
				sp_id: old_state.sp_id,
				sp_name: old_state.sp_name,
			};
		});

		setCatches(newCatches);
	};

	const updateCatch = (idx) => {
		/**
		 * Update catch in database.
		 */

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

	const existsCatch = (haul_id, sp_id, category) => {
		/**
		 * Method to check if a catch exists in database.
		 * @param {number} haul_id: id of haul.
		 * @param {number} category_id: id of category.
		 */

		const thisApiCatch = apiCatch + haul_id + "/" + sp_id + "/" + category;

		return fetch(thisApiCatch).then((response) => {
			if (response.status === 200) {
				return true;
			} else {
				return false;
			}
		});
	};

	const createCatch = (e, new_catch) => {
		/**
		 * Save catch to database.
		 */

		e.preventDefault();

		// add haul id to data request:
		new_catch["haul_id"] = haul_id;

		existsCatch(new_catch.haul_id, new_catch.sp_id, new_catch.category).then((response) => {
			if (response === true) {
				alert("Catch already exists");
			} else {
				fetch(apiCreateCatch, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(new_catch),
				})
					.then((response) => response.json())
					.then((c) => {
						const new_catches = [...catches, c];
						setCatches(new_catches);
						setAdd(false);
					})
					.catch((error) => console.log(error));
			}
		});
	};

	useEffect(() => {
		const thisApiCatches = apiCatches + haul_id;

		fetch(thisApiCatches)
			.then((response) => {
				if (response.status > 400) {
					setPlaceholder("Something went wrong!");
				}
				return response.json();
			})
			.then((catches) => {
				setCatches(catches);
			});

		fetch(apiSpecies)
			.then((response) => {
				if (response.status > 400) {
					setPlaceholder("Something went wrong!");
				}
				return response.json();
			})
			.then((species) => {
				setSpecies(species);
			});
	}, [haul_id]);

	const renderContent = () => {
		return (
			<fieldset className="wrapper form__row form--wide catchesList">
				<legend>Biometric sampling</legend>
				<CatchesButtonBar add={add} handleChangeAdd={setAdd} />
				{add === true ? (
					<Catch
						this_catch_status="add"
						species={species}
						createCatch={createCatch}
						handleChangeAdd={setAdd}
					/>
				) : null}
				{catches.map((c) => {
					return (
						<Catch
							key={c.id}
							this_catch={c}
							species={species}
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

export default CatchesList;
