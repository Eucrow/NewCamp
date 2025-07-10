import React, { useEffect, useState, useMemo, useContext } from "react";
import Stratification from "./Stratification";
import StratificationsButtonBar from "./StratificationsButtonBar";
import { API_CONFIG, buildApiUrl } from "../../config/api";
import StratificationsContext from "../../contexts/StratificationsContext";
import SurveysContext from "../../contexts/SurveysContext";

/**
 * Stratifications component - Main container for stratification management.
 *
 * Context values provided to children:
 * @property {Array<Object>} stratifications - Array of stratification objects from the API
 * @property {Function} createStratification - Creates a new stratification and updates local state
 * @property {Function} updateStratification - Updates an existing stratification and refreshes local state
 * @property {Function} deleteStratification - Deletes a stratification by ID and removes from local state
 * @property {boolean} addStratification - Controls visibility of the add stratification form
 * @property {Function} setAddStratification - Function to toggle add form visibility
 * @property {Function} stratificationUsedInSurvey - Checks if a stratification is referenced by any survey
 *
 * @component
 * @returns {JSX.Element} The rendered Stratifications management interface with context provider
 */
const Stratifications = () => {
  const [stratifications, setStratifications] = useState([]);
  const [addStratification, setAddStratification] = useState(false);

  const surveysContext = useContext(SurveysContext);

  // Fetch stratifications on component mount
  useEffect(() => {
    fetchStratifications();
  }, []);

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
      setAddStratification(false);
    } catch (error) {
      console.error("Error creating stratification:", error);
    }
  };

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

  const contextValue = useMemo(
    () => ({
      stratifications,
      createStratification,
      updateStratification,
      deleteStratification,
      addStratification,
      setAddStratification,
      stratificationUsedInSurvey,
    }),
    [stratifications]
  );

  return (
    <StratificationsContext.Provider value={contextValue}>
      <main>
        <header>
          <h1 className="title">Stratifications Management</h1>
        </header>
        <div className="wrapper strataWrapper stratifications__notes">
          The management of stratifications has some limitations. To avoid
          inconsistencies, the system does not allow the deletion of
          stratifications that are used by any survey. To remove a
          stratification, please ensure it is not associated with any survey.
        </div>
        <div className="wrapper stratificationsWrapper">
          {addStratification ? (
            <Stratification addStratification={addStratification} />
          ) : (
            <StratificationsButtonBar
              handleAddStratification={setAddStratification}
            />
          )}

          <div className="stratifications__content">
            {stratifications.map(stratification => (
              <Stratification
                key={stratification.id}
                stratification={stratification}
              />
            ))}

            {stratifications.length === 0 && !addStratification && (
              <div>
                <p>
                  No stratifications found. Click "Add Stratification" to create
                  one.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </StratificationsContext.Provider>
  );
};

export default Stratifications;
