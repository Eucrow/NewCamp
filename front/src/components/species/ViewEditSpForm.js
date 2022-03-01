import React, { useContext } from "react";

import SpeciesContext from "../../contexts/SpeciesContext";

import SpButtonBar from "./SpButtonBar";

/**
 * ViewEditSpForm component
 * @param {object} sp: sp object
 * @param {boolean} edit:
 * @param {method} changeDetail
 * @param {method} changeEdit: make fields editable/non editable
 */

const ViewEditSpForm = (props) => {
	const speciesContext = useContext(SpeciesContext);
	const is_disabled = props.edit === true ? false : true;

	const handleSubmit = (e) => {
		speciesContext.handleUpdateSp(e, props.sp.id);
		props.changeEdit(false);
	};

	const content = (
		<form className="wrapper" onSubmit={handleSubmit}>
			<div className="form__row">
				<span className="field">Group: {props.sp.group}</span>
				<span className="field">Code: {props.sp.sp_code}</span>
			</div>
			<div className="form__row">
				<span className="field">
					<label htmlFor="haul">Name:</label>
					<input
						type="text"
						id="sp_name"
						name="sp_name"
						disabled={is_disabled}
						value={props.sp.sp_name}
						onChange={(e) =>
							speciesContext.handleChange(e, props.sp.id)
						}
					/>
				</span>

				<span className="field">
					<label htmlFor="haul">Spanish name:</label>
					<input
						type="text"
						id="spanish_name"
						name="spanish_name"
						disabled={is_disabled}
						value={props.sp.spanish_name}
						onChange={(e) =>
							speciesContext.handleChange(e, props.sp.id)
						}
					/>
				</span>
				<span className="field">
					<label htmlFor="haul">AphiaID:</label>
					<input
						type="text"
						id="APHIA"
						name="APHIA"
						disabled={is_disabled}
						value={props.sp.APHIA}
						onChange={(e) =>
							speciesContext.handleChange(e, props.sp.id)
						}
					/>
				</span>
			</div>
			<fieldset className="wrapper ">
				<legend>Params</legend>

				<span className="field">
					<label htmlFor="haul">a param:</label>
					<input
						type="text"
						id="a_param"
						name="a_param"
						disabled={is_disabled}
						value={props.sp.a_param}
						onChange={(e) =>
							speciesContext.handleChange(e, props.sp.id)
						}
					/>
				</span>
				<span className="field">
					<label htmlFor="haul">b param:</label>
					<input
						type="text"
						id="b_param"
						name="b_param"
						disabled={is_disabled}
						value={props.sp.b_param}
						onChange={(e) =>
							speciesContext.handleChange(e, props.sp.id)
						}
					/>
				</span>
			</fieldset>
			<fieldset className="wrapper">
				<legend>Measurement</legend>
				<span className="field">
					<label htmlFor="haul">Measure unit:</label>
					<input
						type="text"
						id="unit"
						name="unit"
						disabled={is_disabled}
						value={props.sp.unit}
						onChange={(e) =>
							speciesContext.handleChange(e, props.sp.id)
						}
					/>
				</span>

				<span className="field">
					<label htmlFor="haul">Increment:</label>
					<input
						type="text"
						id="increment"
						name="increment"
						disabled={is_disabled}
						value={props.sp.increment}
						onChange={(e) =>
							speciesContext.handleChange(e, props.sp.id)
						}
					/>
				</span>
			</fieldset>
			<div className="form__row">
				<SpButtonBar
					edit={props.edit}
					changeDetail={props.changeDetail}
					changeEdit={props.changeEdit}
					sp_id={props.sp.id}
				/>
			</div>
		</form>
	);

	return content;
};

export default ViewEditSpForm;
