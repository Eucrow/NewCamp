import React, { useContext } from "react";

import ShipsContext from "../../contexts/ShipsContext";

import UiButtonSave from "../ui/UiButtonSave";
import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonCancel from "../ui/UiButtonCancel";

/**
 * Button bar of ship component.
 * @param {object} props.ship ship object.
 * @param {boolean} props.edit variable to indicate if the element is edited or not.
 * @param {method} props.handleEdit method to handle de 'edit' boolean variable.
 */
const ShipButtonBar = (props) => {
	const shipsContext = useContext(ShipsContext);

	var ButtonBar = "";

	if (props.add === true) {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<UiButtonSave buttonText={"Save Ship"} />
				<UiButtonCancel handleMethod={shipsContext.handleAdd} />
			</div>
		);
	}

	if (props.edit === true) {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<div className="buttonsWrapper">
					<UiButtonSave buttonText={"Save Ship"} />
					<UiButtonCancel handleMethod={props.handleEdit} />
				</div>
			</div>
		);
	}

	if (props.edit === false) {
		ButtonBar = (
			<div className="form__cell form__cell--right buttonsWrapper">
				<button
					type="button"
					className="buttonsWrapper__button"
					onClick={(e) => {
						props.handleEdit(true);
					}}
				>
					Edit Ship
				</button>
				<UiButtonDelete
					id={props.ship_id}
					deleteMethod={shipsContext.deleteShip}
					buttonText="Delete ship"
					confirmMessage="Delete the ship?"
				/>
			</div>
		);
	}

	return ButtonBar;
};

export default ShipButtonBar;
