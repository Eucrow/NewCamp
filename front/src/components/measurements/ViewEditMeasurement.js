import React, { useState, useRef, useEffect } from "react";

import MeasurementButtonBar from "./MeasurementButtonBar";

/**
 * Renders a form for viewing and editing a measurement.
 *
 * @component
 * @param {Object} measurement - The measurement object.
 * @param {Function} handleChange - The function to handle input changes.
 * @param {Function} updateMeasurement - The function to update the measurement.
 * @param {Function} setMeasurements - The function to set the measurements.
 * @param {Array} backupMeasurements - The backup measurements array.
 * @param {Function} isNameValid - The function to check if the name is valid.
 * @returns {JSX.Element} The rendered ViewEditMeasurement component.
 */
const ViewEditMeasurement = ({
  measurement,
  handleChange,
  updateMeasurement,
  setMeasurements,
  backupMeasurements,
  isNameValid,
}) => {
  // const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const nameInputRef = useRef(null);

  const handleCancel = () => {
    setMeasurements(backupMeasurements);
    // setAdd(false);
    setEdit(false);
  };

  useEffect(() => {
    if (edit && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [edit]);

  const renderContent = () => {
    const handleSubmit = e => {
      updateMeasurement(e, measurement.id);
      setEdit(false);
    };

    const content = (
      <form className="wrapper" onSubmit={handleSubmit}>
        <div className="form__row" key={measurement.id}>
          <div className="form__cell">
            <label>
              Name:
              <input
                type="text"
                id="name"
                name="name"
                ref={nameInputRef}
                value={measurement.name}
                disabled={!edit}
                size={6}
                onChange={e => handleChange(e, measurement.id)}
              />
            </label>
          </div>
          <div className="form__cell noSpinner">
            <label>
              Increment (mm):
              <input
                type="number"
                id="increment"
                name="increment"
                value={measurement.increment}
                // disabled={!edit}
                disabled={true}
                min="0"
                max="9999"
                size={4}
                step={1}
                onChange={e => handleChange(e, measurement.id)}
              />
            </label>
          </div>
          <div className="form__cell noSpinner">
            <label>
              Conversion factor (to mm):
              <input
                type="number"
                id="conversion_factor"
                name="conversion_factor"
                value={measurement.conversion_factor}
                // disabled={!edit}
                disabled={true}
                min="0"
                max="9999"
                size={4}
                step={0.001}
                onChange={e => handleChange(e, measurement.id)}
              />
            </label>
          </div>
          <MeasurementButtonBar
            // add={add}
            edit={edit}
            // handleAdd={setAdd}
            handleEdit={setEdit}
            handleCancel={handleCancel}
            isNameValid={isNameValid}
          />
        </div>
      </form>
    );
    return content;
  };

  return renderContent();
};

export default ViewEditMeasurement;
