import React, { useContext, useState } from "react";

import SpeciesContext from "../../contexts/SpeciesContext";

import SpButtonBar from "./SpButtonBar";

const NewSpForm = () => {
	const [sp, setSp] = useState({});

	const speciesContext = useContext(SpeciesContext);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setSp((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const handleChangeGroupSpCode = (e) => {
		let freeSpCode = speciesContext.getEmptySpCode(Number(e.target.value));

		const { name, value } = e.target;

		setSp((prev) => {
			return {
				...prev,
				[name]: value,
				sp_code: freeSpCode,
			};
		});
	};

	const renderContent = () => {
		const content = (
			<form
				className="wrapper"
				onSubmit={(e) => {
					speciesContext.createSp(e, sp);
					speciesContext.handleAdd(false);
				}}
			>
				<div className="form__row">
					<span className="field">
						<label htmlFor="group">Group:</label>
						<select
							name="group"
							id="group"
							required
							autoFocus
							defaultValue={""}
							onChange={(e) => {
								handleChangeGroupSpCode(e);
							}}
						>
							<option value=""></option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
						</select>
					</span>
					<span className="field">
						<label htmlFor="sp_code">Species code:</label>
						<input type="text" id="sp_code" name="sp_code" disabled size={3} value={sp.sp_code || ""} />
						(species code will be generated automatically)
					</span>
				</div>
				<div className="form__row">
					<span className="field">
						<label htmlFor="sp_name">Name:</label>
						<input
							type="text"
							id="sp_name"
							name="sp_name"
							size={50}
							pattern="^[a-zA-Z\s]{1,50}$"
							required
							onChange={(e) => handleChange(e)}
						/>
					</span>

					<span className="field">
						<label htmlFor="spanish_name">Spanish name:</label>
						<input
							type="text"
							id="spanish_name"
							name="spanish_name"
							size={50}
							pattern="^[a-zA-Z\s]{1,50}$"
							onChange={(e) => handleChange(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="APHIA">AphiaID:</label>
						<input
							type="number"
							id="APHIA"
							name="APHIA"
							className="input__noSpinner"
							min={0}
							max={999999}
							size={6}
							step={1}
							pattern="^[0-9]{1,6}$"
							onChange={(e) => handleChange(e)}
							onKeyDown={speciesContext.preventNegativeE}
						/>
					</span>
				</div>
				<fieldset className="wrapper ">
					<legend>Params</legend>

					<span className="field">
						<label htmlFor="a_param">a param:</label>
						<input
							type="number"
							id="a_param"
							name="a_param"
							className="input__noSpinner"
							min="0"
							max="9.999999"
							size={8}
							step={0.000001}
							onChange={(e) => handleChange(e)}
							onKeyDown={speciesContext.preventNegativeE}
						/>
					</span>
					<span className="field">
						<label htmlFor="b_param">b param:</label>
						<input
							type="number"
							id="b_param"
							name="b_param"
							className="input__noSpinner"
							min="0"
							max="9.999999"
							size={8}
							step={0.000001}
							onChange={(e) => handleChange(e)}
							onKeyDown={speciesContext.preventNegativeE}
						/>
					</span>
				</fieldset>
				<fieldset className="wrapper">
					<legend>Measurement</legend>
					<span className="field">
						<label htmlFor="unit">Measure unit:</label>
						<select id="unit" name="unit" required defaultValue={""} onChange={(e) => handleChange(e)}>
							<option value=""></option>
							<option value="1">mm</option>
							<option value="2">cm</option>
						</select>
					</span>

					<span className="field">
						<label htmlFor="increment">Increment:</label>
						<input
							type="numeric"
							id="increment"
							name="increment"
							className="input__noSpinner"
							required
							min="0"
							max="9"
							size={1}
							step={1}
							onChange={(e) => handleChange(e)}
							onKeyDown={speciesContext.preventNegativeE}
						/>
					</span>
				</fieldset>
				<div className="form__row">
					<SpButtonBar add={true} />
				</div>
			</form>
		);
		return content;
	};

	return renderContent();
};

export default NewSpForm;
