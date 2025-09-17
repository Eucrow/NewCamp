import React from "react";

import UiButtonAdd from "../ui/UiButtonAdd";

/**
 * SurveysButtonBar component that provides action buttons for the surveys list.
 *
 * This component renders an "Add Survey" button when not in adding mode. It acts
 * as a toolbar for the main surveys interface, providing primary actions for
 * survey management. The component conditionally renders based on the current
 * state to avoid showing duplicate or conflicting actions.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.addingSurvey - Flag indicating if currently adding a survey
 * @param {Function} props.handleAdd - Function to handle adding survey state change
 * @returns {JSX.Element|null} Button bar component or null if adding survey
 *
 * @example
 * // Display add button when not adding
 * <SurveysButtonBar
 *   addingSurvey={false}
 *   handleAdd={setAddingSurvey}
 * />
 *
 * @requires UiButtonAdd - Reusable add button component
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
