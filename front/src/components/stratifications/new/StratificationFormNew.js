import React, { useState, useContext, useRef } from "react";

import StratificationButtonBar from "../StratificationButtonBar";
import StratificationsContext from "../../../contexts/StratificationsContext";

/**
 * StratificationFormNew component.
 * Renders a form for creating a new stratification, including validation and error display.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.addStratification - Whether a new stratification is being added (controls button bar mode).
 *
 * @returns {JSX.Element} The rendered form for creating a new stratification.
 */
const StratificationFormNew = ({ addStratification }) => {
  const stratificationsContext = useContext(StratificationsContext);
  const [newStratification, setNewStratification] = useState({
    stratification: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setNewStratification(prev_state => {
      return {
        ...prev_state,
        [name]: value,
      };
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    stratificationsContext.createStratification(newStratification);
  };

  const handleCancel = () => {
    setNewStratification({
      stratification: "",
      description: "",
    });
    setErrors({});
    stratificationsContext.setAddStratification(false);
  };

  const renderContent = () => {
    return (
      <form className="form--wide" onSubmit={e => handleSubmit(e)}>
        <div className="form__row">
          <label className="form__cell">
            Name:
            <input
              ref={nameRef}
              className={`stratification__name ${errors.name ? "error" : ""}`}
              type="text"
              name="stratification"
              id="stratification"
              value={newStratification.stratification}
              onChange={handleChange}
              required
              placeholder="Enter stratification name"
            />
            {errors.stratification && (
              <span className="error-message">{errors.name}</span>
            )}
          </label>
          <label className="form__cell">
            Description:
            <input
              type="text"
              name="description"
              id="description"
              value={newStratification.description}
              onChange={handleChange}
              placeholder="Enter description (optional)"
            />
          </label>
          <StratificationButtonBar
            addStratification={addStratification}
            handleAdd={handleCancel}
            // isValid={isFormValid}
            isValid={true}
          />
        </div>
      </form>
    );
  };

  return renderContent();
};

export default StratificationFormNew;
