import React from "react";

import UiButtonAdd from "../ui/UiButtonAdd";

/**
 * Component of Surveys bar.
 * @param {boolean} add true to show "Add" button.
 * @param {method} handleAdd Method to handle the 'add' parameter.
 */
const SurveysButtonBar = ({ add, handleAdd }) => {
  var ButtonBar = null;

  if (add === false) {
    ButtonBar = (
      <div className="survey__cell survey__cell--right buttonsWrapper">
        <UiButtonAdd handleAdd={handleAdd} text={"Add Survey"} />
      </div>
    );
  }

  return ButtonBar;
};

export default SurveysButtonBar;
