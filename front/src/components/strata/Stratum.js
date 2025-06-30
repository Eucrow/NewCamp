import React, { useState } from "react";
import StratumFormView from "./view/StratumFormView";
import StratumFormEdit from "./edit/StratumFormEdit";
import StratumFormNew from "./new/StratumHandleNew";

const Stratum = ({
  stratum,
  stratificationId,
  validateStratumName,
  createStratum,
  addStratum,
  handleAddStratum,
}) => {
  const [edit, setEdit] = useState(false);

  const [thisStratum, setThisStratum] = useState(stratum);

  const renderContent = () => {
    if (addStratum === true) {
      return (
        <div className="wrapper form__row">
          <StratumFormNew
            stratification_id={stratificationId}
            handleAdd={handleAddStratum}
            addStratum={addStratum}
            createStratum={createStratum}
            validateStratumName={validateStratumName}
          />
        </div>
      );
    } else if (edit === true) {
      return (
        <div className="wrapper form__row">
          <StratumFormEdit
            stratum={stratum}
            edit={edit}
            setEdit={setEdit}
            setThisStratum={setThisStratum}
            validateStratumName={validateStratumName}
          />
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
