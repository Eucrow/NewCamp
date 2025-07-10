import React, { useContext, useState, useRef, useEffect } from "react";

import StratificationsContext from "../../../contexts/StratificationsContext";
import StratificationButtonBar from "../StratificationButtonBar";
import { useStratificationValidation } from "../../../hooks/useStratificationValidation";
import FloatingError from "../../ui/FloatingError";

/**
 * StratificationFormEdit component - Editable form for modifying existing stratifications.
 *
 * A comprehensive form component that allows users to edit existing stratification details.
 * Includes real-time validation, error handling, backup/restore functionality for cancellation,
 * and automatic focus management for improved user experience.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Object} props.stratification - The stratification object to edit
 * @param {number} props.stratification.id - Unique identifier for the stratification
 * @param {string} props.stratification.stratification - Current name of the stratification
 * @param {string} [props.stratification.description] - Current description of the stratification
 * @param {boolean} props.edit - Whether the form is currently in edit mode
 * @param {Function} props.setEdit - Function to toggle edit mode on/off
 * @returns {JSX.Element} The rendered editable stratification form with validation and actions
 */
const StratificationFormEdit = ({ stratification, edit, setEdit }) => {
  const stratificationsContext = useContext(StratificationsContext);
  const [backupStratification] = useState(stratification);
  const [formData, setFormData] = useState({
    id: stratification.id,
    stratification: stratification.stratification || "",
    description: stratification.description || "",
  });

  const { stratificationExists, requiredFields, isFormValid, errors } =
    useStratificationValidation(formData, stratification);

  const stratificationRef = useRef(null);

  useEffect(() => {
    if (edit && stratificationRef.current) {
      stratificationRef.current.focus();
    }
  }, [edit]);

  /**
   * Handle form submission and update the stratification.
   *
   * @function
   * @param {Event} e - The form submission event
   * @returns {void}
   */
  const handleSubmit = e => {
    e.preventDefault();
    stratificationsContext.updateStratification(formData);
    setEdit(false);
  };

  /**
   * Handle cancellation of edit mode and restore original values.
   *
   * @function
   * @returns {void}
   */
  const handleCancel = () => {
    setFormData({
      id: stratification.id,
      stratification: backupStratification.stratification || "",
      description: backupStratification.description || "",
    });
    setEdit(false);
  };

  /**
   * Handle input field changes and update form state.
   *
   * @function
   * @param {Event} e - The input change event
   * @param {string} e.target.name - The name of the input field
   * @param {string} e.target.value - The new value of the input field
   * @returns {void}
   */
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Render the editable stratification form.
   *
   * @function
   * @returns {JSX.Element} The rendered editable form with validation and action buttons
   */
  const renderContent = () => {
    return (
      <form className="form--wide" onSubmit={handleSubmit}>
        <div className="form__row">
          <label className="form__cell">
            Stratification:
            <input
              ref={stratificationRef}
              className={`stratifications__name`}
              type="text"
              name="stratification"
              id="stratification"
              value={formData.stratification}
              onChange={handleInputChange}
              required
              autoFocus
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
        </div>
        <div className="form__row">
          <label className="form__cell form--wide">
            Description:
            <textarea
              className="field__comment"
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="form__row">
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
