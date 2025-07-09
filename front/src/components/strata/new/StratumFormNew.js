import React, { useState, useContext, useRef, useEffect } from "react";

import StratumButtonBar from "../StratumButtonBar";
import StrataContext from "../../../contexts/StrataContext";

import { useStrataValidation } from "../../../hooks/useStrataValidation";
import FloatingError from "../../ui/FloatingError";

/**
 * StratumFormNew component.
 * Renders a form for creating a new stratum, including validation and error display.
 *
 * @param {Object} props - The component props.
 * @param {number} props.stratification_id - The ID of the stratification to which the new stratum belongs.
 * @param {boolean} props.addStratum - Whether a new stratum is being added (controls button bar mode).
 *
 * @returns {JSX.Element} The rendered form for creating a new stratum.
 */
const StratumFormNew = ({ stratification_id, addStratum }) => {
  const strataContext = useContext(StrataContext);
  const [newStratum, setNewStratum] = useState({
    stratification: stratification_id,
    stratum: "",
    area: "",
    comment: "",
  });

  const stratumRef = useRef(null);

  useEffect(() => {
    if (addStratum && stratumRef.current) {
      stratumRef.current.focus();
    }
  }, [addStratum]);

  const { stratumExists, requiredFields, isFormValid, errors } =
    useStrataValidation(newStratum);

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
              required
              maxLength="50"
              value={newStratum?.stratum || ""}
              onChange={handleChange}
              ref={stratumRef}
            />
            <FloatingError
              message={errors.stratumExists}
              show={stratumExists}
              inputRef={stratumRef}
            />
            <FloatingError
              message={errors.requiredFields}
              show={!requiredFields}
              inputRef={stratumRef}
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
            isValid={isFormValid}
          />
        </div>
        <div className="form__row">
          <label className="form__cell form--wide">
            Comment:
            <textarea
              className="field__comment"
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
