import React, { useContext } from "react";
import LengthForm from "./LengthForm.js";
import LengthsButtonBar from "./LengthsButtonBar.js";
import LengthsRangeForm from "./LengthsRangeForm.js";

import LengthsContext from "../../contexts/LengthsContext";
import SexContext from "../../contexts/SexContext.js";

/**
 * Renders a form for displaying and editing lengths data.
 * @component
 *
 * @returns {JSX.Element} A JSX element that renders the lengths form.
 */
const LengthsForm = () => {
	const lengthsContext = useContext(LengthsContext);
	const sexContext = useContext(SexContext);

	if (lengthsContext.lengths.length === 0) {
		lengthsContext.setLengthsStatus("empty");
	}

	const renderContent = () => {
		if (lengthsContext.lengthsStatus === "view") {
			//TODO: Add the aria property aria labels to avoid the screen readers read the form as a form.
			return (
				<form className="lengthsWrapper">
					<div className="formLengths__table">
						<div className="formLengths__row ">
							<div className="formLengths__cell formLengths__cell--header">
								{lengthsContext.measureUnit}
							</div>
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
							return <LengthForm l={l} idx={idx} key={idx} increment={lengthsContext.increment} />;
						})}
					</div>
					<LengthsButtonBar />
				</form>
			);
		} else if (lengthsContext.lengthsStatus === "edit") {
			return (
				<form
					className="lengthsWrapper"
					onSubmit={(e) => {
						lengthsContext.saveSexAndLengths(e, lengthsContext.sex, lengthsContext.lengths);
						// lengthsContext.removeZeroTailsInState(lengthsContext.lengths);
					}}
				>
					<div className="formLengths__table">
						<div className="formLengths__row ">
							<div className="formLengths__cell formLengths__cell--header">
								{lengthsContext.measureUnit}
							</div>
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
							return <LengthForm l={l} idx={idx} key={idx} increment={lengthsContext.increment} />;
						})}
					</div>
					<LengthsButtonBar />
				</form>
			);
		} else if (lengthsContext.lengthsStatus === "add") {
			return (
				<div className="formLengths__table">
					<LengthsRangeForm />
					<LengthsButtonBar />
				</div>
			);
		} else if (lengthsContext.lengthsStatus === "empty" && sexContext.sexStatus === "add") {
			return (
				<div className="formLengths__table">
					<LengthsRangeForm />
					<LengthsButtonBar />
				</div>
			);
		} else if (lengthsContext.lengthsStatus === "empty" && sexContext.sexStatus !== "add") {
			return (
				<div className="formLengths__table">
					<p className="formLengths__cell">There aren't any lengths</p>
					<LengthsButtonBar />
				</div>
			);
		}
	};

	return renderContent();
};

export default LengthsForm;
