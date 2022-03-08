import React, { useContext } from "react";

import ShipsContext from "../../contexts/ShipsContext";

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
				<button
					type="button"
					className="buttonsWrapper__button"
					onClick={(e) => {
						if (window.confirm("Delete the ship?")) {
							shipsContext.deleteShip(e, props.ship.id);
						}
					}}
				>
					Delete Ship
				</button>
			</div>
		);
	}

	return ButtonBar;
};

export default ShipButtonBar;
