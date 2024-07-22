/**
 * Represents the Measurements component.
 * This component is responsible for managing measurements.
 * It fetches measurements from an API, allows creating, updating, and deleting measurements,
 * and provides a form for adding new measurements.
 *
 * The manage of measurements have some limitations. In order to avoid inconsistencies,
 * the system does not allow to delete measurements that are being used in any surveys
 * and only the 'name' field is editable.
 *
 *
 * @component
 * @returns {JSX.Element} The rendered Measurements component
 */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GlobalContext from "../../contexts/GlobalContext";

import MeasurementFormNew from "./MeasurementFormNew";
import MeasurementsButtonBar from "./MeasurementsButtonBar";
import ViewEditMeasurement from "./ViewEditMeasurement";

const Measurements = () => {
	const [measurements, setMeasurements] = useState([]);
	const [add, setAdd] = useState(false);

	const [backupMeasurements, setBackupMeasurements] = useState([
		{
			id: "",
			name: "",
			increment: "",
			conversion_factor: "",
		},
	]);

	const [isNameValid, setIsNameValid] = useState(true);

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

		if (name === "name") {
			validateMeasurementName(e, value);
		}
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

	const createMeasurement = (e, newMeasurement) => {
		e.preventDefault();

		fetch(globalContext.apiMeasurementTypes, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newMeasurement),
		})
			.then((response) => response.json())
			.then((data) => {
				setMeasurements([...measurements, data]);
			})
			.catch((error) => console.log(error));
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

	const deleteMeasurement = async (id) => {
		try {
			await axios.delete(`${globalContext.apiMeasurementTypes}/${id}`);
			const updatedMeasurements = measurements.filter((measurement) => measurement.id !== id);
			setMeasurements(updatedMeasurements);
		} catch (error) {
			console.error("Error deleting measurement:", error);
		}
	};

	/**
	 * Validate measurement names duplication
	 * @param {event} e onChange event.
	 * @param {start_date} name Name of measurement to be validated.
	 * @returns In case of error in date, show report validity.
	 */
	const validateMeasurementName = (e, name) => {
		e.target.setCustomValidity("");

		const isDuplicated = measurements.some((measurement) => measurement.name === name);

		if (isDuplicated) {
			e.target.setCustomValidity("Already exists a measurement with this name");
			setIsNameValid(false);
		} else {
			setIsNameValid(true);
		}

		return e.target.reportValidity();
	};

	const renderContent = () => {
		var content = "";

		content = (
			<main>
				<header>
					<h1 className="title">Measurement</h1>
				</header>
				<div className="wrapper measurementsWrapper measurement__notes">
					The manage of measurements have some limitations. In order to avoid inconsistencies, the system does
					not allow to delete measurements that are being used in any surveys and only the 'name' field is
					editable. If you need to change a measurement, please contact the system administrator.
				</div>
				<div className="wrapper measurementsWrapper">
					{add === true ? (
						<MeasurementFormNew
							add={add}
							setAdd={setAdd}
							createMeasurement={createMeasurement}
							isNameValid={isNameValid}
							validateMeasurementName={validateMeasurementName}
						/>
					) : (
						<MeasurementsButtonBar add={add} setAdd={setAdd} />
					)}

					{measurements.map((measurement) => (
						<ViewEditMeasurement
							key={measurement.id}
							measurement={measurement}
							handleChange={handleChange}
							updateMeasurement={updateMeasurement}
							setMeasurements={setMeasurements}
							backupMeasurements={backupMeasurements}
							isNameValid={isNameValid}
						/>
					))}
				</div>
			</main>
		);

		return content;
	};

	return renderContent();
};

export default Measurements;
