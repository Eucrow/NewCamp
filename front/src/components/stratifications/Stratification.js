import React, { useState } from "react";
import StratificationFormView from "./view/StratificationFormView";
import StratificationFormEdit from "./edit/StratificationFormEdit";
import StratificationFormNew from "./new/StratificationFormNew";

/**
 * Stratification component.
 *
 * Handles the display and editing of a single stratification, supporting view, edit, and new modes.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} [props.stratification] - The stratification object to display or edit (not required in new mode).
 * @param {boolean} props.addStratification - Whether to render the form for adding a new stratification.
 *
 * @returns {JSX.Element} The rendered stratification form in the appropriate mode.
 */
const Stratification = ({ stratification, addStratification }) => {
  const [edit, setEdit] = useState(false);
  const [isDeleteable, setIsDeleteable] = useState(true);

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
