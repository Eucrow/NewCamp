import React, { useState, useContext, useRef, useEffect } from "react";

import StratumButtonBar from "../StratumButtonBar";
import StrataContext from "../../../contexts/StrataContext";

import { useStrataValidation } from "../../../hooks/useStrataValidation";
import FloatingError from "../../ui/FloatingError";

/**
 * StratumFormNew component - Form for creating new strata.
 *
 * Provides form fields for entering new stratum details with validation and error handling.
 * Automatically resets form and closes on successful creation.
 *
 * @component
 * @param {Object} props - The component props
 * @param {number} props.stratification_id - The ID of the parent stratification
 * @param {boolean} props.addingStratum - Whether new stratum is being added
 * @returns {JSX.Element} The rendered new stratum form
 */
const StratumFormNew = ({ stratification_id, addingStratum }) => {
  const strataContext = useContext(StrataContext);
  const [newStratum, setNewStratum] = useState({
    stratification: stratification_id,
    stratum: "",
    area: "",
    comment: "",
  });

  const stratumRef = useRef(null);

  useEffect(() => {
    if (addingStratum && stratumRef.current) {
      stratumRef.current.focus();
    }
  }, [addingStratum]);

  const { stratumExists, requiredFields, isFormValid, errors } =
    useStrataValidation(newStratum);

  /**
   * Handles input field changes and updates form state.
   */
  const handleChange = e => {
    const { name, value } = e.target;
    setNewStratum(prev_state => {
      return {
        ...prev_state,
        [name]: value,
      };
    });
  };

  /**
   * Handles form submission and creates the new stratum.
   */
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
    strataContext.setAddingStratum(false);
  };

  /**
   * Handles cancellation of new stratum creation.
   */
  const handleCancel = () => {
    strataContext.setAddingStratum(false);
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
            handleAdd={strataContext.setAddingStratum}
            addingStratum={addingStratum}
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
