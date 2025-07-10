import React, { useEffect, useState, useMemo, useContext } from "react";
import Stratification from "./Stratification";
import StratificationsButtonBar from "./StratificationsButtonBar";
import { API_CONFIG, buildApiUrl } from "../../config/api";
import StratificationsContext from "../../contexts/StratificationsContext";
import SurveysContext from "../../contexts/SurveysContext";

/**
 * Stratifications component.
 *
 * Provides an interface for managing stratifications, including:
 * - Fetching all stratifications from the API on mount
 * - Creating, updating, and deleting stratifications
 * - Managing UI state for adding new stratifications
 * - Providing all relevant state and CRUD functions via StratificationsContext to child components
 *
 * Context values provided:
 * - stratifications: Array of stratification objects
 * - createStratification: Function to create a new stratification
 * - updateStratification: Function to update an existing stratification
 * - deleteStratification: Function to delete a stratification by id
 * - addStratification: Boolean, whether the add form is shown
 * - setAddStratification: Function to control add form visibility
 *
 * @component
 * @returns {JSX.Element} The rendered Stratifications management interface.
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
   * Create stratification.
   * @param {object} stratification - The stratification to be created.
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
   * Update stratification.
   * @param {object} stratification - The updated stratification.
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
   * Delete stratification.
   * @param {number} id - The ID of the stratification to delete.
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

  // Fetch if the stratification is used in any survey
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
