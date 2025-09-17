import React, { Fragment } from "react";
import Stratum from "./Stratum";
import StrataButtonBar from "./StrataButtonBar";
import StrataContext from "../../contexts/StrataContext";

import { useStrataCrud } from "../../hooks/useStrataCrud";

/**
 * Strata management component.
 *
 * Provides a comprehensive interface for managing strata within selected stratifications.
 * Features include:
 * - Stratification selection dropdown
 * - Dynamic strata fetching based on selected stratification
 * - CRUD operations for strata (create, read, update, delete)
 * - Validation to prevent deletion of strata used in hauls
 * - Context provider for sharing strata state across child components
 * - Add/edit mode toggling for strata forms
 *
 * The component uses the useStrataCrud custom hook for state management and API operations.
 * All strata operations are performed asynchronously with proper error handling.
 *
 * @component
 * @returns {JSX.Element} The rendered Strata management interface with stratification selector and strata list.
 */
const Strata = () => {
  const {
    strata,
    addingStratum,
    setAddingStratum,
    stratifications,
    selectedStratification,
    setSelectedStratification,
    createStratum,
    updateStratum,
    deleteStratum,
    stratumUsedInHauls,
  } = useStrataCrud();

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
              <Stratum
                key={stratum.id}
                stratum={stratum}
                addingStratum={false}
              />
            );
          })}
        </Fragment>
      );
    }
  };

  const renderStrataSection = () => {
    if (addingStratum === false) {
      return (
        <Fragment>
          <StrataButtonBar handleAddStratum={setAddingStratum} />
          {renderStrataList()}
        </Fragment>
      );
    } else if (addingStratum === true) {
      return (
        <Fragment>
          <Stratum addingStratum={true} />
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
          selectedStratification,
          createStratum,
          updateStratum,
          deleteStratum,
          setAddingStratum,
          stratumUsedInHauls,
        }}
      >
        <main>
          <header>
            <h1 className="title">Strata Management</h1>
          </header>
          <div className="wrapper strataWrapper strata__notes">
            The management of strata has some limitations. To avoid
            inconsistencies, the system does not allow the deletion of strata
            that are used by any haul. To remove a stratum, please ensure it is
            not associated with any haul.
          </div>

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
