import React, { useContext } from "react";

import SpeciesContext from "../../contexts/SpeciesContext";

import SpButtonBar from "./SpButtonBar";

/**
 * ViewEditSpForm component
 * @param {object} sp: sp object
 * @param {boolean} edit:
 * @param {method} changeDetail
 * @param {method} handleEdit: make fields editable/non editable
 */

const ViewEditSpForm = (props) => {
	const speciesContext = useContext(SpeciesContext);
	const is_disabled = props.edit === true ? false : true;

	const handleSubmit = (e) => {
		speciesContext.handleUpdateSp(e, props.sp.id);
		props.handleEdit(false);
	};

	const content = (
		<form className="wrapper" onSubmit={handleSubmit}>
			<div className="form__row">
				<span className="field">Group: {props.sp.group}</span>
				<span className="field">Code: {props.sp.sp_code}</span>
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
						disabled={is_disabled}
						value={props.sp.sp_name}
						onChange={(e) =>
							speciesContext.handleChange(e, props.sp.id)
						}
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
						disabled={is_disabled}
						value={props.sp.spanish_name}
						onChange={(e) =>
							speciesContext.handleChange(e, props.sp.id)
						}
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
						disabled={is_disabled}
						value={props.sp.APHIA}
						onChange={(e) =>
							speciesContext.handleChange(e, props.sp.id)
						}
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
						disabled={is_disabled}
						value={props.sp.a_param}
						onChange={(e) =>
							speciesContext.handleChange(e, props.sp.id)
						}
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
						disabled={is_disabled}
						value={props.sp.b_param}
						onChange={(e) =>
							speciesContext.handleChange(e, props.sp.id)
						}
						onKeyDown={speciesContext.preventNegativeE}
					/>
				</span>
			</fieldset>
			<fieldset className="wrapper">
				<legend>Measurement</legend>
				<span className="field">
					<label htmlFor="unit">Measure unit:</label>
					<select
						id="unit"
						name="unit"
						required
						disabled={is_disabled}
						value={props.sp.unit}
						onChange={(e) =>
							speciesContext.handleChange(e, props.sp.id)
						}
					>
						<option selected></option>
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
						min="0"
						max="9"
						size={1}
						step={1}
						disabled={is_disabled}
						value={props.sp.increment}
						onChange={(e) =>
							speciesContext.handleChange(e, props.sp.id)
						}
						onKeyDown={speciesContext.preventNegativeE}
					/>
				</span>
			</fieldset>
			<div className="form__row">
				<SpButtonBar
					edit={props.edit}
					changeDetail={props.changeDetail}
					handleEdit={props.handleEdit}
					sp_id={props.sp.id}
				/>
			</div>
		</form>
	);

	return content;
};

export default ViewEditSpForm;
