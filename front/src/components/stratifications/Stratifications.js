import React, { useEffect, useMemo } from "react";
import Stratification from "./Stratification";
import StratificationsButtonBar from "./StratificationsButtonBar";

import { useStratificationsCrud } from "../../hooks/useStratificationsCrud.js";
import StratificationsContext from "../../contexts/StratificationsContext";

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
  const {
    stratifications,
    addStratification,
    setAddStratification,
    fetchStratifications,
    createStratification,
    updateStratification,
    deleteStratification,
    stratificationUsedInSurvey,
  } = useStratificationsCrud();

  // Fetch stratifications on component mount
  useEffect(() => {
    fetchStratifications();
  }, []);

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
