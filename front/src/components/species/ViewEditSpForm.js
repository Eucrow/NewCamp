import React, { useContext, Fragment } from "react";

import SpeciesContext from "../../contexts/SpeciesContext";
import GlobalContext from "../../contexts/GlobalContext";

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
	const globalContext = useContext(GlobalContext);

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
						autoFocus
						disabled={is_disabled}
						value={props.sp.sp_name}
						onChange={(e) => speciesContext.handleChange(e, props.sp.id)}
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
						value={props.sp.spanish_name || ""}
						onChange={(e) => speciesContext.handleChange(e, props.sp.id)}
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
						value={props.sp.APHIA || ""}
						onChange={(e) => speciesContext.handleChange(e, props.sp.id)}
						onKeyDown={speciesContext.preventNegativeE}
					/>
				</span>
			</div>
			<Fragment>
				<h4>Parameters</h4>

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
						value={props.sp.a_param || ""}
						onChange={(e) => speciesContext.handleChange(e, props.sp.id)}
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
						value={props.sp.b_param || ""}
						onChange={(e) => speciesContext.handleChange(e, props.sp.id)}
						onKeyDown={speciesContext.preventNegativeE}
					/>
				</span>
			</Fragment>
			<Fragment>
				<h4>Measurement</h4>
				<span className="field">
					<label htmlFor="measurement_type">Measure unit:</label>
					<select
						id="measurement_type"
						name="measurement_type"
						required
						disabled={is_disabled}
						value={props.sp.measurement_type}
						onChange={(e) => speciesContext.handleChange(e, props.sp.id)}
					>
						{globalContext.measurementTypes.map((mt) => {
							return (
								<option key={mt.id} value={mt.id}>
									{mt.name}
								</option>
							);
						})}
					</select>
				</span>
			</Fragment>
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
