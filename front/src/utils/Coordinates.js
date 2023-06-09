export const convertDecimalToDMCoordinate = (coordinate) => {
	// convert decimal coordinate to degree and minutes
	// detect if coordinate is null
	if (coordinate === null) {
		return [null, null];
	}
	const coor = Number(coordinate);
	const degree = Math.floor(coor);
	const minutes = ((coor - degree) * 60).toFixed(3);
	return [degree, minutes];
};

export const convertDMToDecimalCoordinate = (degree, minutes) => {
	const decimal_minutes = Number(minutes) / 60;
	const decimal_coordinate = (Number(degree) + decimal_minutes).toFixed(6);

	return decimal_coordinate;
};
