/**
 * useStratificationsCrud - Custom React hook for managing stratifications CRUD operations and UI state.
 *
 * This hook provides functions and state for:
 * - Fetching, creating, updating, and deleting stratifications via API
 * - Tracking the list of stratifications
 * - Controlling the visibility of the add stratification form
 * - Checking if a stratification is used in any survey (prevents deletion)
 *
 * Returned values:
 * @property {Array<Object>} stratifications - List of stratification objects
 * @property {boolean} addingStratification - Whether the add stratification form is visible
 * @property {Function} setAddingStratification - Function to toggle add form visibility
 * @property {Function} fetchStratifications - Fetches all stratifications from the API
 * @property {Function} createStratification - Creates a new stratification
 * @property {Function} updateStratification - Updates an existing stratification
 * @property {Function} deleteStratification - Deletes a stratification by ID
 * @property {Function} stratificationUsedInSurvey - Checks if a stratification is referenced by any survey
 *
 * @returns {Object} Object containing state and CRUD functions for stratifications
 */

import { useState, useEffect } from "react";
import { API_CONFIG, buildApiUrl } from "../config/api";

export const useStratificationsCrud = () => {
  const [stratifications, setStratifications] = useState([]);
  const [addingStratification, setAddingStratification] = useState(false);

  /**
   * Fetch all stratifications from the API.
   *
   * @async
   * @function
   * @returns {Promise<void>} Promise that resolves when stratifications are fetched and state is updated
   * @throws {Error} When the API request fails or returns a non-ok response
   */
  const fetchStratifications = async () => {
    try {
      const response = await fetch(
        buildApiUrl(API_CONFIG.ENDPOINTS.STRATIFICATIONS)
      );
      if (!response.ok) {
        throw new Error("Failed to fetch stratifications");
      }
      const data = await response.json();
      setStratifications(data);
    } catch (error) {
      console.error("Error fetching stratifications:", error);
    }
  };

  /**
   * Create a new stratification via API and update local state.
   *
   * @async
   * @function
   * @param {Object} stratification - The stratification object to be created
   * @param {string} stratification.stratification - The name of the stratification
   * @param {string} [stratification.description] - Optional description of the stratification
   * @returns {Promise<void>} Promise that resolves when stratification is created and state is updated
   * @throws {Error} When the API request fails or returns a non-ok response
   */
  const createStratification = async stratification => {
    try {
      const response = await fetch(
        buildApiUrl(API_CONFIG.ENDPOINTS.STRATIFICATIONS),
        {
          method: "POST",
          headers: API_CONFIG.HEADERS.DEFAULT,
          body: JSON.stringify(stratification),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create stratification");
      }

      const newStratification = await response.json();
      setStratifications([...stratifications, newStratification]);
      setAddingStratification(false);
    } catch (error) {
      console.error("Error creating stratification:", error);
    }
  };

  // Fetch stratifications when the component mounts
  useEffect(() => {
    fetchStratifications();
  }, []);

  /**
   * Update an existing stratification via API and refresh local state.
   *
   * @async
   * @function
   * @param {Object} stratification - The stratification object with updated values
   * @param {number} stratification.id - The unique identifier of the stratification to update
   * @param {string} stratification.stratification - The updated name of the stratification
   * @param {string} [stratification.description] - Optional updated description of the stratification
   * @returns {Promise<void>} Promise that resolves when stratification is updated and state is refreshed
   * @throws {Error} When the API request fails or returns a non-ok response
   */
  const updateStratification = async stratification => {
    try {
      const response = await fetch(
        buildApiUrl(
          API_CONFIG.ENDPOINTS.STRATIFICATIONS + stratification.id + "/"
        ),
        {
          method: "PUT",
          headers: API_CONFIG.HEADERS.DEFAULT,
          body: JSON.stringify(stratification),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update stratification");
      }

      const updatedStratification = await response.json();
      setStratifications(
        stratifications.map(s =>
          s.id === stratification.id ? updatedStratification : s
        )
      );
    } catch (error) {
      console.error("Error updating stratification:", error);
    }
  };

  /**
   * Delete a stratification via API and remove from local state.
   *
   * @async
   * @function
   * @param {number} id - The unique identifier of the stratification to delete
   * @returns {Promise<void>} Promise that resolves when stratification is deleted and state is updated
   * @throws {Error} When the API request fails or returns a non-ok response
   */
  const deleteStratification = async id => {
    try {
      const response = await fetch(
        buildApiUrl(API_CONFIG.ENDPOINTS.STRATIFICATIONS + id),
        {
          method: "DELETE",
          headers: API_CONFIG.HEADERS.DEFAULT,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete stratification");
      }

      setStratifications(stratifications.filter(s => s.id !== id));
    } catch (error) {
      console.error("Error deleting stratification:", error);
    }
  };

  /**
   * Check if a stratification is currently used in any survey.
   *
   * @async
   * @function
   * @param {number} stratificationId - The unique identifier of the stratification to check
   * @returns {Promise<boolean>} Promise that resolves to true if stratification is used in surveys, false otherwise
   * @throws {Error} When the API request fails, returns false as fallback
   */
  const stratificationUsedInSurvey = async stratificationId => {
    const api = buildApiUrl(
      API_CONFIG.ENDPOINTS.STRATIFICATIONS_IN_SURVEY(stratificationId)
    );
    try {
      const response = await fetch(api);
      const data = await response.json();
      console.log("Stratu in hauls ", stratificationId, ":", data.exists);
      return data.exists;
    } catch (error) {
      console.error("Error checking stratification in survey:", error);
      return false;
    }
  };

  return {
    stratifications,
    addingStratification,
    setAddingStratification,
    createStratification,
    updateStratification,
    deleteStratification,
    stratificationUsedInSurvey,
  };
};
