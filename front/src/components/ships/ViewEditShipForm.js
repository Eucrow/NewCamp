import React, { useContext, useRef, useState } from "react";

import ShipsContext from "../../contexts/ShipsContext";

import { useShipsValidation } from "../../hooks/useShipsValidation";

import { preventNegativeE } from "../../utils/dataUtils";

import ShipButtonBar from "./ShipButtonBar";
import FloatingError from "../ui/FloatingError";

/**
 * ViewEditShipForm component - Dual-mode form for viewing and editing ships.
 *
 * This component provides a comprehensive interface that can switch between view and edit modes
 * for individual ship records. In view mode, it displays ship information as read-only fields.
 * In edit mode, it allows full modification of ship properties with validation.
 * The component integrates with the ships context and validation system to ensure data integrity.
 *
 * Features:
 * - Toggle between view and edit modes
 * - Complete ship data display and editing
 * - Real-time validation during editing
 * - Action buttons (edit, save, cancel, delete)
 * - Protection against editing ships that are in use by surveys
 *
 * @component
 * @param {Object} ship - Ship object containing all ship data
 * @param {boolean} editing - Whether the form is in edit mode
 * @param {Function} setEditing - Function to toggle edit mode
 * @param {boolean} inSurveys - Whether this ship is currently used in surveys
 * @returns {JSX.Element} The view/edit ship form
 */
const ViewEditShipForm = ({ ship, editing, setEditing, inSurveys }) => {
  const shipsContext = useContext(ShipsContext);
  const is_disabled = !editing;

  const currentYear = new Date().getFullYear();

  const nameRef = useRef(null);

  const { isFormValid, validationErrors, existsShip } =
    useShipsValidation(ship);

  /**
   * Handles form submission and updates the ship.
   *
   * @function handleSubmit
   * @param {Event} e - The form submit event
   */
  const handleSubmit = e => {
    e.preventDefault(); // Prevent default form submission
    shipsContext.updateShip(ship.id);
    setEditing(false);
  };

  return (
    <form className="wrapper" onSubmit={handleSubmit}>
      <div className="form__row">
        <span className="field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className={existsShip ? "ship__name invalid" : "ship__name"}
            required
            size={30}
            autoFocus
            ref={nameRef}
            disabled={is_disabled}
            value={ship.name || ""}
            onChange={e => shipsContext.handleChange(e, ship.id)}
          />
        </span>
        {editing && (
          <FloatingError
            message={validationErrors.existsShip}
            show={existsShip}
            inputRef={nameRef}
          />
        )}
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
            disabled={is_disabled}
            value={ship.datras_id || ""}
            onChange={e => shipsContext.handleChange(e, ship.id)}
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
            disabled={is_disabled}
            value={ship.length || ""}
            onChange={e => shipsContext.handleChange(e, ship.id)}
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
            disabled={is_disabled}
            value={ship.beam || ""}
            onChange={e => shipsContext.handleChange(e, ship.id)}
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
            disabled={is_disabled}
            value={ship.main_power || ""}
            onChange={e => shipsContext.handleChange(e, ship.id)}
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
            disabled={is_disabled}
            value={ship.year_built || ""}
            onChange={e => shipsContext.handleChange(e, ship.id)}
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
            disabled={is_disabled}
            value={ship.comment || ""}
            onChange={e => shipsContext.handleChange(e, ship.id)}
          ></textarea>
        </span>
      </div>
      <div className="form__row">
        <ShipButtonBar
          ship_id={ship.id}
          editing={editing}
          setEditing={setEditing}
          inSurveys={inSurveys}
          isFormValid={isFormValid}
        />
      </div>
    </form>
  );
};

export default ViewEditShipForm;
