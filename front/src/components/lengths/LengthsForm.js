import React, { Fragment } from "react";
import LengthsButtonBar from "./LengthsButtonBar.js";
import UiButtonIconAdd from "../ui/UiButtonIconAdd";
import UiButtonIconDelete from "../ui/UiButtonIconDelete";

/**
 * Lengths form.
 */
const LengthsForm = ({
	lengths,
	statusLengths,
	saveOrUpdateLengths,
	editLength,
	deleteLength,
	addLength,
	cancelEditLengths,
}) => {
	const renderContent = () => {
		if (statusLengths === "") {
			return null;
		}
		if (statusLengths === "view") {
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
					{lengths.map((l) => {
						return (
							<div className="formLengths__row" key={l.length}>
								<div className="formLengths__cell">
									<input
										type="number"
										id={l.id}
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
		} else if (statusLengths === "edit") {
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
						{lengths.map((l, idx) => {
							return (
								<div className="formLengths__row" key={idx}>
									<div className="formLengths__cell">
										<input
											type="number"
											id={l.id}
											name="length"
											min="0"
											max="9999"
											value={l.length}
											onChange={(e) => editLength(idx, e)}
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
											onChange={(e) => editLength(idx, e)}
										/>
									</div>
									<div className="formLengths__cell">
										<button
											className="icon_button"
											type="button"
											title="Add length"
											onClick={(e) => {
												addLength(l.length, idx);
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
												deleteLength(idx);
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
						lengths={lengths}
						statusLengths={statusLengths}
						saveOrUpdateLengths={saveOrUpdateLengths}
						cancelEditLengths={cancelEditLengths}
					/>
				</Fragment>
			);
		}
	};

	return renderContent();
};

export default LengthsForm;
