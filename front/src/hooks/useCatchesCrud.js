import React, { useState, useEffect } from "react";

/**
 * Custom React hook for managing CRUD operations for catches associated with a specific haul.
 *
 * This hook provides methods to fetch, create, update, and delete catch records from the backend API.
 * It also provides utility functions for checking the existence of a catch and managing local state.
 *
 * @param {number|string} haul_id - The ID of the haul for which catches are managed.
 * @returns {Object} An object containing:
 *   - catches: Array of catch objects.
 *   - setCatches: Function to manually set the catches state.
 *   - existsCatch: Function to check if a catch exists.
 *   - createCatch: Function to create a new catch.
 *   - updateCatch: Function to update an existing catch.
 *   - deleteCatch: Function to delete a catch.
 */
export const useCatchesCrud = (haul_id) => {
	const apiCatches = "http://127.0.0.1:8000/api/1.0/catches/" + haul_id;
	const apiCreateCatch = "http://127.0.0.1:8000/api/1.0/catches/new";
	const apiEditRemoveCatch = "http://127.0.0.1:8000/api/1.0/catch";

	const [catches, setCatches] = useState([]);

	const fetchWithError = async (url, options) => {
		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
			...options,
		});

		if (response.status === 204) {
			return { status: 204 };
		}

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	};

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

			const exists = existsCatch(newCatch.sp_id, newCatch.category, newCatch.catch_id);
			if (exists === true) {
				alert("Catch already exists");
				return;
			}

			const createdCatch = await fetchWithError(apiCreateCatch, {
				method: "POST",
				body: JSON.stringify(newCatch),
			});

			setCatches((prevCatches) => [createdCatch, ...prevCatches]);

			return createdCatch;
		} catch (error) {
			console.error("Error creating catch: ", error);
			throw error;
		}
	};

	/**
	 * Method to update a catch in the database.
	 * @param {number} idx - The index of the catch to update.
	 */
	const updateCatch = async (idx) => {
		try {
			// Find catch to update
			const updatedCatch = catches.find((c) => idx === c.catch_id);
			if (!updatedCatch) {
				throw new Error("Catch not found");
			}

			const requestData = {
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

			const data = await fetchWithError(apiEditRemoveCatch, {
				method: "PUT",
				body: JSON.stringify(requestData),
			});

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
			const response = await fetchWithError(apiEditRemoveCatch, {
				method: "DELETE",
				body: JSON.stringify({ id: idx }),
			});

			if (response.status === 204) {
				console.log("Catch deleted successfully");
				setCatches((prevCatches) => prevCatches.filter((c) => c.catch_id !== idx));
			}
		} catch (error) {
			console.error("Error deleting catch:", error);
			throw error;
		}
	};

	/**
	 * useEffect to fetch catches from the backend API when the component mounts.
	 *
	 * This effect retrieves the list of catches for the given haul_id, sorts them by group, species code, and species name,
	 * and updates the local state. It also preserves and restores the scroll position during the fetch to maintain user experience.
	 * Runs only once on mount.
	 */
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
	}, []);

	return {
		catches,
		setCatches,
		existsCatch,
		createCatch,
		updateCatch,
		deleteCatch,
	};
};
