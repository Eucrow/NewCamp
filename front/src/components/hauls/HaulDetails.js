import React, { useState, useEffect, useMemo } from "react";

import {
  convertDMToDecimalCoordinate,
  convertDDMToDMCoordinates,
  convertTrawlCoordinates,
  convertHydrographyCoordinates,
} from "../../utils/Coordinates";
import { cleanEmptyValues } from "../../utils/dataUtils";
import { haulService } from "../../services/haulService";

import { useBackupState } from "../../hooks/useBackupState";

import MeteorologyFormView from "./view/MeteorologyFormView";
import TrawlFormView from "./view/TrawlFormView";
import HydrographyFormView from "./view/HydrographyFormView";
import MeteorologyFormEdit from "./edit/MeteorologyFormEdit";
import TrawlFormEdit from "./edit/TrawlFormEdit";
import HydrographyFormEdit from "./edit/HydrographyFormEdit";

import UiButtonSave from "../ui/UiButtonSave";

import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

/**
 * HaulDetails Component
 *
 * A comprehensive component for displaying and editing haul data with support for different sampler types.
 * Handles trawl data (sampler_id: 1) and hydrography data (sampler_id: 2) with their respective
 * meteorological information and coordinate systems.
 *
 * Key Features:
 * - View/Edit modes with backup/restore functionality
 * - Coordinate conversion between decimal and degree-minute formats
 * - Form validation and data cleaning
 * - Async data fetching and updates
 * - Different UI layouts based on sampler type
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Object} props.haul - The haul object containing basic haul information
 * @param {string} props.haul.id - Unique identifier for the haul
 * @param {number} props.haul.sampler_id - Sampler type: 1 for trawl, 2 for hydrography
 * @param {boolean} props.detail - Controls visibility of haul details
 * @param {Function} props.setDetail - Callback to toggle detail visibility
 *
 * @example
 * // Basic usage
 * <HaulDetails
 *   haul={{ id: "123", sampler_id: 1 }}
 *   detail={true}
 *   setDetail={setShowDetail}
 * />
 *
 * @example
 * // For hydrography data
 * <HaulDetails
 *   haul={{ id: "456", sampler_id: 2 }}
 *   detail={isDetailVisible}
 *   setDetail={handleDetailToggle}
 * />
 */
