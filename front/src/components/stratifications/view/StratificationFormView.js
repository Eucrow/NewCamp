import React, { useState, useContext, useEffect } from "react";

import StratificationsContext from "../../../contexts/StratificationsContext";
import StratificationButtonBar from "../StratificationButtonBar";

/**
 * StratificationFormView component - Read-only display of stratification details.
 *
 * A form component that displays stratification information in a read-only format.
 * All input fields are disabled to prevent editing, and the component provides
 * action buttons through the StratificationButtonBar for editing and deletion.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Object} props.stratification - The stratification object to display
 * @param {number} props.stratification.id - Unique identifier for the stratification
 * @param {string} props.stratification.stratification - Name of the stratification
 * @param {string} [props.stratification.description] - Optional description of the stratification
 * @param {boolean} props.edit - Current edit state (passed to button bar)
 * @param {Function} props.setEdit - Function to toggle edit mode (passed to button bar)
 * @returns {JSX.Element} The rendered read-only stratification form with action buttons
 */
const StratificationFormView = ({ stratification, edit, setEdit }) => {
  const [isDeleteable, setIsDeleteable] = useState(true);

  const stratificationsContext = useContext(StratificationsContext);
  useEffect(() => {
    /**
     * Check if the stratification can be safely deleted.
     *
     * @async
     * @function
     * @returns {Promise<void>} Promise that resolves when the deleteability check is complete
     */
    const checkIsDeleteable = async () => {
      const isUsedInSurveys =
        await stratificationsContext.stratificationUsedInSurvey(
          stratification.id
        );
      setIsDeleteable(!isUsedInSurveys);
    };

    checkIsDeleteable();
  }, []);

  /**
   * Render the read-only stratification form.
   *
   * @function
   * @returns {JSX.Element} The rendered form with disabled inputs and action buttons
   */
  const renderContent = () => {
    return (
      <form className="form--wide">
        <div className="form__row">
          <label className="form__cell">
            Stratification:
            <input
              className="stratifications__name"
              type="text"
              name="name"
              id="name"
              disabled
              value={stratification.stratification || ""}
            />
          </label>
        </div>
        <div className="form__row">
          <label className="form__cell form--wide">
            Description:
            <textarea
              className="field__comment"
              type="text"
              name="description"
              id="description"
              disabled
              value={stratification.description || ""}
            />
          </label>
        </div>
        <div className="form__row">
          <StratificationButtonBar
            edit={edit}
            setEdit={setEdit}
            stratification={stratification}
            deleteStratification={stratificationsContext.deleteStratification}
            handleCancel={setEdit}
            isDeleteable={isDeleteable}
          />
        </div>
      </form>
    );
  };

  return renderContent();
};

export default StratificationFormView;
