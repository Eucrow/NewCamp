import React, { Fragment } from "react";

const HydrographyFormView = ({
  hydrography,
  hidro_latitude,
  hidro_longitude,
}) => {
  /**
   * Component of hydrography form of haul.
   * @param {object} haul
   */

  const renderContent = () => {
    return (
      // <fieldset className="wrapper">
      // 	<legend>Hydrography characteristics</legend>
      <Fragment>
        <h4>Meteorology</h4>
        <div className="form__row">
          <label className="field">
            Date time:
            <input
              type="datetime-local"
              disabled
              name="date_time"
              id="date_time"
              value={hydrography.date_time || ""}
            />
          </label>

          <div className="field">
            Latitude:
            <input
              type="number"
              disabled
              className="coordinates"
              name="latitude_degrees"
              id="latitude_degrees"
              min={-90}
              max={90}
              value={hidro_latitude["degrees"] || ""}
              aria-label="Degrees latitude"
            />
            º{" "}
            <input
              type="number"
              disabled
              className="coordinates"
              name="latitude_minutes"
              id="latitude_minutes"
              min={0}
              max={60}
              step={0.001}
              pattern="[0-9]+(\,[0-9]{3})?"
              value={hidro_latitude["minutes"] || ""}
              aria-label="Minutes latitude"
            />
            '
          </div>

          <div className="field">
            Longitude:
            <input
              type="number"
              disabled
              className="coordinates"
              name="longitude_degrees"
              id="longitude_degrees"
              min={-90}
              max={90}
              value={hidro_longitude["degrees"] || ""}
              aria-label="Degrees longitude"
            />
            º{" "}
            <input
              type="number"
              disabled
              className="coordinates"
              name="longitude_minutes"
              id="longitude_minutes"
              min={0}
              max={60}
              step={0.001}
              pattern="[0-9]+(\,[0-9]{3})?"
              value={hidro_longitude["minutes"] || ""}
              aria-label="Minutes longitude"
            />
            '
          </div>
          <div className="form__row">
            <label className="field">
              Depth probe (m):
              <input
                type="text"
                disabled
                id="depth_probe"
                name="depth_probe"
                min={0}
                max={9999}
                maxLength={4}
                size={4}
                value={hydrography.depth_probe || ""}
              />
            </label>
            <label className="field">
              Cable (m):
              <input
                type="text"
                disabled
                id="cable"
                name="cable"
                min={0}
                max={9999}
                maxLength={4}
                size={4}
                value={hydrography.cable || ""}
              />
            </label>
            <label className="field">
              Depth (m):
              <input
                type="text"
                disabled
                id="depth"
                name="depth"
                min={0}
                max={9999}
                maxLength={4}
                size={4}
                value={hydrography.depth || ""}
              />
            </label>
          </div>
        </div>

        <div className="characteristicsGrid characteristicsGrid--hydrography form__row">
          {/* first row */}
          <div></div>
          <div className="characteristicsGrid__colName" aria-hidden="true">
            temperature (ºC)
          </div>
          <div className="characteristicsGrid__colName" aria-hidden="true">
            salinity (&permil;)
          </div>
          <div className="characteristicsGrid__colName" aria-hidden="true">
            density (&sigma;t)
          </div>
          {/* <div></div> */}

          {/* second row */}
          <div className="characteristicsGrid__rowName" aria-hidden="true">
            0 m.
          </div>
          <div className="characteristicsGrid__field">
            <input
              type="number"
              disabled
              id="temperature_0"
              name="temperature_0"
              min={0}
              max={99.999}
              maxLength={6}
              size={6}
              step={0.001}
              value={hydrography.temperature_0 || ""}
              aria-label="ºC temperature at 0 m."
            />
          </div>
          <div className="characteristicsGrid__field">
            <input
              type="number"
              disabled
              id="salinity_0"
              name="salinity_0"
              min={0}
              max={99.999}
              maxLength={6}
              size={6}
              step={0.001}
              value={hydrography.salinity_0 || ""}
              aria-label="??? salinity at 0 m."
            />
          </div>
          <div className="characteristicsGrid__field">
            <input
              type="number"
              disabled
              id="sigma_0"
              name="sigma_0"
              min={0}
              max={99.999}
              maxLength={6}
              size={6}
              step={0.001}
              value={hydrography.sigma_0 || ""}
              aria-label="??? sigma at 0 m."
            />
          </div>

          {/*third row*/}
          <div className="characteristicsGrid__rowName" aria-hidden="true">
            50 m.
          </div>
          <div className="characteristicsGrid__field">
            <input
              type="number"
              disabled
              id="temperature_50"
              name="temperature_50"
              min={0}
              max={99.999}
              maxLength={6}
              size={6}
              step={0.001}
              value={hydrography.temperature_50 || ""}
              aria-label="ºC temperature at 50 m."
            />
          </div>
          <div className="characteristicsGrid__field">
            <input
              type="number"
              disabled
              id="salinity_50"
              name="salinity_50"
              min={0}
              max={99.999}
              maxLength={6}
              size={6}
              step={0.001}
              value={hydrography.salinity_50 || ""}
              aria-label="??? salinity at 50 m."
            />
          </div>
          <div className="characteristicsGrid__field">
            <input
              type="number"
              disabled
              id="sigma_50"
              name="sigma_50"
              min={0}
              max={99.999}
              maxLength={6}
              size={6}
              step={0.001}
              value={hydrography.sigma_50 || ""}
              aria-label="??? sigma at 50 m."
            />
          </div>

          {/*fourth row*/}
          <div className="characteristicsGrid__rowName" aria-hidden="true">
            100 m.
          </div>
          <div className="characteristicsGrid__field">
            <input
              type="number"
              disabled
              id="temperature_100"
              name="temperature_100"
              min={0}
              max={99.999}
              maxLength={6}
              size={6}
              step={0.001}
              value={hydrography.temperature_100 || ""}
              aria-label="ºC temperature at 100 m."
            />
          </div>
          <div className="characteristicsGrid__field">
            <input
              type="number"
              disabled
              id="salinity_100"
              name="salinity_100"
              min={0}
              max={99.999}
              maxLength={6}
              size={6}
              step={0.001}
              value={hydrography.salinity_100 || ""}
              aria-label="??? salinity at 100 m."
            />
          </div>
          <div className="characteristicsGrid__field">
            <input
              type="number"
              disabled
              id="sigma_100"
              name="sigma_100"
              min={0}
              max={99.999}
              maxLength={6}
              size={6}
              step={0.001}
              value={hydrography.sigma_100 || ""}
              aria-label="??? sigma at 100 m."
            />
          </div>

          {/*fifth row*/}
          <div className="characteristicsGrid__rowName" aria-hidden="true">
            Bottom
          </div>
          <div className="characteristicsGrid__field">
            <input
              type="number"
              disabled
              id="temperature"
              name="temperature"
              min={0}
              max={99.999}
              maxLength={6}
              size={6}
              step={0.001}
              value={hydrography.temperature || ""}
              aria-label="ºC temperature at bottom depth."
            />
          </div>
          <div className="characteristicsGrid__field">
            <input
              type="number"
              disabled
              id="salinity"
              name="salinity"
              min={0}
              max={99.999}
              maxLength={6}
              size={6}
              step={0.001}
              value={hydrography.salinity || ""}
            />
          </div>
          <div className="characteristicsGrid__field">
            <input
              type="number"
              disabled
              id="sigma"
              name="sigma"
              min={0}
              max={99.999}
              maxLength={6}
              size={6}
              step={0.001}
              value={hydrography.sigma || ""}
            />
          </div>
        </div>
        <div className="form__row">
          <label className="field__comment">
            Comment:
            <textarea
              disabled
              id="comment"
              name="comment"
              value={hydrography.comment || ""}
            />
          </label>
        </div>
      </Fragment>
      // </fieldset>
    );
  };

  return renderContent();
};

export default HydrographyFormView;
