import React from "react";
import UiButtonAdd from "../ui/UiButtonAdd";

/**
 * Component of Ships bar.
 * @param {boolean} adding true to show "adding" button.
 * @param {method} setAdding Method to handle the 'adding' parameter.
 */
const ShipsButtonBar = ({ adding, setAdding }) => {
  var ButtonBar = null;

  if (adding === false) {
    ButtonBar = (
      <div className="survey__cell survey__cell--right buttonsWrapper">
        <UiButtonAdd handleAdd={setAdding} text={"Add Ship"} />
      </div>
    );
  }

  return ButtonBar;
};

export default ShipsButtonBar;
