import React, { useContext } from "react";

import SpeciesContext from "../../contexts/SpeciesContext";

const SpButtonBar = (props) => {
	const speciesContext = useContext(SpeciesContext);

	var ButtonBar = "";

	if (props.add === true) {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<div className="buttonsWrapper">
					<button type="submit" className="buttonsWrapper__button">
						Save Species
					</button>
					<button
						type="button"
						className="buttonsWrapper__button"
						onClick={(e) => {
							speciesContext.handleAdd(false);
						}}
					>
						Cancel
					</button>
				</div>
			</div>
		);
	}

	if (props.edit === true) {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<div className="buttonsWrapper">
					<button type="submit" className="buttonsWrapper__button">
						Save Species
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

	if (props.edit === false) {
		ButtonBar = (
			<div className="form__cell form__cell--right buttonsWrapper">
				<button
					type="button"
					className="buttonsWrapper__button"
					onClick={(e) => {
						props.changeEdit(true);
					}}
				>
					Edit Species
				</button>
				<button
					type="button"
					className="buttonsWrapper__button"
					onClick={(e) => {
						if (
							window.confirm(
								"Delete the species? All the samples of this species on ALL the surveys will be removed!!"
							)
						) {
							speciesContext.deleteSp(e, props.sp_id);
						}
					}}
				>
					Delete Species
				</button>
				<button
					type="button"
					className="buttonsWrapper__button"
					onClick={(e) => {
						props.changeDetail(false);
					}}
				>
					Hide Detail
				</button>
			</div>
		);
	}

	return ButtonBar;
};

export default SpButtonBar;
