import React, { useContext, useState, useRef } from "react";

import StratificationsContext from "../../../contexts/StratificationsContext";
import StratificationButtonBar from "../StratificationButtonBar";

/**
 * StratificationFormEdit component.
 * Renders a form for editing a stratification, including validation and error display.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.stratification - The stratification object to edit.
 * @param {boolean} props.edit - Whether the form is in edit mode.
 * @param {Function} props.setEdit - Function to set the edit state.
 *
 * @returns {JSX.Element} The rendered form for editing a stratification.
 */
const StratificationFormEdit = ({ stratification, edit, setEdit }) => {
  const stratificationsContext = useContext(StratificationsContext);
  const [backupStratification] = useState(stratification);
  const [formData, setFormData] = useState({
    id: stratification.id,
    name: stratification.name || "",
    description: stratification.description || "",
  });

  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);

  // Basic validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = validateForm();

  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      stratificationsContext.updateStratification(formData);
      setEdit(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      id: backupStratification.id,
      name: backupStratification.name || "",
      description: backupStratification.description || "",
    });
    setErrors({});
    setEdit(false);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
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
              value={formData.name}
              onChange={handleInputChange}
              required
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
              value={formData.description}
              onChange={handleInputChange}
            />
          </label>
          <StratificationButtonBar
            edit={edit}
            setEdit={setEdit}
            stratification={stratification}
            handleCancel={handleCancel}
            isEdit={true}
            isValid={isFormValid}
          />
        </div>
      </form>
    );
  };

  return renderContent();
};

export default StratificationFormEdit;
