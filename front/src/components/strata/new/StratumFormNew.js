import React, { useState, useContext } from "react";

import StratumButtonBar from "../StratumButtonBar";
import StrataContext from "../../../contexts/StrataContext";

/**
 * New stratum component
 * @param {number} stratification_id
 * @param {method} handleAdd
 * @param {method} addStratum
 * @returns {JSX.Element}
 */
const StratumFormNew = ({ stratification_id, addStratum }) => {
  const strataContext = useContext(StrataContext);
  const [newStratum, setNewStratum] = useState({
    stratification: stratification_id,
    stratum: "",
    area: "",
    comment: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setNewStratum(prev_state => {
      return {
        ...prev_state,
        [name]: value,
      };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Validate stratum name if validation function is provided
    if (
      strataContext.validateStratumName &&
      !strataContext.validateStratumName(newStratum.stratum)
    ) {
      alert("Stratum name already exists in this stratification");
      return;
    }

    // Call the createStratum function from context
    if (strataContext.createStratum) {
      strataContext.createStratum(newStratum);
    }

    // Reset form and close
    setNewStratum({
      stratification: stratification_id,
      stratum: "",
      area: "",
      comment: "",
    });
    strataContext.setAddStratum(false);
  };

  const handleCancel = () => {
    strataContext.setAddStratum(false);
  };

  const renderContent = () => {
    return (
      <form className="form--wide" onSubmit={handleSubmit}>
        <div className="form__row">
          <label className="form__cell">
            Stratum:
            <input
              className="stratum__description"
              type="text"
              id="stratum"
              name="stratum"
              autoFocus
              required
              maxLength="50"
              value={newStratum?.stratum || ""}
              onChange={handleChange}
            />
          </label>

          <label className="form__cell">
            Area:
            <input
              type="number"
              id="area"
              name="area"
              min="1"
              max="9999"
              value={newStratum?.area || ""}
              onChange={handleChange}
            />
          </label>

          <StratumButtonBar
            handleCancel={handleCancel}
            handleAdd={strataContext.setAddStratum}
            addStratum={addStratum}
          />
        </div>
        <div className="form__row">
          <label className="form__cell">
            Comment:
            <textarea
              id="comment"
              name="comment"
              maxLength="1000"
              rows="3"
              value={newStratum?.comment || ""}
              onChange={handleChange}
            />
          </label>
        </div>
      </form>
    );
  };

  return renderContent();
};

export default StratumFormNew;