const HaulDetails = ({ haul, detail, setDetail }) => {
  // State management with backup functionality for form data
  // Each section (meteorology, hydrography, trawl, coordinates) has its own backup state
  // This allows users to cancel changes and restore original values
  const meteorologyState = useBackupState({});
  const hydrographyState = useBackupState({});
  const trawlState = useBackupState({});

  // Coordinates state manages degree-minute format for all operation types
  const coordinatesState = useBackupState({
    shooting: {
      latitude: { degrees: 0, minutes: 0 },
      longitude: { degrees: 0, minutes: 0 },
    },
    bottom: {
      latitude: { degrees: 0, minutes: 0 },
      longitude: { degrees: 0, minutes: 0 },
    },
    trawling: {
      latitude: { degrees: 0, minutes: 0 },
      longitude: { degrees: 0, minutes: 0 },
    },
    hauling: {
      latitude: { degrees: 0, minutes: 0 },
      longitude: { degrees: 0, minutes: 0 },
    },
    takeOff: {
      latitude: { degrees: 0, minutes: 0 },
      longitude: { degrees: 0, minutes: 0 },
    },
    onBoard: {
      latitude: { degrees: 0, minutes: 0 },
      longitude: { degrees: 0, minutes: 0 },
    },
    hydro: {
      latitude: { degrees: 0, minutes: 0 },
      longitude: { degrees: 0, minutes: 0 },
    },
  });

  // Destructure backup state management functions for cleaner code
  const {
    value: meteorology,
    setValue: setMeteorology,
    restoreFromBackup: restoreMeteorology,
    createBackup: createMeteorologyBackup,
  } = meteorologyState;
  const {
    value: hydrography,
    setValue: setHydrography,
    restoreFromBackup: restoreHydrography,
    createBackup: createHydrographyBackup,
  } = hydrographyState;
  const {
    value: trawl,
    setValue: setTrawl,
    restoreFromBackup: restoreTrawl,
    createBackup: createTrawlBackup,
  } = trawlState;
  const {
    value: coordinates,
    setValue: setCoordinates,
    restoreFromBackup: restoreCoordinates,
    createBackup: createCoordinatesBackup,
  } = coordinatesState;

  // Edit mode toggle - controls whether forms are in view or edit mode
  const [edit, setEdit] = useState(false);

  const [, setFetchError] = useState("");

  // Memoized coordinate conversions to avoid unnecessary recalculations
  // Converts trawl data to coordinate format when trawl data changes
  const trawlCoordinates = useMemo(() => {
    return Object.keys(trawl).length > 0
      ? convertTrawlCoordinates(trawl)
      : null;
  }, [trawl]);

  // Converts hydrography data to coordinate format when hydrography data changes
  const hydrographyCoordinates = useMemo(() => {
    return Object.keys(hydrography).length > 0
      ? convertHydrographyCoordinates(hydrography)
      : null;
  }, [hydrography]);

  // Effect to sync coordinate state when converted coordinates change
  // This ensures the coordinate forms display the latest converted values
  useEffect(() => {
    // Convert and set coordinates when trawl or hydrography data changes
    if (trawlCoordinates || hydrographyCoordinates) {
      setCoordinates(prev => ({
        ...prev,
        ...(trawlCoordinates || {}),
        ...(hydrographyCoordinates ? { hydro: hydrographyCoordinates } : {}),
      }));
    }
  }, [trawlCoordinates, hydrographyCoordinates]);

  /**
   * Handles meteorology form field changes
   * @param {Event} e - Input change event
   */
  const handleChangeMeteorology = e => {
    var name = e.target.name;
    var value = e.target.value;
    setMeteorology(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handles trawl form field changes and logs current state
   * @param {Event} e - Input change event
   */
  const handleChangeTrawl = e => {
    var name = e.target.name;
    var value = e.target.value;
    setTrawl(prev => ({
      ...prev,
      [name]: value,
    }));
    console.log("trawl: ", trawl);
  };

  /**
   * Handles hydrography form field changes
   * @param {Event} e - Input change event
   */
  const handleChangeHydrography = e => {
    var name = e.target.name;
    var value = e.target.value;
    setHydrography(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Converts coordinate input values to decimal format for trawl operations
   * @param {string} operationType - Type of operation (shooting, bottom, trawling, etc.)
   * @param {string} coord - Coordinate type (latitude/longitude)
   * @param {string|number} value - Input value to convert
   * @param {string} unit - Unit type (degrees/minutes)
   * @returns {number|null} Converted decimal coordinate or null if invalid
   */
  const convertCoordinateToTrawlCoordinate = (
    operationType,
    coord,
    value,
    unit
  ) => {
    if (unit === "degrees") {
      const decimalCoordinate = convertDMToDecimalCoordinate(
        value,
        coordinates[operationType][coord].minutes
      );
      return decimalCoordinate;
    } else if (unit === "minutes") {
      const decimalCoordinate = convertDMToDecimalCoordinate(
        coordinates[operationType][coord].degrees,
        value
      );
      return decimalCoordinate;
    }
    return null;
  };

  /**
   * Handles coordinate input changes and updates both coordinate and trawl states
   * Parses input name to extract operation type, coordinate, and unit information
   * @param {Event} e - Input change event with name format: "operation_coord_unit"
   */
  const handleCoordinatesChange = e => {
    const { name, value } = e.target;
    const [operation, coord, unit] = name.split("_");

    // Map input operation names to internal state property names
    const operationMap = {
      shooting: "shooting",
      bottom: "bottom",
      trawling: "trawling",
      hauling: "hauling",
      take: "takeOff", // for take_off
      on: "onBoard", // for on_board
      hidro: "hydro",
    };

    const operationType = operationMap[operation] || operation;

    // Update coordinate state with new value
    setCoordinates(prev => ({
      ...prev,
      [operationType]: {
        ...prev[operationType],
        [coord]: {
          ...prev[operationType][coord],
          [unit]: value,
        },
      },
    }));

    // Update trawl state with converted decimal coordinate
    setTrawl(prev => ({
      ...prev,
      [operationType + "_" + coord]: convertCoordinateToTrawlCoordinate(
        operationType,
        coord,
        value,
        unit
      ),
    }));
  };

  /**
   * Converts all coordinates from degree-minute format to decimal format for API submission
   * @returns {Object} Object containing all converted coordinates with API-friendly field names
   */
  const updateCoordinates = () => {
    const convertedCoordinates = {};

    // Convert trawl coordinates
    const trawlFields = [
      "shooting",
      "bottom",
      "trawling",
      "hauling",
      "takeOff",
      "onBoard",
    ];
    trawlFields.forEach(field => {
      const apiField =
        field === "takeOff"
          ? "take_off"
          : field === "onBoard"
            ? "on_board"
            : field;
      convertedCoordinates[`${apiField}_latitude`] = convertDDMToDMCoordinates(
        coordinates[field].latitude
      );
      convertedCoordinates[`${apiField}_longitude`] = convertDDMToDMCoordinates(
        coordinates[field].longitude
      );
    });

    // Convert hydrography coordinates
    convertedCoordinates.hidro_latitude = convertDDMToDMCoordinates(
      coordinates.hydro.latitude
    );
    convertedCoordinates.hidro_longitude = convertDDMToDMCoordinates(
      coordinates.hydro.longitude
    );

    return convertedCoordinates;
  };

  /**
   * Handles form submission for updating haul data
   * Processes different data types based on sampler_id and updates via API
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async e => {
    e.preventDefault();

    // Handle trawl data submission (sampler_id: 1)
    if (haul.sampler_id === 1) {
      // create a deepcopy of the trawl object
      const trawlCopy = JSON.parse(JSON.stringify(trawl));

      const newCoordinates = updateCoordinates();

      // Update coordinate fields in trawl copy
      Object.keys(newCoordinates).forEach(key => {
        if (key.includes("latitude") || key.includes("longitude")) {
          trawlCopy[key] = newCoordinates[key];
        }
      });

      const cleanedTrawl = cleanEmptyValues(trawlCopy);

      setTrawl(cleanedTrawl);

      await haulService.updateTrawl(trawlCopy, haul.id);

      setEdit(false);
    }

    // Handle hydrography data submission (sampler_id: 2)
    if (haul.sampler_id === 2) {
      // create a deepcopy of the hydrography object
      const hydrographyCopy = JSON.parse(JSON.stringify(hydrography));

      const newCoordinates = updateCoordinates();

      hydrographyCopy["latitude"] = newCoordinates["hidro_latitude"];
      hydrographyCopy["longitude"] = newCoordinates["hidro_longitude"];

      const cleanedHydrography = cleanEmptyValues(hydrographyCopy);

      setTrawl(cleanedHydrography);

      await haulService.updateHydrography(hydrographyCopy, haul.id);

      setEdit(false);
    }

    // Update meteorology data for both sampler types
    await haulService.updateMeteorology(meteorology, haul.id);
    setEdit(false);
  };

  /**
   * Handles cancel action by restoring all data from backups and exiting edit mode
   * @param {boolean} status - New edit status (should be false for cancel)
   */
  const handleCancel = status => {
    restoreMeteorology();
    restoreTrawl();
    restoreHydrography();
    restoreCoordinates();
    setEdit(status);
  };

  /**
   * Effect hook for fetching haul data when detail view is activated
   * Fetches different data sets based on sampler_id:
   * - sampler_id 1: meteorology + trawl data
   * - sampler_id 2: meteorology + hydrography data
   * Creates backups of fetched data for cancel functionality
   */
  useEffect(() => {
    const haulData = async () => {
      if (detail === true) {
        try {
          // Fetch trawl-specific data
          if (haul.sampler_id === 1) {
            const [meteorologyData, trawlData] = await Promise.all([
              haulService.getMeteorologyByHaulId(haul.id),
              haulService.getTrawlByHaulId(haul.id),
            ]);

            setMeteorology(meteorologyData);
            setTrawl(trawlData);

            createMeteorologyBackup(meteorologyData);
            createTrawlBackup(trawlData);
          }

          // Fetch hydrography-specific data
          if (haul.sampler_id === 2) {
            const [meteorologyData, hydrographyData] = await Promise.all([
              haulService.getMeteorologyByHaulId(haul.id),
              haulService.getHydrographyByHaulId(haul.id),
            ]);

            setMeteorology(meteorologyData);
            setHydrography(hydrographyData);

            createMeteorologyBackup(meteorologyData);
            createHydrographyBackup(hydrographyData);
          }
        } catch (error) {
          console.error("Error fetching haul data:", error);
          setFetchError(error.message);
        }
      }
    };

    // Actually call the async function
    haulData();
  }, [detail, haul.sampler_id, haul.id]);

  /**
   * Renders the appropriate content based on sampler type and edit mode
   * @returns {JSX.Element|null} Rendered form component or null
   */
  const renderContent = () => {
    // Trawl sampler (sampler_id: 1) - handles trawl and meteorology data
    if (Number(haul.sampler_id) === 1) {
      // View mode - displays read-only trawl and meteorology forms
      if (edit === false) {
        return (
          <form className="form--wide" disabled>
            <div className="form__row">
              <TrawlFormView trawl={trawl} />
            </div>
            <div className="form__row">
              <MeteorologyFormView meteorology={meteorology} />
            </div>
            <div className="form__row">
              <div className="form__cell form__cell--right">
                <div className="buttonsWrapper">
                  <UiButtonStatusHandle
                    buttonText={"Hide Haul Detail"}
                    handleMethod={setDetail}
                    newStatus={false}
                  >
                    {/* <UiIconDetailHide /> */}
                  </UiButtonStatusHandle>
                  <UiButtonStatusHandle
                    buttonText={"Edit Haul Detail"}
                    handleMethod={setEdit}
                    newStatus={true}
                  >
                    {/* <UiIconEdit /> */}
                  </UiButtonStatusHandle>
                </div>
              </div>
            </div>
          </form>
        );
      }

      // Edit mode - displays editable trawl and meteorology forms with coordinate inputs
      if (edit === true) {
        return (
          <form
            className="form--wide"
            onSubmit={e => {
              handleSubmit(e);
              setEdit(false);
            }}
          >
            <div className="form__row">
              <TrawlFormEdit
                trawl={trawl}
                shootingLatitude={coordinates.shooting.latitude}
                shootingLongitude={coordinates.shooting.longitude}
                bottomLatitude={coordinates.bottom.latitude}
                bottomLongitude={coordinates.bottom.longitude}
                trawlingLatitude={coordinates.trawling.latitude}
                trawlingLongitude={coordinates.trawling.longitude}
                haulingLatitude={coordinates.hauling.latitude}
                haulingLongitude={coordinates.hauling.longitude}
                takeOffLatitude={coordinates.takeOff.latitude}
                takeOffLongitude={coordinates.takeOff.longitude}
                onBoardLatitude={coordinates.onBoard.latitude}
                onBoardLongitude={coordinates.onBoard.longitude}
                handleChangeTrawl={handleChangeTrawl}
                handleCoordinatesChange={handleCoordinatesChange}
              />
            </div>
            <div className="form__row">
              <MeteorologyFormEdit
                meteorology={meteorology}
                handleChangeMeteorology={handleChangeMeteorology}
              />
            </div>

            <div className="form__row">
              <div className="form__cell form__cell--right">
                <div className="buttonsWrapper">
                  <UiButtonSave buttonText="Save" />
                  <UiButtonStatusHandle
                    buttonText={"Cancel"}
                    handleMethod={handleCancel}
                    newStatus={false}
                  />
                </div>
              </div>
            </div>
          </form>
        );
      }
    }

    // Hydrography sampler (sampler_id: 2) - handles hydrography data with coordinates
    if (Number(haul.sampler_id) === 2) {
      // View mode - displays read-only hydrography form with coordinates
      if (edit === false) {
        return (
          <form className="form--wide noSpinner" disabled>
            <div className="form__row">
              <HydrographyFormView
                hydrography={hydrography}
                hidro_latitude={coordinates.hydro.latitude}
                hidro_longitude={coordinates.hydro.longitude}
              />
            </div>

            <div className="form__row">
              <div className="form__cell form__cell--right">
                <div className="buttonsWrapper">
                  <UiButtonStatusHandle
                    buttonText={"Hide Detail"}
                    handleMethod={setDetail}
                    newStatus={false}
                  />

                  <UiButtonStatusHandle
                    buttonText={"Edit"}
                    handleMethod={setEdit}
                    newStatus={true}
                  />
                </div>
              </div>
            </div>
          </form>
        );
      }

      // Edit mode - displays editable hydrography form with coordinate inputs
      if (edit === true) {
        return (
          <form
            className="form--wide noSpinner"
            onSubmit={e => {
              handleSubmit(e);
              setEdit(false);
            }}
          >
            <div className="form__row">
              <HydrographyFormEdit
                hydrography={hydrography}
                handleChangeHydrography={handleChangeHydrography}
                hidro_latitude={coordinates.hydro.latitude}
                hidro_longitude={coordinates.hydro.longitude}
                handleCoordinatesChange={handleCoordinatesChange}
              />
            </div>
            <div className="form__row">
              <div className="form__cell form__cell--right">
                <UiButtonSave buttonText="Save Haul" />
                <UiButtonStatusHandle
                  buttonText={"Cancel"}
                  handleMethod={handleCancel}
                  newStatus={false}
                />
              </div>
            </div>
          </form>
        );
      }
    }

    return null;
  };

  return renderContent();
};

export default HaulDetails;
