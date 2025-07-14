import { useState, useEffect } from "react";
import { API_CONFIG, buildApiUrl } from "../config/api";

/**
 * Custom hook for managing strata CRUD operations.
 *
 * @returns {Object} An object containing:
 * @returns {Array} strata - Array of strata objects
 * @returns {Function} setStrata - Function to set strata array
 * @returns {boolean} addingStratum - Flag indicating if adding a stratum
 * @returns {Function} setAddingStratum - Function to set addingStratum flag
 * @returns {Array} stratifications - Array of available stratifications
 * @returns {string} selectedStratification - Currently selected stratification ID
 * @returns {Function} setSelectedStratification - Function to set selected stratification
 * @returns {Function} createStratum - Async function to create a new stratum
 * @returns {Function} updateStratum - Async function to update an existing stratum
 * @returns {Function} deleteStratum - Async function to delete a stratum
 * @returns {Function} stratumUsedInHauls - Async function to check if stratum is used in hauls
 */
export const useStrataCrud = () => {
  const [strata, setStrata] = useState([]);
  const [addingStratum, setAddingStratum] = useState(false);
  const [stratifications, setStratifications] = useState([]);
  const [selectedStratification, setSelectedStratification] = useState("");

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
  const createStratum = async stratum => {
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
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.STRATA), {
        method: "POST",
        headers: API_CONFIG.HEADERS.DEFAULT,
        body: JSON.stringify(processedStratum),
      });
      if (!response.ok) {
        throw new Error("Failed to create stratum");
      }
      const s = await response.json();
      const newStrata = [...strata, s];
      setStrata(newStrata);
    } catch (error) {
      console.error("Error creating stratum:", error);
    }
  };

  /**
   * Update stratum.
   * @param {object} stratum - The stratum to be updated.
   */
  const updateStratum = async stratum => {
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

    const api = buildApiUrl(API_CONFIG.ENDPOINTS.STRATUM_BY_ID(stratum.id));

    const response = await fetch(api, {
      method: "PUT",
      headers: API_CONFIG.HEADERS.DEFAULT,
      body: JSON.stringify(processedStratum),
    });

    if (!response.ok) {
      throw new Error("Failed to update stratum");
    }

    // Update the stratum in the local state
    const updatedStratum = await response.json();

    const updatedStrata = strata.map(s =>
      s.id === updatedStratum.id ? updatedStratum : s
    );
    setStrata(updatedStrata);
  };

  /**
   * Delete stratum.
   * @param {number} stratumId - The ID of the stratum to be deleted.
   */
  const deleteStratum = async stratumId => {
    const api = buildApiUrl(API_CONFIG.ENDPOINTS.STRATUM_BY_ID(stratumId));
    try {
      const response = await fetch(api, {
        method: "DELETE",
        headers: API_CONFIG.HEADERS.DEFAULT,
      });
      if (!response.ok) {
        throw new Error("Failed to delete stratum");
      }
      const updatedStrata = strata.filter(s => s.id !== stratumId);
      setStrata(updatedStrata);
    } catch (error) {
      console.error("Error deleting stratum:", error);
    }
  };

  // Fetch if the stratum is used in any hauls
  const stratumUsedInHauls = async stratumId => {
    const api = buildApiUrl(API_CONFIG.ENDPOINTS.STRATUM_IN_HAUL(stratumId));
    try {
      const response = await fetch(api);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error("Error checking stratum in hauls:", error);
      return false;
    }
  };
  return {
    strata,
    setStrata,
    addingStratum,
    setAddingStratum,
    stratifications,
    selectedStratification,
    setSelectedStratification,
    createStratum,
    updateStratum,
    deleteStratum,
    stratumUsedInHauls,
  };
};
