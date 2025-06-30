import React, { useState, Fragment } from "react";
import Stratum from "./Stratum";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

const Strata = ({ strata, stratificationId, createStratum }) => {
	/**
	 * List of strata
	 * @param {object} strata
	 * @param {number} stratificationId
	 * @param {method} createStratum
	 */

	const [addStratum, setAddStratum] = useState(false);

	/**
	 * Method to check if a stratum name already exists in this stratification.
	 * @param {string} stratumName stratum name to check if already exists.
	 * @returns True if exists, false if doesn't.
	 */
	const stratumExists = (stratumName) => {
		if (typeof strata === "undefined") {
			return false;
		}

		const stratum_exists = Object.keys(strata).map((s) => {
			if (strata[s]["stratum"] === stratumName) {
				return true;
			} else {
				return false;
			}
		});
		return stratum_exists.some((s) => s === true);
	};

	/**
	 * Validate the stratum name.
	 * @param {string} stratumName stratum name to check if is valid.
	 * @returns True if valid, false if not.
	 */
	const validateStratumName = (stratumName) => {
		const stratum_exists = stratumExists(stratumName);
		return !stratum_exists;
	};

	/**
	 * Method to render list of strata
	 * @returns {character} List of strata in html.
	 */
	const renderStrata = () => {
		if (strata) {
			return (
				<Fragment>
					{strata.map((stratum) => {
						return (
							<Stratum
								key={stratum.id}
								stratum={stratum}
								stratificationId={stratificationId}
								validateStratumName={validateStratumName}
							/>
						);
					})}
				</Fragment>
			);
		}
	};

	const renderContent = () => {
		if (addStratum === false) {
			return (
				<Fragment>
					{renderStrata()}
					<UiButtonStatusHandle
						buttonText={"Add Stratum"}
						handleMethod={setAddStratum}
						newStatus={true}
					></UiButtonStatusHandle>
				</Fragment>
			);
		} else if (addStratum === true) {
			return (
				<Fragment>
					{renderStrata()}
					<Stratum
						stratificationId={stratificationId}
						addStratum={addStratum}
						handleAddStratum={setAddStratum}
						createStratum={createStratum}
						validateStratumName={validateStratumName}
					/>
				</Fragment>
			);
		}
	};

	return renderContent();
};

export default Strata;
