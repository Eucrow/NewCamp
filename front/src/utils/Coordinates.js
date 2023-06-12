/**
 * Converts a decimal coordinate to degree and minutes.
 *
 * @param {number} coordinate - The decimal coordinate to convert.
 * @returns {array} An array containing the degree and minutes of the converted coordinate.
 */
export const convertDecimalToDMCoordinate = (coordinate) => {
	if (coordinate === null) {
		return [null, null];
	}
	const coor = Number(coordinate);
	const degree = Math.floor(coor);
	const minutes = Number(((coor - degree) * 60).toFixed(3));
	return [degree, minutes];
};

/**
 * Converts degree and minutes to a decimal coordinate.
 *
 * @param {number} degree - The degree of the coordinate to convert.
 * @param {number} minutes - The minutes of the coordinate to convert.
 * @returns {string} The decimal coordinate as a string.
 */
export const convertDMToDecimalCoordinate = (degree, minutes) => {
	const decimal_minutes = Number(minutes) / 60;
	const decimal_coordinate = (Number(degree) + decimal_minutes).toFixed(6);

	return decimal_coordinate;
};
