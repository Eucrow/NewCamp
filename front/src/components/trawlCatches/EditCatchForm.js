import React, { useState, useContext, useRef, useEffect } from "react";

import GlobalContext from "../../contexts/GlobalContext";
import CatchesContext from "../../contexts/CatchesContext";
import CatchContext from "../../contexts/CatchContext";

import { useCatchValidation } from "../../hooks/useCatchValidation";

import CatchButtonBar from "./CatchButtonBar";
import FloatingError from "../ui/FloatingError";

/**
 * EditCatchForm Component
 *
 * A form component that handles the editing of catch entries in the trawl catches system.
 * It provides input fields for catch details like group, species, weight, etc., with validation.
 *
 * @component
 **/
const EditCatchForm = () => {
  const globalContext = useContext(GlobalContext);
  const catchesContext = useContext(CatchesContext);
  const catchContext = useContext(CatchContext);

  const weightRef = useRef(null);
  const sampledWeightRef = useRef(null);
  const categoryRef = useRef(null);

  const [activeField, setActiveField] = useState(null);

  const { validationErrors, isFormValid, isSpeciesValid, existsCatch } =
    useCatchValidation(catchContext.thisCatch);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await catchesContext.updateCatch(catchContext.thisCatch.catch_id);
      catchesContext.setEditingCatchId(null);
      catchContext.setCatchStatus("view");
    } catch (error) {
      console.error("Error updating catch:", error);
    }
  };

  useEffect(() => {
    console.log("update editingCatchId to:", catchesContext.editingCatchId);
  }, [catchesContext.editingCatchId]);

  const renderContent = () => {
    return (
      <form className="catches__table__row" onSubmit={e => handleSubmit(e)}>
        <input
          type="hidden"
          id="haul_id"
          name="haul_id"
          value={catchContext.thisCatch.haul_id}
        />
        <div className="catches__table__cell">
          <input
            className={` catches__table__group ${
              existsCatch === false ? "" : "invalid"
            }`}
            type="number"
            id="group"
            name="group"
            required={true}
            autoFocus
            min="1"
            max="5"
            value={catchContext.thisCatch.group}
            onChange={catchesContext.handleChangeGroup(
              catchContext.thisCatch.catch_id
            )}
            aria-label="Group"
          />
        </div>
        <div className="catches__table__cell">
          <input
            className={`catches__table__cell catches__table__code ${
              isSpeciesValid === true && existsCatch === false ? "" : "invalid"
            }`}
            type="text"
            value={catchContext.thisCatch.sp_code}
            disabled={catchContext.thisCatch.group === "" ? true : false}
            required={true}
            id="sp_code"
            name="sp_code"
            onChange={catchesContext.handleChangeSpeciesCode(
              catchContext.thisCatch.catch_id,
              catchContext.thisCatch.group
            )}
            aria-label="Species code"
          />
        </div>
        <select
          className={`catches__table__cell catches__table__species ${
            isSpeciesValid === true && existsCatch === false ? "" : "invalid"
          }`}
          value={catchContext.thisCatch.sp_id}
          disabled={catchContext.thisCatch.group === "" ? true : false}
          required={true}
          id="sp_name"
          name="sp_name"
          onChange={catchesContext.handleChangeSpeciesName(
            catchContext.thisCatch.catch_id
          )}
          aria-label="Species"
        >
          <option value=""></option>
          {globalContext.species.map(s => {
            if (s.group === parseInt(catchContext.thisCatch.group)) {
              return (
                <option value={s.id} key={s.id}>
                  {s.sp_name}
                </option>
              );
            } else {
              return null;
            }
          })}
        </select>
        <div className="catches__table__cell">
          <input
            className={` catches__table__category ${
              existsCatch === false ? "" : "invalid"
            }`}
            type="number"
            id="category"
            name="category"
            required={true}
            min="1"
            max="99"
            value={catchContext.thisCatch.category}
            onChange={catchesContext.handleInputChange(
              catchContext.thisCatch.catch_id,
              "category"
            )}
            aria-label="Category"
          />
          <FloatingError
            message={validationErrors.category}
            show={existsCatch}
            inputRef={categoryRef}
          />
        </div>
        <div className="catches__table__cell">
          <input
            className={` catches__table__weight ${
              validationErrors.weight ? "input-error" : ""
            }`}
            type="number"
            id="weight"
            name="weight"
            required={true}
            min="1"
            max="99999999"
            value={catchContext.thisCatch.weight}
            onChange={catchesContext.handleInputChange(
              catchContext.thisCatch.catch_id,
              "weight"
            )}
            onFocus={() => setActiveField("weight")}
            onBlur={() => setActiveField(null)}
            aria-label="Weight"
          />
          <FloatingError
            message={validationErrors.weight}
            show={activeField === "weight"}
            inputRef={weightRef}
          />
        </div>
        <div className="catches__table__cell">
          <input
            className={`catches__table__sampledWeight ${
              validationErrors.sampledWeight ? "input-error" : ""
            } `}
            type="number"
            id="sampled_weight"
            name="sampled_weight"
            min="0"
            max="99999999"
            value={catchContext.thisCatch.sampled_weight || ""}
            onChange={catchesContext.handleInputChange(
              catchContext.thisCatch.catch_id,
              "sampled_weight"
            )}
            aria-label="Sampled weight"
            onFocus={() => setActiveField("sampledWeight")}
            onBlur={() => setActiveField(null)}
          />
          <FloatingError
            message={validationErrors.sampledWeight}
            show={activeField === "sampledWeight"}
            inputRef={sampledWeightRef}
          />
        </div>
        <input
          className="catches__table__cell catches__table__individuals"
          type="number"
          id="not_measured_individuals"
          name="not_measured_individuals"
          min="0"
          max="99999999"
          value={catchContext.thisCatch.not_measured_individuals || ""}
          onChange={catchesContext.handleInputChange(
            catchContext.thisCatch.catch_id,
            "not_measured_individuals"
          )}
          aria-label="Not measured individuals"
        />
        <CatchButtonBar isFormValid={isFormValid} />
      </form>
    );
  };

  return renderContent();
};

export default EditCatchForm;
