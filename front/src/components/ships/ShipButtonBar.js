import React, { useContext } from "react";

import ShipsContext from "../../contexts/SuverysContext";

const ShipButtonBar = ({ props, edit }) => {
	const shipsContext = useContext(ShipsContext);

	var ButtonBar = "";

	if (edit === true) {
		ButtonBar = (
			<div className="survey__cell survey__cell--right">
				<div className="buttonsWrapper">
					<button type="submit" className="buttonsWrapper__button">
						Save Ship
					</button>
					<button
						type="button"
						className="buttonsWrapper__button"
						onClick={(e) => {
							props.changeEdit(false);
						}}
					>
						Cancel
					</button>
				</div>
			</div>
		);
	}

	if (edit === false) {
		ButtonBar = (
			<div className="survey__cell survey__cell--right buttonsWrapper">
				<button
					type="button"
					className="buttonsWrapper__button"
					onClick={(e) => {
						props.changeEdit(true);
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
