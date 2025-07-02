import React from "react";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

/**
 * StrataButtonBar component.
 * Renders the "Add Stratum" button for the strata list.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.handleAddStratum - Function to set addStratum state to true.
 *
 * @returns {JSX.Element} The rendered Add Stratum button.
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
