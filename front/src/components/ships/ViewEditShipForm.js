import React, { useContext } from "react";

import ShipsContext from "../../contexts/ShipsContext";

import ShipButtonBar from "./ShipButtonBar";

/**
 * ViewEditShipForm component
 * @param {object} props ship object.
 * @param {boolean} edit true if the element is available to edit.
 * @param {method} handleEdit method to change the edit variable in state.
 */
const ViewEditShipForm = ({ props, edit, handleEdit }) => {
	const shipsContext = useContext(ShipsContext);
	const is_disabled = edit === true ? false : true;

	const handleSubmit = (e) => {
		shipsContext.updateShip(e, props.ship.id);
		props.handleEdit(false);
	};

	const content = (
		<form className="wrapper" onSubmit={handleSubmit}>
			<div className="form__row">
				<span className="field">
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						className="survey_description"
						required
						size={30}
						autoFocus
						disabled={is_disabled}
						value={props.ship.name || ""}
						onChange={(e) =>
							shipsContext.handleChange(e, props.ship.id)
						}
					/>
				</span>
			</div>
			<div className="form__row">
				<span className="field">
					<label htmlFor="datras_id">DATRAS code:</label>
					<input
						type="text"
						id="datras_id"
						name="datras_id"
						size={4}
						pattern="^[\w|\d]{2,4}$"
						disabled={is_disabled}
						value={props.ship.datras_id || ""}
						onChange={(e) =>
							shipsContext.handleChange(e, props.ship.id)
						}
					/>
				</span>
				<span className="field">
					<label htmlFor="length">Length (m):</label>
					<input
						type="number"
						id="length"
						name="length"
						min={0}
						max={999}
						size={5}
						step={0.01}
						disabled={is_disabled}
						value={props.ship.length || ""}
						onChange={(e) =>
							shipsContext.handleChange(e, props.ship.id)
						}
						onKeyDown={shipsContext.preventNegativeE}
					/>
				</span>
				<span className="field">
					<label htmlFor="beam">Beam (m):</label>
					<input
						type="number"
						id="beam"
						name="beam"
						min={0}
						max={99}
						size={4}
						step={0.01}
						disabled={is_disabled}
						value={props.ship.beam || ""}
						onChange={(e) =>
							shipsContext.handleChange(e, props.ship.id)
						}
						onKeyDown={shipsContext.preventNegativeE}
					/>
				</span>
				<span className="field">
					<label htmlFor="main_power">Main Power (kW):</label>
					<input
						type="number"
						id="main_power"
						name="main_power"
						min={0}
						max={9999}
						size={4}
						disabled={is_disabled}
						value={props.ship.main_power || ""}
						onChange={(e) =>
							shipsContext.handleChange(e, props.ship.id)
						}
						onKeyDown={shipsContext.preventNegativeE}
					/>
				</span>
				<span className="field">
					<label htmlFor="year_built">Year built:</label>
					<input
						type="number"
						id="year_built"
						name="year_built"
						min={1900}
						max={9999}
						size={4}
						disabled={is_disabled}
						value={props.ship.year_built || ""}
						onChange={(e) =>
							shipsContext.handleChange(e, props.ship.id)
						}
						onKeyDown={shipsContext.preventNegativeE}
					/>
				</span>
			</div>
			<div className="form__row">
				<span className="field__comment">
					<label htmlFor="comment">Comment:</label>
					<textarea
						id="comment"
						name="comment"
						className="comment"
						size={500}
						disabled={is_disabled}
						value={props.ship.comment || ""}
						onChange={(e) =>
							shipsContext.handleChange(e, props.ship.id)
						}
					></textarea>
				</span>
			</div>
			<div className="form__row">
				<ShipButtonBar
					ship_id={props.ship.id}
					edit={edit}
					handleEdit={handleEdit}
				/>
			</div>
		</form>
	);

	return content;
};

export default ViewEditShipForm;
