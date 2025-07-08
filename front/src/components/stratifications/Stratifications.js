import React, { useEffect, useState, Fragment } from "react";
import Stratification from "./Stratification";
import StratificationsButtonBar from "./StratificationsButtonBar";
import { API_CONFIG, buildApiUrl } from "../../config/api";
import StratificationsContext from "../../contexts/StratificationsContext";

/**
 * Stratifications component.
 *
 * Provides an interface for managing stratifications.
 * Handles fetching, creating, updating, and deleting stratifications, as well as validation and context management.
 *
 * @component
 * @returns {JSX.Element} The rendered Stratifications management interface.
 */
const Stratifications = () => {
  const [stratifications, setStratifications] = useState([]);
  const [addStratification, setAddStratification] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stratifications on component mount
  useEffect(() => {
    fetchStratifications();
  }, []);

  /**
   * Fetch all stratifications from the API.
   */
  const fetchStratifications = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        buildApiUrl(API_CONFIG.ENDPOINTS.GET_STRATIFICATIONS)
      );
      if (!response.ok) {
        throw new Error("Failed to fetch stratifications");
      }
      const data = await response.json();
      setStratifications(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching stratifications:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create stratification.
   * @param {object} stratification - The stratification to be created.
   */
  const createStratification = async stratification => {
    try {
      const response = await fetch(
        buildApiUrl(API_CONFIG.ENDPOINTS.STRATIFICATION),
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
      setError(null);
    } catch (error) {
      console.error("Error creating stratification:", error);
      setError(error.message);
    }
  };

  /**
   * Update stratification.
   * @param {object} stratification - The updated stratification.
   */
  const updateStratification = async stratification => {
    try {
      const response = await fetch(
        buildApiUrl(API_CONFIG.ENDPOINTS.STRATIFICATION + stratification.id),
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
      setError(null);
    } catch (error) {
      console.error("Error updating stratification:", error);
      setError(error.message);
    }
  };

  /**
   * Delete stratification.
   * @param {number} id - The ID of the stratification to delete.
   */
  const deleteStratification = async id => {
    try {
      const response = await fetch(
        buildApiUrl(API_CONFIG.ENDPOINTS.STRATIFICATION + id),
        {
          method: "DELETE",
          headers: API_CONFIG.HEADERS.DEFAULT,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete stratification");
      }

      setStratifications(stratifications.filter(s => s.id !== id));
      setError(null);
    } catch (error) {
      console.error("Error deleting stratification:", error);
      setError(error.message);
    }
  };

  /**
   * Handle adding a new stratification.
   */
  const handleAddStratification = () => {
    setAddStratification(true);
  };

  /**
   * Handle canceling the add stratification operation.
   */
  const handleCancelAdd = () => {
    setAddStratification(false);
  };

  const contextValue = {
    stratifications,
    createStratification,
    updateStratification,
    deleteStratification,
    handleCancelAdd,
    loading,
    error,
  };

  if (loading) {
    return <div className="loading">Loading stratifications...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={fetchStratifications}>Retry</button>
      </div>
    );
  }

  return (
    <StratificationsContext.Provider value={contextValue}>
      <div className="stratifications">
        <div className="stratifications__header">
          <h2>Stratifications Management</h2>
          <StratificationsButtonBar
            handleAddStratification={handleAddStratification}
          />
        </div>

        <div className="stratifications__content">
          {addStratification && (
            <Stratification addStratification={addStratification} />
          )}

          {stratifications.map(stratification => (
            <Fragment key={stratification.id}>
              <Stratification stratification={stratification} />
            </Fragment>
          ))}

          {stratifications.length === 0 && !addStratification && (
            <div className="no-data">
              <p>
                No stratifications found. Click "Add Stratification" to create
                one.
              </p>
            </div>
          )}
        </div>
      </div>
    </StratificationsContext.Provider>
  );
};

export default Stratifications;
