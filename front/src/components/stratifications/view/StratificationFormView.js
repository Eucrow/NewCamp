import React, { useContext } from "react";

import StratificationsContext from "../../../contexts/StratificationsContext";
import StratificationButtonBar from "../StratificationButtonBar";

/**
 * StratificationFormView component.
 * Renders a read-only form displaying stratification details.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.stratification - The stratification object to display.
 * @param {boolean} props.edit - Whether the form is in edit mode (passed to button bar).
 * @param {Function} props.setEdit - Function to set the edit state (passed to button bar).
 * @param {boolean} props.isDeleteable - Whether the stratification can be deleted.
 *
 * @returns {JSX.Element} The rendered read-only form for a stratification.
 */
const StratificationFormView = ({ stratification, edit, setEdit, isDeleteable }) => {
  const stratificationsContext = useContext(StratificationsContext);

  const renderContent = () => {
    return (
      <form className="form--wide">
        <div className="form__row">
          <label className="form__cell">
            Name:
            <input
              className="stratification__name"
              type="text"
              name="name"
              id="name"
              disabled
              value={stratification.name || ""}
            />
          </label>
          <label className="form__cell">
            Description:
            <input
              type="text"
              name="description"
              id="description"
              disabled
              value={stratification.description || ""}
            />
          </label>
          <label className="form__cell">
            Created:
            <input
              type="text"
              name="created"
              id="created"
              disabled
              value={stratification.created_at ? new Date(stratification.created_at).toLocaleDateString() : ""}
            />
          </label>
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
