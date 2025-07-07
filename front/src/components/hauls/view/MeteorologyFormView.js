import React, { Fragment } from "react";

const MeteorologyFormView = ({ meteorology }) => {
  /**
   * Component of meteorology form of haul.
   * @param {object} haul
   */

  const renderContent = () => {
    return (
      // <fieldset className="wrapper form__row">
      // 	<legend>Meteorology:</legend>
      <Fragment>
        <h4>Meteorology</h4>
        <div className="form__row">
          <div className="form__cell">
            <label htmlFor="wind_direction">Wind direction (degrees):</label>
            <input
              type="number"
              name="wind_direction"
              id="wind_direction"
              disabled
              min={0}
              max={360}
              maxLength={3}
              size={3}
              value={meteorology.wind_direction || ""}
            />
          </div>
          <div className="form__cell">
            <label htmlFor="wind_velocity">Wind velocity (knots):</label>
            <input
              type="number"
              name="wind_velocity"
              id="wind_velocity"
              disabled
              min={0}
              max={99}
              step={0.1}
              maxLength={3}
              size={3}
              value={meteorology.wind_velocity || ""}
            />
          </div>
          <div className="form__cell">
            <label htmlFor="sea_state">Sea state (Douglas scale):</label>
            <input
              type="number"
              name="sea_state"
              id="sea_state"
              disabled
              min={0}
              max={9}
              maxLength={1}
              size={1}
              value={meteorology.sea_state || ""}
            />
          </div>
        </div>
      </Fragment>
      // </fieldset>
    );
  };

  return renderContent();
};

export default MeteorologyFormView;
