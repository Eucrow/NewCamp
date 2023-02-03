import React, { useContext } from "react";
import LengthForm from "./LengthForm.js";

import LengthsContext from "../../contexts/LengthsContext";

/**
 * Lengths form.
 */
const LengthsForm = () => {
	const lengthsContext = useContext(LengthsContext);

	const renderContent = () => {
		if (lengthsContext.statusLengths === "") {
			return null;
		}

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
				{lengthsContext.lengths.map((l, idx) => {
					return <LengthForm l={l} idx={idx} key={idx} />;
				})}
			</form>
		);
	};

	return renderContent();
};

export default LengthsForm;
