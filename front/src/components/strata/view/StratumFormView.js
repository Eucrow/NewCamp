import React, { useContext } from "react";

import StrataContext from "../../../contexts/StrataContext";
import StratumButtonBar from "../StratumButtonBar";

/**
 * StratumFormView component - Read-only display of stratum details.
 *
 * Displays stratum information in disabled form fields with action buttons.
 * Shows stratum name, area, and comment in read-only format.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Object} props.stratum - The stratum object to display
 * @param {boolean} props.edit - Current edit state
 * @param {Function} props.setEdit - Function to toggle edit mode
 * @param {boolean} props.isDeleteable - Whether stratum can be deleted
 * @returns {JSX.Element} The rendered read-only stratum form
 */
const StratumFormView = ({ stratum, edit, setEdit, isDeleteable }) => {
  const strataContext = useContext(StrataContext);

  const renderContent = () => {
    return (
      <form className="form--wide">
        <div className="form__row">
          <label className="form__cell">
            Stratum:
            <input
              className="stratum__description"
              type="text"
              name="stratum"
              id="stratum"
              disabled
              value={stratum.stratum || ""}
            />
          </label>
          <label className="form__cell">
            Area:
            <input
              type="number"
              name="area"
              id="area"
              min="1"
              max="9999"
              disabled
              value={stratum.area || ""}
            />
          </label>
          <StratumButtonBar
            edit={edit}
            setEdit={setEdit}
            stratum={stratum}
            deleteStratum={strataContext.deleteStratum}
            isDeleteable={isDeleteable}
          />
        </div>
        <div className="form__row">
          <label className="form__cell form--wide">
            Comment:
            <textarea
              className="field__comment"
              name="comment"
              id="comment"
              disabled
              value={stratum.comment || ""}
            />
          </label>
        </div>
      </form>
    );
  };
  return renderContent();
};

export default StratumFormView;
