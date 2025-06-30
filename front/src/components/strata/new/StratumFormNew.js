import React, { Fragment } from "react";

/**
 * Component of the stratum form.
 * @param {object} newStratum
 * @param {method} handleChange
 */
const StratumFormNew = ({ newStratum, handleChange }) => {

	const renderContent = () => {
		return (
			<Fragment>
				<label className="form__cell">
					Stratum:
					<input
						type="text"
						id="stratum"
						name="stratum"
						autoFocus
						required
						maxLength="50"
						value={newStratum?.stratum || ""}
						onChange={handleChange}
						placeholder="Enter stratum name"
					/>
				</label>

				<label className="form__cell">
					Area:
					<input
						type="number"
						id="area"
						name="area"
						min="0"
						value={newStratum?.area || ""}
						onChange={handleChange}
						placeholder="Enter area"
					/>
				</label>

				<label className="form__cell">
					Comment:
					<textarea
						id="comment"
						name="comment"
						maxLength="1000"
						rows="3"
						value={newStratum?.comment || ""}
						onChange={handleChange}
						placeholder="Enter comment (optional)"
					/>
				</label>
			</Fragment>
		);
	};

	return renderContent();
};

export default StratumFormNew;
