import React, { useState, useContext, useRef } from "react";

import StratificationButtonBar from "../StratificationButtonBar";
import StratificationsContext from "../../../contexts/StratificationsContext";

import { useStratificationValidation } from "../../../hooks/useStratificationValidation";
import FloatingError from "../../ui/FloatingError";

/**
 * StratificationFormNew component.
 *
 * Renders a form for creating a new stratification, including validation and error display.
 * Uses StratificationsContext for createStratification and setAddStratification.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.addStratification - Whether a new stratification is being added (controls button bar mode).
 * @returns {JSX.Element}
 */
const StratificationFormNew = ({ addStratification }) => {
  const stratificationsContext = useContext(StratificationsContext);
  const [newStratification, setNewStratification] = useState({
    stratification: "",
    description: "",
  });

  const { stratificationExists, requiredFields, isFormValid, errors } =
    useStratificationValidation(newStratification);

  // const [errors, setErrors] = useState({});
  const stratificationRef = useRef(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setNewStratification(prev_state => {
      return {
        ...prev_state,
        [name]: value,
      };
    });

    // Clear error when user starts typing
    // if (errors[name]) {
    //   setErrors(prev => ({
    //     ...prev,
    //     [name]: "",
    //   }));
    // }
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
    // setErrors({});
    stratificationsContext.setAddStratification(false);
  };

  const renderContent = () => {
    return (
      <form className="form--wide" onSubmit={e => handleSubmit(e)}>
        <div className="form__row">
          <label className="form__cell">
            Name:
            <input
              ref={stratificationRef}
              className={`stratification__name`}
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
              <input
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
