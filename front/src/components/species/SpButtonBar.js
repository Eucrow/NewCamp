import React, { useContext } from "react";

import SpeciesContext from "../../contexts/SpeciesContext";

import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiIconEdit from "../ui/UiIconEdit";

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
				<UiButtonStatusHandle buttonText="Cancel" handleMethod={speciesContext.handleAdd} newStatus={false} />
			</div>
		);
	}

	if (props.edit === true) {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<UiButtonSave buttonText={"Save Species"} />
				<UiButtonStatusHandle buttonText="Cancel" handleMethod={props.handleEdit} newStatus={false} />
			</div>
		);
	}

	if (props.edit === false) {
		ButtonBar = (
			<div className="form__cell form__cell--right buttonsWrapper">
				<UiButtonStatusHandle buttonText={"Edit species"} handleMethod={props.handleEdit} newStatus={true}>
					<UiIconEdit />
				</UiButtonStatusHandle>
				<UiButtonDelete
					id={props.sp_id}
					deleteMethod={speciesContext.deleteSp}
					buttonText="Delete Species"
					confirmMessage="Delete this species? All the samples of this species on ALL the surveys will be removed!! Are you sure?"
				/>
				<UiButtonStatusHandle buttonText="Hide detail" handleMethod={props.changeDetail} newStatus={false} />
			</div>
		);
	}

	return ButtonBar;
};

export default SpButtonBar;
