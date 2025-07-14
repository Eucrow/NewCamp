import React from "react";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

/**
 * StrataButtonBar component - Add button for strata list.
 *
 * Renders an "Add Stratum" button to initiate new stratum creation.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Function} props.handleAddStratum - Function to set addStratum state to true
 * @returns {JSX.Element} The rendered Add Stratum button
 */
const StrataButtonBar = ({ handleAddStratum }) => (
  <div className="survey__cell survey__cell--right buttonsWrapper">
    <UiButtonStatusHandle
      buttonText={"Add Stratum"}
      handleMethod={handleAddStratum}
      newStatus={true}
    />
  </div>
);

export default StrataButtonBar;
