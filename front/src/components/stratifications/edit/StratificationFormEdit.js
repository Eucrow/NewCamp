import React, { useContext, useState, useRef } from "react";

import StratificationsContext from "../../../contexts/StratificationsContext";
import StratificationButtonBar from "../StratificationButtonBar";
import { useStratificationValidation } from "../../../hooks/useStratificationValidation";
import FloatingError from "../../ui/FloatingError";

/**
 * StratificationFormEdit component.
 *
 * Renders a form for editing a stratification, including validation and error display.
 * Uses StratificationsContext for updateStratification.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.stratification - The stratification object to edit.
 * @param {boolean} props.edit - Whether the form is in edit mode.
 * @param {Function} props.setEdit - Function to set the edit state.
 * @returns {JSX.Element}
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

  const handleSubmit = e => {
    e.preventDefault();
    stratificationsContext.updateStratification(formData);
    setEdit(false);
  };

  const handleCancel = () => {
    setFormData({
      stratification: backupStratification.stratification || "",
      description: backupStratification.description || "",
    });
    setEdit(false);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderContent = () => {
    return (
      <form className="form--wide" onSubmit={handleSubmit}>
        <div className="form__row">
          <label className="form__cell">
            Name:
            <input
              ref={stratificationRef}
              className={`stratification__name`}
              type="text"
              name="stratification"
              id="stratification"
              value={formData.stratification}
              onChange={handleInputChange}
              required
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
            <input
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
