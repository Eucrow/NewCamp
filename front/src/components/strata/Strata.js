import React, { useEffect, useState, Fragment } from "react";
import Stratum from "./Stratum";
import StrataButtonBar from "./StrataButtonBar";
import { API_CONFIG, buildApiUrl } from "../../config/api";
import StrataContext from "../../contexts/StrataContext";

/**
 * Strata component.
 *
 * Provides an interface for managing strata within selected stratifications.
 * Handles fetching, creating, updating, and deleting strata, as well as validation and context management.
 *
 * @component
 * @returns {JSX.Element} The rendered Strata management interface.
 */
const Strata = () => {
  const [strata, setStrata] = useState([]);
  const [stratifications, setStratifications] = useState([]);
  const [selectedStratification, setSelectedStratification] = useState("");
  const [addStratum, setAddStratum] = useState(false);

  // Fetch stratifications on component mount
  useEffect(() => {
    fetch(buildApiUrl(API_CONFIG.ENDPOINTS.GET_STRATIFICATIONS))
      .then(response => response.json())
      .then(data => setStratifications(data))
      .catch(error => console.error("Error fetching stratifications:", error));
  }, []);

  // Fetch strata when stratification is selected
  useEffect(() => {
    if (selectedStratification) {
      fetch(
        buildApiUrl(
          API_CONFIG.ENDPOINTS.STRATA_BY_STRATIFICATION(selectedStratification)
        )
      )
        .then(response => response.json())
        .then(data => setStrata(data))
        .catch(error => console.error("Error fetching strata:", error));
    } else {
      setStrata([]);
    }
  }, [selectedStratification]);

  /**
   * Create stratum.
   * @param {object} stratum - The stratum to be created.
   */
  const createStratum = stratum => {
    // Ensure area is null if empty or not set
    const processedStratum = {
      ...stratum,
      area:
        stratum.area === undefined ||
        stratum.area === null ||
        stratum.area === ""
          ? null
          : stratum.area,
    };
    fetch(buildApiUrl(API_CONFIG.ENDPOINTS.STRATA), {
      method: "POST",
      headers: API_CONFIG.HEADERS.DEFAULT,
      body: JSON.stringify(processedStratum),
    })
      .then(response => response.json())
      .then(s => {
        const newStrata = [...strata, s];
        setStrata(newStrata);
      })
      .catch(error => console.error("Error creating stratum:", error));
  };

  /**
   * Update stratum.
   * @param {object} stratum - The stratum to be updated.
   */
  const updateStratum = stratum => {
    const api = buildApiUrl(API_CONFIG.ENDPOINTS.STRATUM_BY_ID(stratum.id));

    fetch(api, {
      method: "PUT",
      headers: API_CONFIG.HEADERS.DEFAULT,
      body: JSON.stringify(stratum),
    })
      .then(response => response.json())
      .then(updatedStratum => {
        const updatedStrata = strata.map(s =>
          s.id === updatedStratum.id ? updatedStratum : s
        );
        setStrata(updatedStrata);
      })
      .catch(error => console.error("Error updating stratum:", error));
  };

  /**
   * Delete stratum.
   * @param {number} stratumId - The ID of the stratum to be deleted.
   */
  const deleteStratum = stratumId => {
    const api = buildApiUrl(API_CONFIG.ENDPOINTS.STRATUM_BY_ID(stratumId));

    fetch(api, {
      method: "DELETE",
      headers: API_CONFIG.HEADERS.DEFAULT,
    })
      .then(() => {
        const updatedStrata = strata.filter(s => s.id !== stratumId);
        setStrata(updatedStrata);
      })
      .catch(error => console.error("Error deleting stratum:", error));
  };

  /**
   * Method to check if a stratum name already exists in this stratification.
   * @param {string} stratumName stratum name to check if already exists.
   * @returns True if exists, false if doesn't.
   */
  const stratumExists = stratumName => {
    if (typeof strata === "undefined") {
      return false;
    }

    const stratum_exists = Object.keys(strata).map(s => {
      if (strata[s]["stratum"] === stratumName) {
        return true;
      } else {
        return false;
      }
    });
    return stratum_exists.some(s => s === true);
  };

  /**
   * Validate the stratum name.
   * Checks if the provided stratum name does not already exist in the current stratification.
   *
   * @param {string} stratumName - The stratum name to check for validity.
   * @returns {boolean} True if valid (does not exist), false if not valid (already exists).
   */
  const validateStratumName = stratumName => {
    const stratum_exists = stratumExists(stratumName);
    return !stratum_exists;
  };

  // Fetch if the stratum is used in any hauls
  const stratumUsedInHauls = async stratumId => {
    const api = buildApiUrl(API_CONFIG.ENDPOINTS.STRATUM_IN_HAUL(stratumId));
    try {
      const response = await fetch(api);
      const data = await response.json();
      console.log("Stratu in hauls ", stratumId, ":", data.exists);
      return data.exists;
    } catch (error) {
      console.error("Error checking stratum in hauls:", error);
      return false;
    }
  };

  /**
   * Method to render list of strata
   * @returns {character} List of strata in html.
   */
  const renderStrataList = () => {
    if (strata) {
      return (
        <Fragment>
          {strata.map(stratum => {
            return (
              <Stratum key={stratum.id} stratum={stratum} addStratum={false} />
            );
          })}
        </Fragment>
      );
    }
  };

  const renderStrataSection = () => {
    if (addStratum === false) {
      return (
        <Fragment>
          <StrataButtonBar handleAddStratum={setAddStratum} />
          {renderStrataList()}
        </Fragment>
      );
    } else if (addStratum === true) {
      return (
        <Fragment>
          <Stratum addStratum={true} />
          {renderStrataList()}
        </Fragment>
      );
    }
  };

  const renderContent = () => {
    return (
      <StrataContext.Provider
        value={{
          strata,
          setStrata,
          stratifications,
          selectedStratification,
          setSelectedStratification,
          createStratum,
          updateStratum,
          deleteStratum,
          validateStratumName,
          addStratum,
          setAddStratum,
          stratumUsedInHauls,
        }}
      >
        <main>
          <header>
            <h1 className="title">Strata Management</h1>
          </header>

          <div className="wrapper strataWrapper">
            <div className="form__row">
              <label className="form__cell">
                Stratification:
                <select
                  value={selectedStratification}
                  onChange={e => setSelectedStratification(e.target.value)}
                  className="select__normalWidth"
                >
                  <option value="">Select a stratification...</option>
                  {stratifications.map(stratification => (
                    <option key={stratification.id} value={stratification.id}>
                      {stratification.stratification}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {selectedStratification && renderStrataSection()}
          </div>
        </main>
      </StrataContext.Provider>
    );
  };

  return renderContent();
};

export default Strata;
