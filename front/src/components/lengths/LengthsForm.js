import React, { Fragment, useState } from "react";
import LengthsButtonBar from "./LengthsButtonBar.js";
import UiButtonIconAdd from "../ui/UiButtonIconAdd";
import UiButtonIconDelete from "../ui/UiButtonIconDelete";

/**
 *
 * @param {props} param0 props: lengths, status_lengths, handleCancelLengths, saveOrUpdateLengths
 * @returns
 */
const LengthsForm = ({
	lengths,
	status_lengths,
	handleCancelLengths,
	saveOrUpdateLengths,
}) => {
	// const orderLengths = (a, b) => {
	// 	if (a.length < b.length) {
	// 		return -1;
	// 	}

	// 	if (a.length > b.length) {
	// 		return 1;
	// 	}

	// 	return 0;
	// };

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
	const handleAddLength = (l, index) => {
		let newLengths = [...updatedLengths];
		let newLength = l + 1;
		newLengths.splice(index + 1, 0, {
			length: newLength,
			number_individuals: 0,
		});
		console.log(newLengths);
		// newLengths.push({ length: "", number_individuals: 0 });

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
				<form>
					<div className="formLengths__row">
						<div className="formLengths__cell formLengths__cell--header">
							mm
						</div>
						<div className="formLengths__cell formLengths__cell--header">
							number
						</div>
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
				</form>
			);
		} else if (status_lengths === "edit") {
			return (
				<Fragment>
					<form>
						<div className="formLengths__row">
							<div className="formLengths__cell formLengths__cell--header">
								mm
							</div>
							<div className="formLengths__cell formLengths__cell--header">
								number
							</div>
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
									<div className="formLengths__cell">
										<button
											className="icon_button"
											type="button"
											title="Add length"
											onClick={(e) => {
												handleAddLength(l.length, idx);
											}}
										>
											<UiButtonIconAdd />
										</button>
									</div>
									<div className="formLengths__cell">
										<button
											className="icon_button"
											type="button"
											title="Delete length"
											onClick={(e) => {
												handleDeleteLength(idx);
											}}
										>
											<UiButtonIconDelete />
										</button>
									</div>
								</div>
							);
						})}
					</form>
					<LengthsButtonBar
						updatedLengths={updatedLengths}
						status_lengths={status_lengths}
						handleCancelLengths={handleCancelLengths}
						recoverLengths={recoverLengths}
						saveOrUpdateLengths={saveOrUpdateLengths}
					/>
				</Fragment>
			);
		}
	};

	return renderContent();
};

export default LengthsForm;
