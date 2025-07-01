import React, { useState, useContext } from "react";
import StratumFormView from "./view/StratumFormView";
import StratumFormEdit from "./edit/StratumFormEdit";
import StratumFormNew from "./new/StratumFormNew";
import StrataContext from "../../contexts/StrataContext";

const Stratum = ({ stratum, addStratum }) => {
  const [edit, setEdit] = useState(false);
  const strataContext = useContext(StrataContext);

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
          <StratumFormView stratum={stratum} edit={edit} setEdit={setEdit} />
        </div>
      );
    }
  };

  return renderContent();
};

export default Stratum;
