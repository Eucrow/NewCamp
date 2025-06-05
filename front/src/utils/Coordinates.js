/**
 * Converts a decimal coordinate to degree and minutes.
 *
 * @param {number} coordinate - The decimal coordinate to convert.
 * @returns {array} An array containing the degree and minutes of the converted coordinate.
 */
export const convertDecimalToDMCoordinate = (coordinate) => {
	if (coordinate === null || typeof coordinate === "undefined") {
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

	if (isNaN(decimal_coordinate || typeof decimal_coordinate === undefined)) {
		return null;
	} else {
		return decimal_coordinate;
	}
};

/**
 * Converts trawl coordinate data from decimal to degrees/minutes format
 * @param {object} trawlData - The trawl data object containing coordinate fields
 * @returns {object} - Converted coordinates in degrees/minutes format
 */
export const convertTrawlCoordinates = (trawlData) => {
	const coordFields = ["shooting", "bottom", "trawling", "hauling", "take_off", "on_board"];
	const converted = {};

	coordFields.forEach((field) => {
		const fieldName =
			field === "takeOff" ? "take_off" : field === "onBoard" ? "on_board" : field;
		const [latDeg, latMin] = convertDecimalToDMCoordinate(trawlData[`${fieldName}_latitude`]);
		const [lonDeg, lonMin] = convertDecimalToDMCoordinate(trawlData[`${fieldName}_longitude`]);

		const coordKey =
			field === "take_off" ? "takeOff" : field === "on_board" ? "onBoard" : field;
		converted[coordKey] = {
			latitude: { degrees: latDeg, minutes: latMin },
			longitude: { degrees: lonDeg, minutes: lonMin },
		};
	});

	return converted;
};

/**
 * Converts hydrography coordinate data from decimal to degrees/minutes format
 * @param {object} hydroData - The hydrography data object containing latitude/longitude
 * @returns {object} - Converted coordinates in degrees/minutes format
 */
export const convertHydrographyCoordinates = (hydroData) => {
	const [latDeg, latMin] = convertDecimalToDMCoordinate(hydroData.latitude);
	const [lonDeg, lonMin] = convertDecimalToDMCoordinate(hydroData.longitude);

	return {
		latitude: { degrees: latDeg, minutes: latMin },
		longitude: { degrees: lonDeg, minutes: lonMin },
	};
};
