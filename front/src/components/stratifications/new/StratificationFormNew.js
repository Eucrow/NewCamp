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
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);

  // Basic validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!newStratification.name?.trim()) {
      newErrors.name = "Name is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = validateForm();

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
        [name]: ""
      }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (validateForm()) {
      // Call the createStratification function from context
      if (stratificationsContext.createStratification) {
        stratificationsContext.createStratification(newStratification);
      }
    }
  };

  const handleCancel = () => {
    setNewStratification({
      name: "",
      description: "",
    });
    setErrors({});
    stratificationsContext.handleCancelAdd();
  };

  const renderContent = () => {
    return (
      <form className="form--wide" onSubmit={handleSubmit}>
        <div className="form__row">
          <label className="form__cell">
            Name:
            <input
              ref={nameRef}
              className={`stratification__name ${errors.name ? "error" : ""}`}
              type="text"
              name="name"
              id="name"
              value={newStratification.name}
              onChange={handleChange}
              required
              placeholder="Enter stratification name"
            />
            {errors.name && (
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
            isValid={isFormValid}
          />
        </div>
      </form>
    );
  };

  return renderContent();
};

export default StratificationFormNew;
