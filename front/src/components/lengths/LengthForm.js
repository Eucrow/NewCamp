import React, { useContext, useEffect, useRef } from "react";

import LengthsContext from "../../contexts/LengthsContext";

import UiButtonIconAdd from "../ui/UiButtonIconAdd";
import UiButtonIconDelete from "../ui/UiButtonIconDelete";

const LengthForm = ({ l, idx, key, statusLengths }) => {
	useEffect(() => {
		if (l.is_valid === false) {
			lengthRef.current.setCustomValidity("This length already exists.");
		} else {
			lengthRef.current.setCustomValidity("");
		}
	}, [l]);

	const lengthsContext = useContext(LengthsContext);

	let lengthRef = useRef(null);

	const renderContent = () => {
		if (statusLengths === "") {
			return null;
		}

		if (statusLengths === "view") {
			return (
				<div className="formLengths__row" key={l.length}>
					<div className="formLengths__cell">
						<input
							type="number"
							name="length"
							min="0"
							max="9999"
							ref={lengthRef}
							value={l.length}
							disabled
						/>
					</div>
					<div className="formLengths__cell">
						<input
							type="number"
							name="number_individuals"
							min="0"
							max="9999"
							value={l.number_individuals}
							disabled
						/>
					</div>
				</div>
			);
		} else if (statusLengths === "edit") {
			return (
				<div className="formLengths__row" key={idx}>
					<div className="formLengths__cell">
						<input
							type="number"
							name="length"
							min="0"
							max="9999"
							ref={lengthRef}
							value={l.length}
							onChange={(e) => {
								lengthsContext.editLength(idx, e);
							}}
						/>
					</div>

					<div className="formLengths__cell">
						<input
							type="number"
							name="number_individuals"
							min="0"
							max="9999"
							value={l.number_individuals}
							onChange={(e) => lengthsContext.editLength(idx, e)}
						/>
					</div>
					<div className="formLengths__cell">
						<button
							className="icon_button"
							type="button"
							title="Add length"
							onClick={(e) => {
								lengthsContext.addLength(l.length, idx);
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
								lengthsContext.deleteLength(idx);
							}}
						>
							<UiButtonIconDelete />
						</button>
					</div>
				</div>
			);
		}
	};

	return renderContent();
};

export default LengthForm;
