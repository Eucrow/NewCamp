import React, { useContext } from "react";

import ShipsContext from "../../contexts/ShipsContext";

import UiButtonSave from "../ui/UiButtonSave";
import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

/**
 * Button bar of ship component.
 * @param {object} props.ship ship object.
 * @param {boolean} props.edit variable to indicate if the element is edited or not.
 * @param {method} props.handleEdit method to handle de 'edit' boolean variable.
 */
const ShipButtonBar = props => {
  const shipsContext = useContext(ShipsContext);

  var ButtonBar = "";

  if (props.add === true) {
    ButtonBar = (
      <div className="form__cell form__cell--right">
        <UiButtonSave buttonText={"Save Ship"} />
        <UiButtonStatusHandle
          buttonText={"Cancel"}
          handleMethod={props.handleEdit}
          newStatus={false}
        />
      </div>
    );
  }

  if (props.edit === true) {
    ButtonBar = (
      <div className="form__cell form__cell--right">
        <div className="buttonsWrapper">
          <UiButtonSave buttonText={"Save Ship"} />
          <UiButtonStatusHandle
            buttonText={"Cancel"}
            handleMethod={props.handleEdit}
            newStatus={false}
          />
        </div>
      </div>
    );
  }

  if (props.edit === false) {
    ButtonBar = (
      <div className="form__cell form__cell--right buttonsWrapper">
        <UiButtonStatusHandle
          buttonText={"Edit Ship"}
          handleMethod={props.handleEdit}
          newStatus={true}
        ></UiButtonStatusHandle>
        <UiButtonDelete
          id={props.ship_id}
          deleteMethod={shipsContext.deleteShip}
          buttonText="Delete Ship"
          confirmMessage="Delete the ship?"
        />
      </div>
    );
  }

  return ButtonBar;
};

export default ShipButtonBar;
