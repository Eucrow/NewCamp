import React, { useContext } from "react";
import LengthForm from "./LengthForm.js";
import LengthsButtonBar from "./LengthsButtonBar.js";

import LengthsContext from "../../contexts/LengthsContext";

/**
 * Lengths form.
 */
const LengthsForm = () => {
	const lengthsContext = useContext(LengthsContext);

	const renderContent = () => {
		return (
			<form className="lengthsWrapper">
				<div className="formLenghts__table">
					<div className="formLengths__row ">
						<div className="formLengths__cell formLengths__cell--header">
							{lengthsContext.measureUnit}
						</div>
						<div className="formLengths__cell formLengths__cell--header">
							number
						</div>
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
						return <LengthForm l={l} idx={idx} key={idx} />;
					})}
				</div>
				<LengthsButtonBar />
			</form>
		);
	};

	return renderContent();
};

export default LengthsForm;
