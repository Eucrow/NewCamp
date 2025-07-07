import React, { Fragment } from "react";

import TrawlSamplingPointEdit from "./TrawlSamplingPointEdit";

const TrawlFormEdit = ({
  trawl,
  shootingLatitude,
  shootingLongitude,
  bottomLatitude,
  bottomLongitude,
  trawlingLatitude,
  trawlingLongitude,
  haulingLatitude,
  haulingLongitude,
  takeOffLatitude,
  takeOffLongitude,
  onBoardLatitude,
  onBoardLongitude,
  handleChangeTrawl,
  handleCoordinatesChange,
}) => {
  /**
   * Component of trawl form of haul.
   * @param {object} trawl
   * @param {function} handleChangeTrawl
   */

  const renderContent = () => {
    const shooting_date_time = trawl.shooting_date_time;

    const bottom_date_time = trawl.bottom_date_time;

    const trawling_date_time = trawl.trawling_date_time;

    const hauling_date_time = trawl.hauling_date_time;

    const take_off_date_time = trawl.take_off_date_time;

    const on_board_date_time = trawl.on_board_date_time;

    return (
      // <fieldset className="wrapper">
      // 	<legend>Trawl characteristics:</legend>
      <Fragment>
        <h4>Trawl characteristics</h4>
        <div className="characteristicsGrid characteristicsGrid--trawl form__row">
          {/* first row */}
          <div></div>
          <div className="characteristicsGrid__colName" aria-hidden="true">
            Date/time:
          </div>
          <div className="characteristicsGrid__colName" aria-hidden="true">
            Latitude:
          </div>
          <div className="characteristicsGrid__colName" aria-hidden="true">
            Longitude:
          </div>
          <div className="characteristicsGrid__colName" aria-hidden="true">
            Depth (m):
          </div>
        </div>
        <TrawlSamplingPointEdit
          handleChangeTrawl={handleChangeTrawl}
          handleCoordinatesChange={handleCoordinatesChange}
          nameSamplingPoint={"Shooting"}
          typeSamplingPoint={"shooting"}
          dateTime={shooting_date_time}
          latitude={shootingLatitude}
          longitude={shootingLongitude}
          depth={trawl.shooting_depth}
          autofocus={true}
        />
        <TrawlSamplingPointEdit
          handleChangeTrawl={handleChangeTrawl}
          handleCoordinatesChange={handleCoordinatesChange}
          nameSamplingPoint={"Bottom"}
          typeSamplingPoint={"bottom"}
          dateTime={bottom_date_time}
          latitude={bottomLatitude}
          longitude={bottomLongitude}
          depth={trawl.bottom_depth}
        />

        <TrawlSamplingPointEdit
          handleChangeTrawl={handleChangeTrawl}
          handleCoordinatesChange={handleCoordinatesChange}
          nameSamplingPoint={"Trawling"}
          typeSamplingPoint={"trawling"}
          dateTime={trawling_date_time}
          latitude={trawlingLatitude}
          longitude={trawlingLongitude}
          depth={trawl.trawling_depth}
        />
        <TrawlSamplingPointEdit
          handleChangeTrawl={handleChangeTrawl}
          handleCoordinatesChange={handleCoordinatesChange}
          nameSamplingPoint={"Hauling"}
          typeSamplingPoint={"hauling"}
          dateTime={hauling_date_time}
          latitude={haulingLatitude}
          longitude={haulingLongitude}
          depth={trawl.hauling_depth}
        />
        <TrawlSamplingPointEdit
          handleChangeTrawl={handleChangeTrawl}
          handleCoordinatesChange={handleCoordinatesChange}
          nameSamplingPoint={"Take off"}
          typeSamplingPoint={"take_off"}
          dateTime={take_off_date_time}
          latitude={takeOffLatitude}
          longitude={takeOffLongitude}
          depth={trawl.take_off_depth}
        />
        <TrawlSamplingPointEdit
          handleChangeTrawl={handleChangeTrawl}
          handleCoordinatesChange={handleCoordinatesChange}
          nameSamplingPoint={"On board"}
          typeSamplingPoint={"on_board"}
          dateTime={on_board_date_time}
          latitude={onBoardLatitude}
          longitude={onBoardLongitude}
          depth={trawl.on_board_depth}
        />

        <div className="form__row">
          <label className="field">
            Course (degrees):
            <input
              type="number"
              name="course"
              id="course"
              min={0}
              max={360}
              maxLength={3}
              size={3}
              step={1}
              value={trawl.course || ""}
              onChange={e => {
                handleChangeTrawl(e);
              }}
            />
          </label>
          <label className="field">
            Velocity (m/s):
            <input
              type="number"
              name="velocity"
              id="velocity"
              min={0}
              max={99}
              maxLength={4}
              size={4}
              step={0.1}
              value={trawl.velocity || ""}
              onChange={e => {
                handleChangeTrawl(e);
              }}
            />
          </label>
          <label className="field">
            Cable (m):
            <input
              type="number"
              name="cable"
              id="cable"
              min={0}
              max={9999}
              maxLength={4}
              size={4}
              step={1}
              value={trawl.cable || ""}
              onChange={e => {
                handleChangeTrawl(e);
              }}
            />
          </label>
          <label className="field">
            Sweep (m):
            <input
              type="number"
              name="sweep"
              id="sweep"
              min={0}
              max={999}
              maxLength={3}
              size={3}
              step={1}
              value={trawl.sweep || ""}
              onChange={e => {
                handleChangeTrawl(e);
              }}
            />
          </label>
        </div>
        <div className="form__row">
          <label className="field">
            Otter Boards Distance (m):
            <input
              type="number"
              name="otter_boards_distance"
              id="otter_boards_distance"
              min={0}
              max={999}
              maxLength={4}
              size={4}
              step={0.1}
              value={trawl.otter_boards_distance || ""}
              onChange={e => {
                handleChangeTrawl(e);
              }}
            />
          </label>
          <label className="field">
            Horizontal Aperture (m):
            <input
              type="number"
              name="horizontal_aperture"
              id="horizontal_aperture"
              min={0}
              max={99}
              maxLength={4}
              size={4}
              step={0.1}
              value={trawl.horizontal_aperture || ""}
              onChange={e => {
                handleChangeTrawl(e);
              }}
            />
          </label>
          <label className="field">
            Vertical Aperture (m):
            <input
              type="number"
              name="vertical_aperture"
              id="vertical_aperture"
              min={0}
              max={99}
              maxLength={4}
              size={4}
              step={0.1}
              value={trawl.vertical_aperture || ""}
              onChange={e => {
                handleChangeTrawl(e);
              }}
            />
          </label>
        </div>
        <div className="form__row">
          <label className="field">
            Sampling rectangle:
            <input
              type="number"
              name="sampling_rectangle"
              id="sampling_rectangle"
              min={0}
              max={99}
              maxLength={2}
              size={2}
              step={1}
              value={trawl.sampling_rectangle || ""}
              onChange={e => {
                handleChangeTrawl(e);
              }}
            />
          </label>
          <label className="field">
            Track (m):
            <input
              type="number"
              name="track"
              id="track"
              min={0}
              max={9999}
              maxLength={4}
              size={4}
              step={1}
              value={trawl.track || ""}
              onChange={e => {
                handleChangeTrawl(e);
              }}
            />
          </label>
        </div>
        <div className="form__row">
          <label className="field__comment">
            Comment:
            <textarea
              name="comment"
              id="comment"
              value={trawl.comment || ""}
              onChange={e => {
                handleChangeTrawl(e);
              }}
            />
          </label>
        </div>
      </Fragment>
      //</fieldset>
    );
  };

  return renderContent();
};

export default TrawlFormEdit;
