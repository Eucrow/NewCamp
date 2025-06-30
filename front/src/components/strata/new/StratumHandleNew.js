import React, { useState } from "react";

import StratumFormNew from "./StratumFormNew";

import UiButtonSave from "../../ui/UiButtonSave";
import UiButtonStatusHandle from "../../ui/UiButtonStatusHandle";

/**
 * New stratum component
 * @param {number} stratification_id
 * @param {method} handleAdd
 * @param {method} createStratum
 * @param {method} validateStratumName
 * @returns {JSX.Element}
 */
const StratumHandleNew = ({ stratification_id, handleAdd, createStratum, validateStratumName }) => {

	const [newStratum, setNewStratum] = useState({
		stratification: stratification_id,
		stratum: "",
		area: "",
		comment: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewStratum((prev_state) => {
			return {
				...prev_state,
				[name]: value,
			};
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		
		// Validate stratum name if validation function is provided
		if (validateStratumName && !validateStratumName(newStratum.stratum)) {
			alert("Stratum name already exists in this stratification");
			return;
		}

		// Call the createStratum function passed from parent
		if (createStratum) {
			createStratum(newStratum);
		}
		
		// Reset form and close
		setNewStratum({
			stratification: stratification_id,
			stratum: "",
			area: "",
			comment: "",
		});
		handleAdd(false);
	};

	const renderContent = () => {
		return (
			<form className="form__row form--wide" onSubmit={handleSubmit}>
				<StratumFormNew 
					newStratum={newStratum} 
					handleChange={handleChange}
				/>
				
				<div className="form__cell">
					<UiButtonSave />
					<UiButtonStatusHandle
						buttonText={"Cancel"}
						handleMethod={handleAdd}
						newStatus={false}
					/>
				</div>
			</form>
		);
	};

	return renderContent();
};

export default StratumHandleNew;
