import React, { useState, useEffect } from "react";

export const useCatchesCrud = (haul_id) => {
	const apiCatches = "http://127.0.0.1:8000/api/1.0/catches/" + haul_id;
	const apiCreateCatch = "http://127.0.0.1:8000/api/1.0/catches/new";
	const apiEditRemoveCatch = "http://127.0.0.1:8000/api/1.0/catch";

	const [catches, setCatches] = useState([]);

	useEffect(() => {
		const fetchCatches = async () => {
			// Save scroll position
			const scrollY = window.scrollY;

			try {
				const data = await fetch(apiCatches);
				if (!data.ok) {
					throw new Error("Something went wrong! " + data.status + " " + data.statusText);
				}

				const fetchedCatches = await data.json();

				// Sort the fetched catches directly before setting state
				const sortedCatches = [...fetchedCatches].sort((a, b) => {
					// Compare group first
					const groupCompare = Number(a.group) - Number(b.group);
					if (groupCompare !== 0) return groupCompare;

					// If groups are equal, compare by code
					const codeCompare = Number(a.sp_code) - Number(b.sp_code);
					if (codeCompare !== 0) return codeCompare;

					// If codes are equal, compare by name
					return a.sp_name.localeCompare(b.sp_name);
				});

				setCatches(sortedCatches);
			} catch (error) {
				console.error("Error fetching data: ", error);
			} finally {
				// Restore scroll position
				window.scrollTo(0, scrollY);
			}
		};
		fetchCatches();
	}, [haul_id]);

	/**
	 * Method to check if a catch with a specific haul_id, sp_id, and category exists in the list of catches.
	 * @param {number} sp_id - The id of the species to check.
	 * @param {string} category - The category of the catch to check.
	 * @param {number} originalCatchId - The id of the original catch being edited (if any).
	 * @returns {boolean} Returns true if the catch exists, false otherwise.
	 */
	const existsCatch = (sp_id, category, originalCatchId) => {
		if (sp_id === "" || category === "") return false;

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

	/**
	 * Method to update a catch in the database.
	 * @param {number} idx - The index of the catch to update.
	 */
	const updateCatch = async (idx) => {
		try {
			const updatedCatch = catches.find((c) => idx === c.catch_id);
			if (!updatedCatch) {
				throw new Error("Catch not found");
			}

			const request = {
				catch_id: updatedCatch.catch_id,
				haul_id: updatedCatch.haul_id,
				haul: updatedCatch.haul,
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

			const response = await fetch(apiEditRemoveCatch, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(request),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			// Update local state
			setCatches((prevCatches) => prevCatches.map((c) => (c.catch_id === idx ? data : c)));

			return data;
		} catch (error) {
			console.error("Error updating catch:", error);
			throw error;
		}
	};

	/**
	 * Method to delete a catch from the database and update local state.
	 * @param {number} idx - The ID of the catch to delete.
	 */
	const deleteCatch = async (idx) => {
		try {
			const request = { id: idx };
			const response = await fetch(apiEditRemoveCatch, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(request),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			// Update local state using functional update
			setCatches((prevCatches) => prevCatches.filter((c) => c.catch_id !== idx));
		} catch (error) {
			console.error("Error deleting catch:", error);
			throw error;
		}
	};

	return {
		catches,
		setCatches,
		existsCatch,
		createCatch,
		updateCatch,
		deleteCatch,
	};
};
