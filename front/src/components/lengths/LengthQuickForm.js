import React, { useContext } from "react";

import LengthsContext from "../../contexts/LengthsContext";

/**
 * Renders the quick form for adding one length. The form only allow add number of
 * individuals without editing or removing lengths
 * @component
 *
 * @returns {JSX.Element} A JSX element that renders the length form.
 */
const LengthQuickForm = ({ l, idx, autofocus }) => {
  const lengthsContext = useContext(LengthsContext);

  const renderContent = () => {
    return (
      <div className="formLengths__row" key={idx}>
        <div className="formLengths__cell">
          <input
            type="number"
            name="length"
            min="0"
            max="9999"
            value={l.length}
            disabled
          />
        </div>

        <div className="formLengths__cell">
          <input
            type="number"
            name="number_individuals"
            min="0"
            max="9999"
            autoFocus={autofocus} // Autofocus only for the first length input
            value={l.number_individuals}
            onChange={e => lengthsContext.editLength(idx, e)}
          />
        </div>
      </div>
    );
  };

  return renderContent();
};

export default LengthQuickForm;
