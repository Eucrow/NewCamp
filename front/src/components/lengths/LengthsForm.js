import React, { Fragment } from "react";
import LengthForm from "./LengthForm.js";

/**
 * Lengths form.
 */
const LengthsForm = ({ lengths, statusLengths }) => {
	const renderContent = () => {
		if (statusLengths === "") {
			return null;
		}

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
							<LengthForm
								l={l}
								idx={idx}
								key={idx}
								statusLengths={statusLengths}
							/>
						);
					})}
				</form>
			</Fragment>
		);
	};

	return renderContent();
};

export default LengthsForm;
