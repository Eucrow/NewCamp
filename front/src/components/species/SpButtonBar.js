import React, { useContext } from "react";

import SpeciesContext from "../../contexts/SpeciesContext";

import UiButtonCancel from "../ui/UiButtonCancel";
import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonSave from "../ui/UiButtonSave";

/**
 * Button bar of Sp component.
 * @param {object} props survey object.
 * @param {boolean} edit variable to indicate if the element is edited or not.
 * @param {method} handleEdit method to handle de 'edit' boolean variable.
 */

const SpButtonBar = (props) => {
	const speciesContext = useContext(SpeciesContext);

	var ButtonBar = "";

	if (props.add === true) {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<UiButtonSave buttonText={"Save Species"} />
				<UiButtonCancel handleMethod={speciesContext.handleAdd} />
			</div>
		);
	}

	if (props.edit === true) {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<UiButtonSave buttonText={"Save Species"} />
				<UiButtonCancel handleMethod={props.changeEdit} />
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
				<UiButtonDelete
					id={props.sp_id}
					deleteMethod={speciesContext.deleteSp}
					buttonText="Delete Species"
					confirmMessage="Delete this species? All the samples of this species on ALL the surveys will be removed!! Are you sure?"
				/>
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
