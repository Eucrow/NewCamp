/**
 * Utility functions for data manipulation
 */

/**
 * Prevent 'e' and '-' in numeric input
 * @param {e} onKeyDown event
 */
export const preventNegativeE = e => {
  if (e.key === "e" || e.key === "-") {
    e.preventDefault();
  }
};

/**
 * Converts all empty strings to null in an object
 * @param {object} obj The object to clean
 * @returns {object} The cleaned object
 */
export const cleanEmptyValues = obj => {
  const cleaned = { ...obj };
  Object.keys(cleaned).forEach(key => {
    if (cleaned[key] === "") {
      cleaned[key] = null;
    }
  });
  return cleaned;
};
