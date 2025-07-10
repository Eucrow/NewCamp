import React, { useState, useContext, useRef, useEffect } from "react";

import StratificationButtonBar from "../StratificationButtonBar";
import StratificationsContext from "../../../contexts/StratificationsContext";

import { useStratificationValidation } from "../../../hooks/useStratificationValidation";
import FloatingError from "../../ui/FloatingError";

/**
 * StratificationFormNew component - Form for creating new stratifications.
 *
 * A comprehensive form component for creating new stratifications from scratch.
 * Provides real-time validation, error handling, and a clean user interface
 * for entering stratification details. Automatically manages form state and
 * provides feedback to users during the creation process.
 *
 * @component
 * @param {Object} props - The component props
 * @param {boolean} props.addStratification - Whether a new stratification is being added.
 *                                           Used to control button bar mode and auto-focus behavior
 * @returns {JSX.Element} The rendered new stratification form with validation and actions
 */
const StratificationFormNew = ({ addStratification }) => {
  const stratificationsContext = useContext(StratificationsContext);
  const [newStratification, setNewStratification] = useState({
    stratification: "",
    description: "",
  });

  const { stratificationExists, requiredFields, isFormValid, errors } =
    useStratificationValidation(newStratification);

  const stratificationRef = useRef(null);

  useEffect(() => {
    if (addStratification && stratificationRef.current) {
      stratificationRef.current.focus();
    }
  }, [addStratification]);

  /**
   * Handle input field changes and update form state.
   *
   * @function
   * @param {Event} e - The input change event
   * @param {string} e.target.name - The name of the input field being changed
   * @param {string} e.target.value - The new value entered by the user
   * @returns {void}
   */
  const handleChange = e => {
    const { name, value } = e.target;
    setNewStratification(prev_state => {
      return {
        ...prev_state,
        [name]: value,
      };
    });
  };

  /**
   * Handle form submission and create the new stratification.
   *
   * @function
   * @param {Event} e - The form submission event
   * @returns {void}
   */
  const handleSubmit = e => {
    e.preventDefault();
    stratificationsContext.createStratification(newStratification);
  };

  /**
   * Handle cancellation of new stratification creation.
   *
   * @function
   * @returns {void}
   */
  const handleCancel = () => {
    setNewStratification({
      stratification: "",
      description: "",
    });
    // setErrors({});
    stratificationsContext.setAddStratification(false);
  };

  /**
   * Render the new stratification creation form.
   *
   * @function
   * @returns {JSX.Element} The rendered new stratification form with validation and action buttons
   */
  const renderContent = () => {
    return (
      <form className="form--wide" onSubmit={e => handleSubmit(e)}>
        <div className="form__row">
          <label className="form__cell">
            Stratification:
            <input
              ref={stratificationRef}
              className={`stratifications__name`}
              type="text"
              name="stratification"
              id="stratification"
              value={newStratification.stratification}
              onChange={handleChange}
              required
              placeholder="Enter stratification name"
            />
            <FloatingError
              message={errors.stratificationExists}
              show={stratificationExists}
              inputRef={stratificationRef}
            />
            <FloatingError
              message={errors.requiredFields}
              show={!requiredFields}
              inputRef={stratificationRef}
            />
          </label>
          <div className="form__row">
            <label className="form__cell form--wide">
              Description:
              <textarea
                className="field__comment"
                type="text"
                name="description"
                id="description"
                value={newStratification.description}
                onChange={handleChange}
                placeholder="Enter description (optional)"
              />
            </label>
          </div>
          <div className="form__row">
            <StratificationButtonBar
              addStratification={addStratification}
              handleAdd={handleCancel}
              isValid={isFormValid}
            />
          </div>
        </div>
      </form>
    );
  };

  return renderContent();
};

export default StratificationFormNew;
