import React, { useContext } from "react";

import StrataContext from "../../../contexts/StrataContext";
import StratumButtonBar from "../StratumButtonBar";

const StratumFormView = ({ stratum, edit, setEdit }) => {
  const strataContext = useContext(StrataContext);

  const renderContent = () => {
    return (
      <form className="form--wide">
        <div className="form__row">
          <label className="form__cell">
            Stratum:
            <input
              className="stratum__description"
              type="text"
              name="stratum"
              id="stratum"
              disabled
              value={stratum.stratum || ""}
            />
          </label>
          <label className="form__cell">
            Area:
            <input
              type="number"
              name="area"
              id="area"
              min="1"
              max="9999"
              disabled
              value={stratum.area || ""}
            />
          </label>
          <StratumButtonBar edit={edit} setEdit={setEdit} stratum={stratum} />
        </div>
        <div className="form__row">
          <label className="form__cell form--wide">
            Comment:
            <textarea
              className="field__comment"
              name="comment"
              id="comment"
              disabled
              value={stratum.comment || ""}
            />
          </label>
        </div>
      </form>
    );
  };
  return renderContent();
};

export default StratumFormView;
