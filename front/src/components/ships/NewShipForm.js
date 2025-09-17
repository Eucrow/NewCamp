import React, { useState, useContext, useRef } from "react";

import { useShipsValidation } from "../../hooks/useShipsValidation";
import FloatingError from "../ui/FloatingError";

import ShipsContext from "../../contexts/ShipsContext";

import { preventNegativeE } from "../../utils/dataUtils";

import ShipButtonBar from "./ShipButtonBar";

/**
 * NewShipForm component - Form for creating new ships.
 *
 * This component provides a comprehensive form interface for adding new ships to the system.
 * It includes all necessary fields for ship data entry and integrates with the ships validation system
 * to ensure data integrity. The form features real-time validation feedback and prevents submission
 * of invalid or duplicate ship data.
 *
 * Features:
 * - Complete form with all ship fields (name, DATRAS code, length, year built, comment)
 * - Real-time validation with visual feedback
 * - Duplicate ship name detection
 * - Input constraints and formatting
 * - Cancel and submit functionality
 *
 * @component
 * @returns {JSX.Element} The new ship creation form
 */
const NewShipForm = () => {
  const [ship, setShip] = useState({});
  const context = useContext(ShipsContext);

  const nameRef = useRef(null);

  const { isFormValid, validationErrors, existsShip } =
    useShipsValidation(ship);

  /**
   * Handles input field changes and updates ship state.
   *
   * @function handleChange
   * @param {Event} e - The input change event
   */
  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setShip({
      ...ship,
      [name]: value,
    });
  };

  const renderContent = () => {
    const currentYear = new Date().getFullYear();

    const content = (
      <form
        className="wrapper"
        onSubmit={e => {
          context.createShip(e, ship);
          context.setAdding(false);
        }}
      >
        <div className="form__row">
          <span className="field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className={existsShip ? "ship__name invalid" : "ship__name"}
              ref={nameRef}
              required
              size={30}
              autoFocus
              onChange={handleChange}
            />
          </span>
          <FloatingError
            message={validationErrors.existsShip}
            show={existsShip}
            inputRef={nameRef}
          />
        </div>
        <div className="form__row">
          <span className="field">
            <label htmlFor="datras_id">DATRAS code:</label>
            <input
              type="text"
              id="datras_id"
              name="datras_id"
              size={4}
              maxLength={4}
              pattern="^\w{2,4}$"
              onChange={handleChange}
              title="Only letters and numbers, max 4 characters."
            />
          </span>
          <span className="field">
            <label htmlFor="length">Length (m):</label>
            <input
              type="number"
              id="length"
              name="length"
              min={0}
              max={999.99}
              size={5}
              step={0.01}
              onChange={handleChange}
              onKeyDown={preventNegativeE}
              title="Only positive numbers, max 999.99."
            />
          </span>
          <span className="field">
            <label htmlFor="beam">Beam (m):</label>
            <input
              type="number"
              id="beam"
              name="beam"
              min={0}
              max={99.99}
              size={4}
              step={0.01}
              onChange={handleChange}
              onKeyDown={preventNegativeE}
              title="Only positive numbers, max 99.99."
            />
          </span>
          <span className="field">
            <label htmlFor="main_power">Main power (kW):</label>
            <input
              type="number"
              id="main_power"
              name="main_power"
              min={0}
              max={9999}
              size={4}
              onChange={handleChange}
              onKeyDown={preventNegativeE}
              title="Only positive numbers, max 9999."
            />
          </span>
          <span className="field">
            <label htmlFor="year_built">Year built:</label>
            <input
              type="number"
              id="year_built"
              name="year_built"
              min={1900}
              max={currentYear}
              size={4}
              onChange={handleChange}
              onKeyDown={preventNegativeE}
              title={`Only positive numbers, from 1900 to ${currentYear}.`}
            />
          </span>
        </div>
        <div className="form__row">
          <span className="field__comment">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              name="comment"
              className="comment"
              size={500}
              onChange={handleChange}
            ></textarea>
          </span>
        </div>
        <div className="form__row">
          <div className="survey__cell survey__cell--right buttonsWrapper">
            <ShipButtonBar adding={true} isFormValid={isFormValid} />
          </div>
        </div>
      </form>
    );

    return content;
  };

  return renderContent();
};

export default NewShipForm;
