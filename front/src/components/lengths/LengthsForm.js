import React, { useContext } from "react";
import LengthForm from "./LengthForm.js";
import LengthsButtonBar from "./LengthsButtonBar.js";

import LengthsContext from "../../contexts/LengthsContext";

/**
 * Renders a form for displaying and editing lengths data.
 * @component
 *
 * @returns {JSX.Element} A JSX element that renders the lengths form.
 */
const LengthsForm = () => {
	const lengthsContext = useContext(LengthsContext);

	const renderContent = () => {
		if (lengthsContext.lengthsStatus === "view") {
			//TODO: Add the aria property aria labels to avoid the screen readers read the form as a form.
			return (
				<form className="lengthsWrapper">
					<div className="formLenghts__table">
						<div className="formLengths__row ">
							<div className="formLengths__cell formLengths__cell--header">
								{lengthsContext.measureUnit}
							</div>
							<div className="formLengths__cell formLengths__cell--header">number</div>
							<div
								className="formLengths__cell formLengths__cell--header formLengths--hidden"
								aria-hidden="true"
							>
								{/* Prevent space for two columns more. Mandatory to show propertly the lines of the first row */}
							</div>
							<div
								className="formLengths__cell formLengths__cell--header formLengths--hidden"
								aria-hidden="true"
							>
								{/* Prevent space for two columns more. Mandatory to show propertly the lines of the first row */}
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
						lengthsContext.removeZeroTails(lengthsContext.lengths);
					}}
				>
					<div className="formLenghts__table">
						<div className="formLengths__row ">
							<div className="formLengths__cell formLengths__cell--header">
								{lengthsContext.measureUnit}
							</div>
							<div className="formLengths__cell formLengths__cell--header">number</div>
							<div
								className="formLengths__cell formLengths__cell--header formLengths--hidden"
								aria-hidden="true"
							>
								{/* Prevent space for two columns more. Mandatory to show propertly the lines of the first row */}
							</div>
							<div
								className="formLengths__cell formLengths__cell--header formLengths--hidden"
								aria-hidden="true"
							>
								{/* Prevent space for two columns more. Mandatory to show propertly the lines of the first row */}
							</div>
						</div>
						{lengthsContext.lengths.map((l, idx) => {
							return <LengthForm l={l} idx={idx} key={idx} increment={lengthsContext.increment} />;
						})}
					</div>
					<LengthsButtonBar />
				</form>
			);
		}
	};

	return renderContent();
};

export default LengthsForm;
