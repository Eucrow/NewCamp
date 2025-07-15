import React from "react";

import UiButtonAdd from "../ui/UiButtonAdd";

/**
 * Component of Surveys bar.
 * @param {boolean} addingSurvey true to show "Add" button.
 * @param {method} handleAdd Method to handle the 'addingSurvey' parameter.
 */
const SurveysButtonBar = ({ addingSurvey, handleAdd }) => {
  var ButtonBar = null;

  if (addingSurvey === false) {
    ButtonBar = (
      <div className="survey__cell survey__cell--right buttonsWrapper">
        <UiButtonAdd handleAdd={handleAdd} text={"Add Survey"} />
      </div>
    );
  }

  return ButtonBar;
};

export default SurveysButtonBar;
