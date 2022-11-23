import React, { Fragment, useState } from "react";
import LengthsButtonBar from "./LengthsButtonBar.js";

const LengthsForm = ({
	lengths,
	status_lengths,
	handleCancelLengths,
	saveOrUpdateLengths,
}) => {
	// is mandatory to make a deep copy of the lengths received from props: JSON.parse(JSON.stringify(lengths))
	const [updatedLengths, setUpdatedLengths] = useState(
		JSON.parse(JSON.stringify(lengths))
	);

	/**
	 * Edit length of updated lengths state.
	 * @param {number} index index of length in the dictionary.
	 * @param {event} e
	 */
	const handleEditedLength = (index, e) => {
		// a deep copy is mandatory because the data to be modified is nested:
		let newLengths = JSON.parse(JSON.stringify(updatedLengths));
		newLengths[index][e.target.name] = e.target.value;
		setUpdatedLengths(newLengths);
	};
	/**
	 * Delete length of updated lengths state.
	 * @param {number} index  index index of length in the dictionary.
	 */
	const handleDeleteLength = (index) => {
		let newLengths = [...updatedLengths];
		newLengths = newLengths.filter((l, lidx) => index !== lidx);
		setUpdatedLengths(newLengths);
	};

	/**
	 * Add empty length to updated lengths state.
	 */
	const handleAddLength = () => {
		let newLengths = [...updatedLengths];
		newLengths.push({ length: "", number_individuals: 0 });
		setUpdatedLengths(newLengths);
	};

	/**
	 * Initialize updated lengths state with lengths received via prop.
	 */
	const recoverLengths = () => {
		setUpdatedLengths(lengths);
		handleCancelLengths();
	};

	const renderContent = () => {
		if (status_lengths === "") {
			return null;
		}
		if (status_lengths === "view") {
			return (
				<Fragment>
					<div className="formLengths__row">
						<div className="formLengths__cell">Length (mm)</div>
						<div className="formLengths__cell">N. individuals</div>
					</div>
					{updatedLengths.map((l) => {
						return (
							<div className="formLengths__row" key={l.length}>
								<div className="formLengths__cell">
									<input
										type="number"
										id="length"
										name="length"
										min="0"
										max="9999"
										value={l.length}
										disabled
									/>
								</div>
								<div className="formLengths__cell">
									<input
										type="number"
										id="number_individuals"
										name="number_individuals"
										min="0"
										max="9999"
										value={l.number_individuals}
										disabled
									/>
								</div>
							</div>
						);
					})}
				</Fragment>
			);
		} else if (status_lengths === "edit") {
			return (
				<form>
					<div className="formLengths__row">
						<div className="formLengths__cell">Length (mm)</div>
						<div className="formLengths__cell">N. individuals</div>
					</div>
					{updatedLengths.map((l, idx) => {
						return (
							<div className="formLengths__row" key={idx}>
								<div className="formLengths__cell">
									<input
										type="number"
										id="length"
										name="length"
										min="0"
										max="9999"
										value={l.length}
										onChange={(e) =>
											handleEditedLength(idx, e)
										}
									/>
								</div>

								<div className="formLengths__cell">
									<input
										type="number"
										id="number_individuals"
										name="number_individuals"
										min="0"
										max="9999"
										value={l.number_individuals}
										onChange={(e) =>
											handleEditedLength(idx, e)
										}
									/>
								</div>

								<button
									type="button"
									onClick={(e) => {
										handleDeleteLength(idx);
									}}
								>
									Delete length
								</button>
							</div>
						);
					})}
					<LengthsButtonBar
						updatedLengths={updatedLengths}
						status_lengths={status_lengths}
						handleAddLength={handleAddLength}
						handleCancelLengths={handleCancelLengths}
						recoverLengths={recoverLengths}
						saveOrUpdateLengths={saveOrUpdateLengths}
					/>
				</form>
			);
		}
	};

	return renderContent();
};

export default LengthsForm;
