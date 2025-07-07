import React from "react";
import UiButtonAdd from "../ui/UiButtonAdd";

/**
 * Component of Ships bar.
 * @param {boolean} add true to show "Add" button.
 * @param {method} handleAdd Method to handle the 'add' parameter.
 */
const ShipsButtonBar = ({ add, handleAdd }) => {
  var ButtonBar = null;

  if (add === false) {
    ButtonBar = (
      <div className="survey__cell survey__cell--right buttonsWrapper">
        <UiButtonAdd handleAdd={handleAdd} text={"Add Ship"} />
      </div>
    );
  }

  return ButtonBar;
};

export default ShipsButtonBar;
