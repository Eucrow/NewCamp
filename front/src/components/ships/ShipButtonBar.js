import React, { useContext } from "react";

import ShipsContext from "../../contexts/ShipsContext";

import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonCancel from "../ui/UiButtonCancel";

const ShipButtonBar = ({ props, edit, handleEdit }) => {
	const shipsContext = useContext(ShipsContext);

	var ButtonBar = "";

	if (edit === true) {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<div className="buttonsWrapper">
					<button type="submit" className="buttonsWrapper__button">
						Save Ship
					</button>
					<UiButtonCancel handleMethod={handleEdit} />
				</div>
			</div>
		);
	}

	if (edit === false) {
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
					id={props.ship.id}
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
