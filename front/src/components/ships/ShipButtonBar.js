import React, { useContext } from "react";

import ShipsContext from "../../contexts/ShipsContext";

import UiButtonSave from "../ui/UiButtonSave";
import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

/**
 * Button bar of ship component.
 * @param {object} props.ship ship object.
 * @param {boolean} props.editing variable to indicate if the element is edited or not.
 * @param {method} props.handleEdit method to handle de 'editing' boolean variable.
 */
const ShipButtonBar = ({
  ship_id,
  editing,
  setEditing,
  adding,
  setAdding,
  inSurveys,
  isFormValid,
}) => {
  const shipsContext = useContext(ShipsContext);

  var ButtonBar = "";

  if (adding === true) {
    ButtonBar = (
      <div className="form__cell form__cell--right">
        <UiButtonSave buttonText={"Save Ship"} disabled={!isFormValid} />
        <button
          className="buttonsWrapper__button"
          type="button"
          onClick={e => {
            e.preventDefault();
            shipsContext.setAdding(false);
          }}
        >
          Cancel
        </button>
      </div>
    );
  }

  if (editing === true) {
    ButtonBar = (
      <div className="form__cell form__cell--right">
        <div className="buttonsWrapper">
          <UiButtonSave buttonText={"Save Ship"} disabled={!isFormValid} />

          <button
            className="buttonsWrapper__button"
            type="button"
            onClick={e => {
              e.preventDefault();
              setEditing(false);
              shipsContext.restoreShipsState();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (editing === false) {
    ButtonBar = (
      <div className="form__cell form__cell--right buttonsWrapper">
        <UiButtonStatusHandle
          buttonText={"Edit Ship"}
          handleMethod={setEditing}
          newStatus={true}
        ></UiButtonStatusHandle>
        <UiButtonDelete
          id={ship_id}
          deleteMethod={shipsContext.deleteShip}
          buttonText="Delete Ship"
          confirmMessage="Delete the ship?"
          disabled={inSurveys}
          disabledMessage={
            "This ship can't be deleted because it is used in a survey."
          }
        />
      </div>
    );
  }

  return ButtonBar;
};

export default ShipButtonBar;
