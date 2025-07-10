import React, { useState, useContext, useEffect } from "react";
import StratificationFormView from "./view/StratificationFormView";
import StratificationFormEdit from "./edit/StratificationFormEdit";
import StratificationFormNew from "./new/StratificationFormNew";

/**
 * Stratification component - Container for individual stratification management.
 *
 * A smart container component that manages the display and editing state of a single stratification.
 * Acts as a router between three different modes: view, edit, and new creation.
 * Provides the appropriate form component based on the current state and props.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Object} [props.stratification] - The stratification object to display or edit.
 *                                          Not required when in new mode (addStratification=true)
 * @param {number} props.stratification.id - Unique identifier for the stratification
 * @param {string} props.stratification.stratification - Name of the stratification
 * @param {string} [props.stratification.description] - Optional description of the stratification
 * @param {boolean} [props.addStratification=false] - Whether to render the form for adding a new stratification.
 *                                                    When true, overrides edit state and shows new form
 * @returns {JSX.Element} The rendered stratification component with appropriate form based on current mode
 */
const Stratification = ({ stratification, addStratification }) => {
  const [edit, setEdit] = useState(false);

  /**
   * Render the appropriate form component based on the current mode.
   *
   * Determines which form component to render based on the component's state and props:
   * - Returns StratificationFormNew when adding a new stratification
   * - Returns StratificationFormEdit when editing an existing stratification
   * - Returns StratificationFormView for default read-only display
   *
   * @function
   * @returns {JSX.Element} The appropriate form component wrapped in styling containers
   */
  const renderContent = () => {
    if (addStratification === true) {
      return (
        <div className="wrapper form__row">
          <StratificationFormNew addStratification={addStratification} />
        </div>
      );
    } else if (edit === true) {
      return (
        <div className="wrapper form__row">
          <StratificationFormEdit
            stratification={stratification}
            edit={edit}
            setEdit={setEdit}
          />
        </div>
      );
    } else {
      return (
        <div className="wrapper form__row">
          <StratificationFormView
            stratification={stratification}
            edit={edit}
            setEdit={setEdit}
          />
        </div>
      );
    }
  };

  return <div className="stratification">{renderContent()}</div>;
};

export default Stratification;
