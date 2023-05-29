export const convertDecimalToDMCoordinate = (coordinate) => {
	// convert decimal coordinate to degree and minutes
	// detect if coordinate is null
	if (coordinate === null) {
		return [null, null];
	}

	const degree = Math.floor(coordinate);
	const minutes = ((coordinate - degree) * 60).toFixed(3);
	return [degree, minutes];
};

export const convertDMToDecimalCoordinate = (degree, minutes) => {
	const decimal_minutes = minutes / 60;
	const decimal_coordinate = degree + decimal_minutes;
	return decimal_coordinate;
};
