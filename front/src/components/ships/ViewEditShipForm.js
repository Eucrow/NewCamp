import React, { useContext } from "react";

import ShipsContext from "../../contexts/ShipsContext";

import { preventNegativeE } from "../../utils/dataUtils";

import ShipButtonBar from "./ShipButtonBar";

/**
 * ViewEditShipForm component
 * @param {object} props ship object.
 * @param {boolean} editing true if the element is available to editing.
 * @param {method} setEditing method to change the editing variable in state.
 */
const ViewEditShipForm = ({ ship, editing, setEditing, inSurveys }) => {
  const shipsContext = useContext(ShipsContext);
  const is_disabled = editing === true ? false : true;

  const currentYear = new Date().getFullYear();

  const handleSubmit = e => {
    shipsContext.updateShip(e, ship.id);
    setEditing(false);
  };

  const content = (
    <form className="wrapper" onSubmit={handleSubmit}>
      <div className="form__row">
        <span className="field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="survey_description"
            required
            size={30}
            autoFocus
            disabled={is_disabled}
            value={ship.name || ""}
            onChange={e => shipsContext.handleChange(e, ship.id)}
          />
        </span>
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
            max={9999}
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
        />
      </div>
    </form>
  );

  return content;
};

export default ViewEditShipForm;
