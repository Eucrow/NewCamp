import React, { useState } from "react";

import MeasurementButtonBar from "./MeasurementButtonBar";

const ViewEditMeasurement = ({
	measurement,
	handleChange,
	updateMeasurement,
	setMeasurements,
	backupMeasurements,
	isNameValid,
}) => {
	const [add, setAdd] = useState(false);
	const [edit, setEdit] = useState(false);

	const handleCancel = () => {
		setMeasurements(backupMeasurements);
		setAdd(false);
		setEdit(false);
	};

	const renderContent = () => {
		const handleSubmit = (e) => {
			updateMeasurement(e, measurement.id);
			setEdit(false);
		};

		const content = (
			<form className="wrapper" onSubmit={handleSubmit}>
				<div className="form__row" key={measurement.id}>
					<div className="form__cell">
						<label>
							Name:
							<input
								type="text"
								id="name"
								name="name"
								value={measurement.name}
								disabled={!edit}
								size={6}
								onChange={(e) => handleChange(e, measurement.id)}
							/>
						</label>
					</div>
					<div className="form__cell">
						<label>
							Increment:
							<input
								type="text"
								id="increment"
								name="increment"
								value={measurement.increment}
								disabled={!edit}
								size={6}
							/>
						</label>
					</div>
					<div className="form__cell">
						<label>
							Conversion factor:
							<input
								type="text"
								id="conversion_factor"
								name="conversion_factor"
								value={measurement.conversion_factor}
								disabled={!edit}
								size={6}
							/>
						</label>
					</div>
				</div>

				<MeasurementButtonBar
					add={add}
					edit={edit}
					handleAdd={setAdd}
					handleEdit={setEdit}
					handleCancel={handleCancel}
					isNameValid={isNameValid}
				/>
			</form>
		);
		return content;
	};

	return renderContent();
};

export default ViewEditMeasurement;
