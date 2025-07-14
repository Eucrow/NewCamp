import React from "react";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

/**
 * StratificationsButtonBar component.
 *
 *
 * @component
 * @param {Object} props - The component props
 * @param {Function} props.handleAddStratification - Callback function to set addingStratification state to true,
 *                                                   which triggers the display of the new stratification form
 * @returns {JSX.Element} The rendered Add Stratification button wrapped in appropriate styling containers
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
