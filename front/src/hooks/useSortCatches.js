import { useState, useCallback } from "react";

/**
 * Custom hook for handling catch sorting functionality
 * @param {Array} catches - The array of catches to sort
 * @returns {Object} Sorting state and functions
 */
export const useSortCatches = (catches) => {
	const [sortConfig, setSortConfig] = useState({
		field: "group",
		direction: "desc",
	});

	const compareStrings = (a, b) => a.localeCompare(b) * (sortConfig.direction === "asc" ? 1 : -1);

	const compareNumbers = (a, b) => (a - b) * (sortConfig.direction === "asc" ? 1 : -1);

	const sortCatches = useCallback(
		(field) => {
			// Toggle direction if clicking same field
			const direction =
				sortConfig.field === field && sortConfig.direction === "asc" ? "desc" : "asc";

			setSortConfig({ field, direction });

			return [...catches].sort((a, b) => {
				if (field === "group") {
					const groupCompare = compareNumbers(Number(a.group), Number(b.group));
					if (groupCompare !== 0) return groupCompare;
					return compareStrings(a.sp_name, b.sp_name);
				}

				if (field === "sp_code") {
					const codeCompare = compareNumbers(Number(a.sp_code), Number(b.sp_code));
					if (codeCompare !== 0) return codeCompare;
					return compareNumbers(a.category, b.category);
				}

				if (field === "sp_name") {
					const nameCompare = compareStrings(a.sp_name, b.sp_name);
					if (nameCompare !== 0) return nameCompare;
					return compareNumbers(a.category, b.category);
				}

				return 0;
			});
		},
		[catches, sortConfig, compareStrings, compareNumbers]
	);

	return {
		sortCatches,
		sortConfig,
		direction: sortConfig.direction,
	};
};
