import React, { useState, useEffect, useMemo } from "react";

import {
  convertDDMToDMCoordinates,
  convertTrawlCoordinates,
  convertHydrographyCoordinates,
} from "../../utils/Coordinates";
import { cleanEmptyValues } from "../../utils/dataUtils";
import { haulService } from "../../services/haulService";

import MeteorologyFormView from "./view/MeteorologyFormView";
import TrawlFormView from "./view/TrawlFormView";
import HydrographyFormView from "./view/HydrographyFormView";
import MeteorologyFormEdit from "./edit/MeteorologyFormEdit";
import TrawlFormEdit from "./edit/TrawlFormEdit";
import HydrographyFormEdit from "./edit/HydrographyFormEdit";

import UiButtonSave from "../ui/UiButtonSave";

import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

const HaulDetails = ({ haul, detail, setDetail }) => {
  /**
   * Component to show the details of a haul. It is possible to edit the haul.
   * When the component is loaded, the data of the haul is fetched from the API, stored in the state and
   * stored in the backup state. This one is used to recovery the original data if the user cancel the changes.
   * @param {object} haul The haul object.
   * @param {boolean} detail Boolean to show the details of the haul.
   * @param {method} setDetail Method to set the boolean detail.
   */

  const [meteorology, setMeteorology] = useState({});
  const [hydrography, setHydrography] = useState({});
  const [trawl, setTrawl] = useState({});

  const [backupMeteorology, setBackupMeteorology] = useState({});
  const [backupHydrography, setBackupHydrography] = useState({});
  const [backupTrawl, setBackupTrawl] = useState({});

  const [edit, setEdit] = useState(false);

  const [, setFetchError] = useState("");

  const [coordinates, setCoordinates] = useState({
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

  const [backupCoordinates, setBackupCoordinates] = useState({
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

  const trawlCoordinates = useMemo(() => {
    return Object.keys(trawl).length > 0
      ? convertTrawlCoordinates(trawl)
      : null;
  }, [trawl]);

  const hydrographyCoordinates = useMemo(() => {
    return Object.keys(hydrography).length > 0
      ? convertHydrographyCoordinates(hydrography)
      : null;
  }, [hydrography]);

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

  useEffect(() => {
    setBackupCoordinates(JSON.parse(JSON.stringify(coordinates)));
  }, [coordinates]);

  const handleChangeMeteorology = e => {
    var name = e.target.name;
    var value = e.target.value;
    setMeteorology(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeTrawl = e => {
    var name = e.target.name;
    var value = e.target.value;
    setTrawl(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeHydrography = e => {
    var name = e.target.name;
    var value = e.target.value;
    setHydrography(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCoordinatesChange = e => {
    const { name, value } = e.target;
    const [type, coord, unit] = name.split("_");

    const typeMap = {
      shooting: "shooting",
      bottom: "bottom",
      trawling: "trawling",
      hauling: "hauling",
      take: "takeOff", // for take_off
      on: "onBoard", // for on_board
      hidro: "hydro",
    };

    const coordType = typeMap[type] || type;

    setCoordinates(prev => ({
      ...prev,
      [coordType]: {
        ...prev[coordType],
        [coord]: {
          ...prev[coordType][coord],
          [unit]: value,
        },
      },
    }));
  };

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

  const handleSubmit = async e => {
    e.preventDefault();

    if (haul.sampler_id === 1) {
      // create a deepcopy of the trawl object
      const trawlCopy = JSON.parse(JSON.stringify(trawl));

      const newCoordinates = updateCoordinates();

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

    await haulService.updateMeteorology(meteorology, haul.id);
    setEdit(false);
  };

  /**
   * Restores the coordinates to their original values.
   * This is used when the user clicks the `Cancel` button.
   * @returns {void}
   */
  const restoreCoordinates = () => {
    setCoordinates(JSON.parse(JSON.stringify(backupCoordinates)));
  };

  /**
   * Manage the cancel button.
   * @param {boolean} status - Whether the user is editing the haul.
   * @returns {void}
   */
  const handleCancel = status => {
    setTrawl(backupTrawl);
    setMeteorology(backupMeteorology);
    setHydrography(backupHydrography);
    restoreCoordinates();
    setEdit(status);
  };

  /**
   * Fetches data from API endpoints when the `detail` state is set to `true`.
   * If the `sampler_id` of the `haul` object is `1`, fetches meteorology and trawl data.
   * If the `sampler_id` of the `haul` object is `2`, fetches hydrography data.
   * Sets the `fetchError`, `meteorology`, `trawl`, and `hydrography` state variables.
   * @param {boolean} detail - Whether to show detailed information about the haul.
   * @param {object} haul - The haul object containing information about the haul.
   * @param {string} haul.id - The ID of the haul.
   * @param {number} haul.sampler_id - The ID of the sampler used for the haul.
   */
  useEffect(() => {
    const haulData = async () => {
      if (detail === true) {
        try {
          if (haul.sampler_id === 1) {
            const [meteorologyData, trawlData] = await Promise.all([
              haulService.getMeteorologyByHaulId(haul.id),
              haulService.getTrawlByHaulId(haul.id),
            ]);

            setMeteorology(meteorologyData);
            setTrawl(trawlData);

            setBackupMeteorology(meteorologyData);
            setBackupTrawl(trawlData);
          }

          if (haul.sampler_id === 2) {
            const [meteorologyData, hydrographyData] = await Promise.all([
              haulService.getMeteorologyByHaulId(haul.id),
              haulService.getHydrographyByHaulId(haul.id),
            ]);

            setMeteorology(meteorologyData);
            setHydrography(hydrographyData);

            setBackupMeteorology(meteorologyData);
            setBackupHydrography(hydrographyData);
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

  const renderContent = () => {
    if (Number(haul.sampler_id) === 1) {
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

    if (Number(haul.sampler_id) === 2) {
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
