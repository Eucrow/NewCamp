import React, { useContext } from "react";
import LengthForm from "./LengthForm.js";
import LengthsButtonBar from "./LengthsButtonBar.js";
import LengthsRangeForm from "./LengthsRangeForm.js";

import LengthsContext from "../../contexts/LengthsContext";
import LengthsQuickForm from "./LengthsQuickForm.js";

/**
 * LengthsForm component renders different forms based on the lengthsStatus from the LengthsContext.
 * It can render a view form, an edit form, an add form, or an empty state.
 *
 * @component
 * @returns {JSX.Element} The rendered form based on the lengthsStatus.
 **/

const LengthsForm = () => {
	const lengthsContext = useContext(LengthsContext);

	const unit = lengthsContext.measurement ? lengthsContext.measurement.name : "no unit";

	const renderContent = () => {
		if (lengthsContext.lengthsStatus === "view") {
			//TODO: Add the aria property aria labels to avoid the screen readers read the form as a form.
			return (
				<form className="lengthsWrapper">
					<div className="formLengths__table">
						<div className="formLengths__row ">
							<div className="formLengths__cell formLengths__cell--header">{unit}</div>
							<div className="formLengths__cell formLengths__cell--header">number</div>
							<div
								className="formLengths__cell formLengths__cell--header formLengths--hidden"
								aria-hidden="true"
							>
								{/* Prevent space for two columns more. Mandatory to show properly the lines of the first row */}
							</div>
							<div
								className="formLengths__cell formLengths__cell--header formLengths--hidden"
								aria-hidden="true"
							>
								{/* Prevent space for two columns more. Mandatory to show properly the lines of the first row */}
							</div>
						</div>
						{lengthsContext.lengths.map((l, idx) => {
							return <LengthForm l={l} idx={idx} key={idx} />;
						})}
						<div className="formLengths__row ">
							<div className="formLengths__cell formLengths__cell--total">Total:</div>
							<div className="formLengths__cell formLengths__cell--total">
								{/* # TODO: make this input not readable as input in ARIA */}
								<input
									type="number"
									name="number_individuals"
									min="0"
									max="9999"
									value={lengthsContext.totalIndividuals}
									disabled
								/>
							</div>
							<div
								className="formLengths__cell formLengths__cell--total formLengths--hidden"
								aria-hidden="true"
							>
								{/* Prevent space for two columns more. Mandatory to show properly the lines of the first row */}
							</div>
							<div
								className="formLengths__cell formLengths__cell--total formLengths--hidden"
								aria-hidden="true"
							>
								{/* Prevent space for two columns more. Mandatory to show properly the lines of the first row */}
							</div>
						</div>
					</div>

					<LengthsButtonBar />
				</form>
			);
		} else if (lengthsContext.lengthsStatus === "edit") {
			return (
				<form
					className="lengthsWrapper"
					onSubmit={(e) => {
						lengthsContext.saveSexAndLengths(e, lengthsContext.lengths);
					}}
				>
					<div className="formLengths__table">
						<div className="formLengths__row">
							<div className="formLengths__cell formLengths__cell--header">{unit}</div>
							<div className="formLengths__cell formLengths__cell--header">number</div>
							<div
								className="formLengths__cell formLengths__cell--header formLengths--hidden"
								aria-hidden="true"
							>
								{/* Prevent space for two columns more. Mandatory to show properly the lines of the first row */}
							</div>
							<div
								className="formLengths__cell formLengths__cell--header formLengths--hidden"
								aria-hidden="true"
							>
								{/* Prevent space for two columns more. Mandatory to show properly the lines of the first row */}
							</div>
						</div>
						{lengthsContext.lengths.map((l, idx) => {
							return <LengthForm l={l} idx={idx} key={idx} />;
						})}
					</div>
					<LengthsButtonBar />
				</form>
			);
		} else if (lengthsContext.lengthsStatus === "add") {
			return <LengthsRangeForm />;
		} else if (lengthsContext.lengthsStatus === "new") {
			return (
				<form
					className="lengthsWrapper"
					onSubmit={(e) => {
						e.preventDefault(); // Prevent form submission to allow adding new lengths
						lengthsContext.saveSexAndLengths(e, lengthsContext.lengths);
					}}
				>
					<LengthsQuickForm />
					<LengthsButtonBar />
				</form>
			);
		} else if (lengthsContext.lengthsStatus === "empty") {
			return (
				<div className="formLengths__table">
					<LengthsButtonBar />
				</div>
			);
		}
	};

	return renderContent();
};

export default LengthsForm;
