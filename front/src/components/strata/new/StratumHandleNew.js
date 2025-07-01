import React, { useState } from "react";

import StratumButtonBar from "../StratumButtonBar";

/**
 * New stratum component
 * @param {number} stratification_id
 * @param {method} handleAdd
 * @param {method} createStratum
 * @param {method} validateStratumName
 * @returns {JSX.Element}
 */
const StratumFormNew = ({
  stratification_id,
  handleAdd,
  addStratum,
  handleCancel,
  createStratum,
  validateStratumName,
}) => {
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
    if (validateStratumName && !validateStratumName(newStratum.stratum)) {
      alert("Stratum name already exists in this stratification");
      return;
    }

    // Call the createStratum function passed from parent
    if (createStratum) {
      createStratum(newStratum);
    }

    // Reset form and close
    setNewStratum({
      stratification: stratification_id,
      stratum: "",
      area: "",
      comment: "",
    });
    handleAdd(false);
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
            handleAdd={handleAdd}
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
