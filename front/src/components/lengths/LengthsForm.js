import React, { Fragment, useState } from "react";

const LengthsForm = ({ lengths, status_lengths }) => {
	const [updatedLengths, setUpdatedLengths] = useState(lengths);
	const [statusLengths, setStatusLengths] = useState(status_lengths);

	const handleEditLength = (index, e) => {
		let newLengths = [...updatedLengths];
		newLengths[index][e.target.name] = e.target.value;
		setUpdatedLengths(newLengths);
	};

	const handleDeleteLength = (index) => {
		let newLengths = [...updatedLengths];
		newLengths = newLengths.filter((l, lidx) => index !== lidx);
		setUpdatedLengths(newLengths);
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
							<div className="formLengths__row" key={l.id}>
								<div className="formLengths__cell">
									<input
										type="number"
										id="length"
										name="length"
										min="0"
										max="9999"
										value={l.length}
										onChange={(e) =>
											handleEditLength(idx, e)
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
											handleEditLength(idx, e)
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
				</form>
			);
		}
	};

	return renderContent();
};

export default LengthsForm;
