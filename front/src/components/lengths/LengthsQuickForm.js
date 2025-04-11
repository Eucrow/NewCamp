import React, { useContext } from "react";
import LengthsContext from "../../contexts/LengthsContext";

import LengthQuickForm from "./LengthQuickForm";

const LengthsQuickForm = () => {
	const lengthsContext = useContext(LengthsContext);

	const unit = lengthsContext.measurement ? lengthsContext.measurement.name : "no unit";

	const renderContent = () => {
		if (lengthsContext.lengthsStatus === "new") {
			return (
				<div className="formLengths__table">
					<div className="formLengths__row ">
						<div className="formLengths__cell formLengths__cell--header">{unit}</div>
						<div className="formLengths__cell formLengths__cell--header">number</div>
					</div>
					{lengthsContext.lengths.map((l, idx) => {
						return (
							<LengthQuickForm
								l={l}
								idx={idx}
								key={idx}
								autofocus={idx === 0 ? true : undefined} // Pass the autofocus prop ONLY to the first length input
							/>
						);
					})}
				</div>
			);
		}
	};

	return renderContent();
};

export default LengthsQuickForm;
