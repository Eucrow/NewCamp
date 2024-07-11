import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GlobalContext from "../../contexts/GlobalContext";

import ViewEditMeasurement from "./ViewEditMeasurement";

const Measurements = () => {
	const [measurements, setMeasurements] = useState([]);

	const [backupMeasurements, setBackupMeasurements] = useState([
		{
			id: "",
			name: "",
			increment: "",
			conversion_factor: "",
		},
	]);

	const globalContext = useContext(GlobalContext);

	useEffect(() => {
		fetchMeasurements();
	}, []);

	const handleChange = (e, id) => {
		e.preventDefault();
		const name = e.target.name;
		const value = e.target.value;

		setMeasurements((prevState) => {
			const measures = prevState.map((measurement) => {
				if (measurement.id === id) {
					return { ...measurement, [name]: value };
				} else {
					return measurement;
				}
			});
			return measures;
		});
	};

	const fetchMeasurements = async () => {
		try {
			const response = await axios.get(globalContext.apiMeasurementTypes);
			setMeasurements(response.data);
			setBackupMeasurements(response.data);
		} catch (error) {
			console.error("Error fetching measurements:", error);
		}
	};

	const createMeasurement = async (newMeasurement) => {
		try {
			const response = await axios.post(globalContext.apiMeasurementTypes, newMeasurement);
			setMeasurements([...measurements, response.data]);
		} catch (error) {
			console.error("Error creating measurement:", error);
		}
	};

	const updateMeasurement = (e, measurementId) => {
		e.preventDefault();

		const api = globalContext.apiMeasurementTypes + "/" + measurementId;

		const updatedMeasurement = measurements.filter((measurement) => measurement.id === measurementId)[0];

		fetch(api, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedMeasurement),
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.log(error));
	};

	// const updateMeasurement = async (id, updatedMeasurement) => {
	// 	try {
	// 		const response = await axios.put(`${globalContext.apiMeasurementTypes}/${id}`, updatedMeasurement);
	// 		const updatedMeasurements = measurements.map((measurement) =>
	// 			measurement.id === id ? response.data : measurement
	// 		);
	// 		setMeasurements(updatedMeasurements);
	// 	} catch (error) {
	// 		console.error("Error updating measurement:", error);
	// 	}
	// };

	const deleteMeasurement = async (id) => {
		try {
			await axios.delete(`${globalContext.apiMeasurementTypes}/${id}`);
			const updatedMeasurements = measurements.filter((measurement) => measurement.id !== id);
			setMeasurements(updatedMeasurements);
		} catch (error) {
			console.error("Error deleting measurement:", error);
		}
	};

	return (
		<main>
			<header>
				<h1 className="title">Measurement</h1>
			</header>
			<div className="wrapper measurementWrapper>">
				{/* Render the measurements */}
				{measurements.map((measurement) => (
					<ViewEditMeasurement
						key={measurement.id}
						measurement={measurement}
						handleChange={handleChange}
						updateMeasurement={updateMeasurement}
						setMeasurements={setMeasurements}
						backupMeasurements={backupMeasurements}
					/>
				))}

				{/* Add a form to create new measurements
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const newMeasurement = { name: "New Measurement" }; // Replace with form values
					createMeasurement(newMeasurement);
				}}
			>
				<input type="text" placeholder="Measurement Name" />
				<button type="submit">Create</button>
			</form> */}
			</div>
		</main>
	);
};

export default Measurements;
