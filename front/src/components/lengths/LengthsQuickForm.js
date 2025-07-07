import React, { useContext } from "react";
import LengthsContext from "../../contexts/LengthsContext";

import LengthQuickForm from "./LengthQuickForm";

/**
 * LengthsQuickForm Component
 *
 * This component renders a quick form for adding lengths. The form only allow add number of
 * individuals without editing or removing lengths. The first input field
 * receive focus when the component is rendered.
 * @component
 * @returns {JSX.Element} A JSX element that renders the lengths quick form.
 */
const LengthsQuickForm = () => {
  const lengthsContext = useContext(LengthsContext);

  const unit = lengthsContext.measurement
    ? lengthsContext.measurement.name
    : "no unit";

  const renderContent = () => {
    if (lengthsContext.lengthsStatus === "new") {
      return (
        <div className="formLengths__table">
          <div className="formLengths__row ">
            <div className="formLengths__cell formLengths__cell--header">
              {unit}
            </div>
            <div className="formLengths__cell formLengths__cell--header">
              number
            </div>
          </div>
          {lengthsContext.lengths.map((l, idx) => {
            return (
              <LengthQuickForm
                l={l}
                idx={idx}
                key={idx}
                autofocus={idx === 0 ? true : undefined} // Pass the autofocus prop ONLY to the first length input
              />
            );
          })}
        </div>
      );
    }
  };

  return renderContent();
};

export default LengthsQuickForm;
