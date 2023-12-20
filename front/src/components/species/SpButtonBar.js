import React, { useContext } from "react";

import SpsContext from "../../contexts/SpsContext";

import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

/**
 * Button bar of Sp component.
 * @param {object} props survey object.
 * @param {boolean} edit variable to indicate if the element is edited or not.
 * @param {method} handleEdit method to handle de 'edit' boolean variable.
 */

const SpButtonBar = (props) => {
	const spsContext = useContext(SpsContext);

	var ButtonBar = "";

	if (props.add === true) {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<UiButtonSave buttonText={"Save Species"} />
				<UiButtonStatusHandle buttonText="Cancel" handleMethod={spsContext.handleAdd} newStatus={false} />
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
				<button
					type="button"
					className="buttonsWrapper__button"
					onClick={(e) => {
						props.handleEdit(true);
					}}
				>
					Edit Species
				</button>
				<UiButtonDelete
					id={props.sp_id}
					deleteMethod={spsContext.deleteSp}
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
