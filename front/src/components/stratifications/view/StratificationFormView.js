import React, { useState, useContext, useEffect } from "react";

import StratificationsContext from "../../../contexts/StratificationsContext";
import StratificationButtonBar from "../StratificationButtonBar";

/**
 * StratificationFormView component.
 *
 * Renders a read-only form displaying stratification details.
 * Uses StratificationsContext for delete and other actions via StratificationButtonBar.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.stratification - The stratification object to display.
 * @param {boolean} props.edit - Whether the form is in edit mode (passed to button bar).
 * @param {Function} props.setEdit - Function to set the edit state (passed to button bar).
 * @param {boolean} props.isDeleteable - Whether the stratification can be deleted.
 * @returns {JSX.Element}
 */
const StratificationFormView = ({ stratification, edit, setEdit }) => {
  const [isDeleteable, setIsDeleteable] = useState(true);

  const stratificationsContext = useContext(StratificationsContext);

  useEffect(() => {
    const checkIsDeleteable = async () => {
      const isUsedInSurveys =
        await stratificationsContext.stratificationUsedInSurvey(
          stratification.id
        );
      setIsDeleteable(!isUsedInSurveys);
    };

    checkIsDeleteable();
  }, []);

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
