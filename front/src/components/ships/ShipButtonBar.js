import React, { useContext } from "react";

import ShipsContext from "../../contexts/ShipsContext";

import UiButtonSave from "../ui/UiButtonSave";
import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

/**
 * ShipButtonBar component - Context-aware button bar for ship actions.
 *
 * This component provides different sets of action buttons based on the current mode
 * (adding new ship, editing existing ship, or viewing ship). It integrates with the
 * ships context to perform actions and manages button states based on form validation
 * and business rules (e.g., preventing deletion of ships in use by surveys).
 *
 * Features:
 * - Save/Cancel buttons for new ship creation
 * - Save/Cancel buttons for ship editing
 * - Edit/Delete buttons for ship viewing
 * - Conditional button states based on validation
 * - Protection against deleting ships in use
 *
 * @component
 * @param {number} ship_id - ID of the ship being managed
 * @param {boolean} editing - Whether the ship is in edit mode
 * @param {Function} setEditing - Function to toggle edit mode
 * @param {boolean} adding - Whether in new ship creation mode
 * @param {boolean} inSurveys - Whether ship is used in surveys
 * @param {boolean} isFormValid - Whether the current form data is valid
 * @returns {JSX.Element} The appropriate button bar for current mode
 */
const ShipButtonBar = ({
  ship_id,
  editing,
  setEditing,
  adding,
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
