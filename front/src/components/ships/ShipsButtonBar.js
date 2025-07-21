import React from "react";
import UiButtonAdd from "../ui/UiButtonAdd";

/**
 * ShipsButtonBar component - Action button bar for ships management.
 *
 * This component provides the main action buttons for the ships interface.
 * It conditionally displays an "Add Ship" button when not in adding mode.
 * The button bar integrates with the parent component's state to control
 * the visibility of the new ship form.
 *
 * @component
 * @param {boolean} adding - Whether the new ship form is currently visible
 * @param {Function} setAdding - Function to toggle the new ship form visibility
 * @returns {JSX.Element|null} The button bar or null if in adding mode
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
