import React, { useContext, useState, useRef } from "react";

import StrataContext from "../../../contexts/StrataContext";
import StratumButtonBar from "../StratumButtonBar";

import { useStrataValidation } from "../../../hooks/useStrataValidation";
import FloatingError from "../../ui/FloatingError";

const StratumFormEdit = ({ stratum, edit, setEdit }) => {
  /**
   * @param {object} stratum
   * @param {method} setThisStratum
   * @param {boolean} edit
   * @param {method} setEdit
   * @param {method} validateStratumName
   * @returns {JSX.Element}
   */

  const strataContext = useContext(StrataContext);
  const [backupStratum] = useState(stratum);
  const [formData, setFormData] = useState({
    id: stratum.id,
    stratification: stratum.stratification,
    stratum: stratum.stratum || "",
    area: stratum.area || "",
    comment: stratum.comment || "",
  });

  const stratumRef = useRef(null);

  // Pass the current stratum name and the original stratum name (from props)
  const { stratumExists, isFormValid, errors } = useStrataValidation(
    formData.stratum,
    stratum.stratum
  );

  const handleSubmit = e => {
    e.preventDefault();
    strataContext.updateStratum(formData);
    setEdit(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev_state => {
      return {
        ...prev_state,
        [name]: value,
      };
    });
  };

  const handleCancel = status => {
    setFormData({
      id: backupStratum.id,
      stratification: backupStratum.stratification,
      stratum: backupStratum.stratum || "",
      area: backupStratum.area || "",
      comment: backupStratum.comment || "",
    });
    setEdit(status);
  };

  const renderContent = () => {
    return (
      <form className="form--wide" onSubmit={handleSubmit}>
        <div className="form__row">
          <label className="form__cell">
            Stratum:
            <input
              className="stratum__description"
              type="text"
              name="stratum"
              id="stratum"
              maxLength="50"
              value={formData.stratum}
              onChange={handleChange}
              required
              ref={stratumRef}
            />
            <FloatingError
              message={errors.stratumExists}
              show={stratumExists}
              inputRef={stratumRef}
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
              value={formData.area}
              onChange={handleChange}
            />
          </label>
          <StratumButtonBar
            edit={edit}
            setEdit={setEdit}
            handleCancel={handleCancel}
            stratum={stratum}
            isEdit={true}
            isValid={isFormValid}
          />
        </div>
        <div className="form__row">
          <label className="form__cell form--wide">
            Comment:
            <textarea
              className="field__comment"
              name="comment"
              id="comment"
              maxLength="1000"
              value={formData.comment}
              onChange={handleChange}
            />
          </label>
        </div>
      </form>
    );
  };

  return renderContent();
};

export default StratumFormEdit;
