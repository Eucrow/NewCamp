import React from "react";

import { convertDecimalToDMCoordinate } from "../../../utils/Coordinates";

const TrawlSamplingPointView = ({
  nameSamplingPoint,
  typeSamplingPoint,
  dateTime,
  latitude,
  longitude,
  depth,
}) => {
  const [degrees_latitude, minutes_latitude] =
    convertDecimalToDMCoordinate(latitude);
  const [degrees_longitude, minutes_longitude] =
    convertDecimalToDMCoordinate(longitude);

  const renderCoordinates = (degrees, minutes, operation, coordinateType) => {
    const nameDegrees = `${operation}_${coordinateType}_degrees`;
    const nameMinutes = `${operation}_${coordinateType}_minutes`;
    const ariaLabelDegrees = `Degrees ${operation} ${coordinateType}`;
    const ariaLabelMinutes = `Minutes ${operation} ${coordinateType}`;
    return (
      <div className="characteristicsGrid__field">
        <input
          type="number"
          className="coordinates"
          disabled
          name={nameDegrees}
          id={nameDegrees}
          min={-90}
          max={90}
          defaultValue={degrees || ""}
          aria-label={ariaLabelDegrees}
        />
        º{" "}
        <input
          type="number"
          className="coordinates"
          disabled
          name={nameMinutes}
          id={nameMinutes}
          min={0}
          max={60}
          step={0.001}
          pattern="[0-9]+(\,[0-9]{3})?"
          defaultValue={minutes || ""}
          aria-label={ariaLabelMinutes}
        />
        '
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="characteristicsGrid characteristicsGrid--trawl form__row">
        <div className="characteristicsGrid__rowName" aria-hidden="true">
          {nameSamplingPoint}:
        </div>
        <div className="characteristicsGrid__field">
          <input
            disabled
            type="datetime-local"
            name={typeSamplingPoint + "_date_time"}
            id={typeSamplingPoint + "_date_time"}
            defaultValue={dateTime}
            aria-label={typeSamplingPoint + " date and time"}
          />
        </div>
        <div className="characteristicsGrid__field">
          {renderCoordinates(
            degrees_latitude,
            minutes_latitude,
            "shooting",
            "latitude"
          )}
        </div>
        <div className="characteristicsGrid__field">
          {renderCoordinates(
            degrees_longitude,
            minutes_longitude,
            "shooting",
            "latitude"
          )}
        </div>
        <div className="characteristicsGrid__field">
          <input
            disabled
            type="number"
            name="shooting_depth"
            id="shooting_depth"
            min={0}
            max={9999}
            maxLength={4}
            size={4}
            step={1}
            value={depth || ""}
            aria-label="Shooting depth"
          />
        </div>
      </div>
    );
  };

  return renderContent();
};

export default TrawlSamplingPointView;
