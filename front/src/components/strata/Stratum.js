import React, { useState, useContext, useEffect } from "react";
import StratumFormView from "./view/StratumFormView";
import StratumFormEdit from "./edit/StratumFormEdit";
import StratumFormNew from "./new/StratumFormNew";
import StrataContext from "../../contexts/StrataContext";

/**
 * Stratum component.
 *
 * Handles the display and editing of a single stratum, supporting view, edit, and new modes.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} [props.stratum] - The stratum object to display or edit (not required in new mode).
 * @param {boolean} props.addStratum - Whether to render the form for adding a new stratum.
 *
 * @returns {JSX.Element} The rendered stratum form in the appropriate mode.
 */
const Stratum = ({ stratum, addStratum }) => {
  const [edit, setEdit] = useState(false);
  const [isDeleteable, setIsDeletable] = useState(true);
  const strataContext = useContext(StrataContext);

  useEffect(() => {
    const checkDeleteable = async () => {
      if (stratum?.id) {
        const usedInHauls = await strataContext.stratumUsedInHauls(stratum.id);
        setIsDeletable(!usedInHauls);
      } else {
        setIsDeletable(true); // New stratum is always deletable
      }
    };
    checkDeleteable();
  }, [stratum, strataContext]);

  const renderContent = () => {
    if (addStratum === true) {
      return (
        <div className="wrapper form__row">
          <StratumFormNew
            stratification_id={strataContext.selectedStratification}
            addStratum={addStratum}
          />
        </div>
      );
    } else if (edit === true) {
      return (
        <div className="wrapper form__row">
          <StratumFormEdit stratum={stratum} edit={edit} setEdit={setEdit} />
        </div>
      );
    } else {
      return (
        <div className="wrapper form__row">
          <StratumFormView
            stratum={stratum}
            edit={edit}
            setEdit={setEdit}
            isDeleteable={isDeleteable}
          />
        </div>
      );
    }
  };

  return renderContent();
};

export default Stratum;
