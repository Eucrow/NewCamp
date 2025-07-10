import React, { useState, useContext, useEffect } from "react";
import StratificationFormView from "./view/StratificationFormView";
import StratificationFormEdit from "./edit/StratificationFormEdit";
import StratificationFormNew from "./new/StratificationFormNew";

import StratificationsContext from "../../contexts/StratificationsContext";
import SurveysContext from "../../contexts/SurveysContext";

/**
 * Stratification component.
 *
 * Handles the display and editing of a single stratification.
 * Renders in one of three modes:
 * - View: shows details of an existing stratification
 * - Edit: allows editing an existing stratification
 * - New: allows creation of a new stratification
 *
 * Uses StratificationsContext for CRUD operations.
 *
 * @component
 * @param {Object} props
 * @param {Object} [props.stratification] - The stratification object to display or edit (not required in new mode).
 * @param {boolean} props.addStratification - Whether to render the form for adding a new stratification.
 * @returns {JSX.Element}
 */
const Stratification = ({ stratification, addStratification }) => {
  const [edit, setEdit] = useState(false);
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
            isDeleteable={isDeleteable}
          />
        </div>
      );
    }
  };

  return <div className="stratification">{renderContent()}</div>;
};

export default Stratification;
