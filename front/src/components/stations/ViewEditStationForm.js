import React, { useContext } from "react";

import StationsContext from "../../contexts/StationsContext";

import StationButtonBar from "./StationButtonBar";

const ViewEditStationForm = ({ station, handleEdit, edit }) => {
  const is_disabled = edit === true ? false : true;

  const stationsContext = useContext(StationsContext);

  const handleSubmit = e => {
    stationsContext.updateStation(e, station.id);
    handleEdit(false);
  };

  const renderedStation = (
    <form className="form__row" onSubmit={e => handleSubmit(e)}>
      <div className="form__cell">
        <label htmlFor="station">Station:</label>
        <input
          id="station"
          name="station"
          autoFocus
          type="number"
          min="0"
          max="9999"
          maxLength="4"
          size={4}
          disabled={is_disabled}
          className="station_number"
          value={station.station || ""}
          onChange={e => {
            stationsContext.handleChangeStation(e, station.id);
            stationsContext.validateStationNumber(e);
          }}
        />
      </div>
      <div className="form__cell">
        <label htmlFor="comment">Comment:</label>
        <textarea
          type="text"
          disabled={is_disabled}
          id="comment"
          name="comment"
          rows={1}
          size={1000}
          value={station.comment || ""}
          onChange={e => stationsContext.handleChangeStation(e, station.id)}
        />
      </div>

      <div className="form__cell form__cell--right">
        <StationButtonBar
          stationId={station.id}
          handleEdit={handleEdit}
          edit={edit}
        />
      </div>
    </form>
  );

  return renderedStation;
};

export default ViewEditStationForm;
