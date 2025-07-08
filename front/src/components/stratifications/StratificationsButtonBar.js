import React from "react";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

/**
 * StratificationsButtonBar component.
 * Renders the "Add Stratification" button for the stratifications list.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.handleAddStratification - Function to set addStratification state to true.
 *
 * @returns {JSX.Element} The rendered Add Stratification button.
 */
const StratificationsButtonBar = ({ handleAddStratification }) => (
  <div className="survey__cell survey__cell--right buttonsWrapper">
    <UiButtonStatusHandle
      buttonText={"Add Stratification"}
      handleMethod={handleAddStratification}
      newStatus={true}
    />
  </div>
);

export default StratificationsButtonBar;
