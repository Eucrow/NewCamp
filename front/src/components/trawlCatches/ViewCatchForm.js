import React, { useContext } from "react";
import CatchButtonBar from "./CatchButtonBar";
import CatchContext from "../../contexts/CatchContext";

/**
 * View CatchForm is a functional component that represents a form to view catch data.
 *
 * @component
 * @param {string} catchStatus - The current status of the catch: "", "view" or "edit".
 * @param {object} thisCatch - The catch object that is currently being managed by this component.
 * @param {function} editCatchStatus - A function to manage the catchStatus state.
 * @param {boolean} viewSexes - A boolean to manage the view of sexes.
 * @param {function} deleteCatch - A function to delete the catch from the database.
 * @param {function} handleViewSexes - A function to handle the view of sexes.
 * @param {object} allowedSexes - An object containing allowedSexes state, which allow to add sexes to the catch or don't.
 * @returns {JSX.Element} The rendered Catch component.
 */
const ViewCatchForm = () => {
  const catchContext = useContext(CatchContext);

  const renderContent = () => {
    return (
      <form className="catches__table__row">
        <input
          className="catches__table__cell catches__table__group"
          type="number"
          id="group"
          name="group"
          min="1"
          max="5"
          disabled
          value={catchContext.thisCatch.group}
          aria-label="Group"
        />
        <select
          className="catches__table__cell catches__table__code"
          id="sp_code"
          name="sp_code"
          disabled
          aria-label="Species code"
        >
          <option key={catchContext.thisCatch.sp_id}>
            {catchContext.thisCatch.sp_code}
          </option>
        </select>
        <select
          className="catches__table__cell catches__table__species"
          id="sp_code"
          name="sp_code"
          disabled
          aria-label="Species"
        >
          <option key={catchContext.thisCatch.sp_id}>
            {catchContext.thisCatch.sp_name}
          </option>
        </select>
        <input
          className="catches__table__cell catches__table__category"
          type="number"
          id="category"
          name="category"
          min="1"
          max="99"
          disabled
          value={catchContext.thisCatch.category}
          aria-label="Category"
        />
        <input
          className="catches__table__cell catches__table__weight"
          type="number"
          id="weight"
          name="weight"
          min="1"
          max="99999999"
          disabled
          value={catchContext.thisCatch.weight}
          aria-label="Weight"
        />
        <input
          className="catches__table__cell catches__table__sampledWeight"
          disabled
          type="number"
          id="sampled_weight"
          name="sampled_weight"
          min="0"
          max="99999999"
          value={catchContext.thisCatch.sampled_weight || ""}
          aria-label="Sampled weight"
        />
        <input
          className="catches__table__cell catches__table__individuals"
          disabled
          type="number"
          id="individuals"
          name="individuals"
          min="0"
          max="99999999"
          value={catchContext.thisCatch.not_measured_individuals || ""}
          aria-label="Not measured individuals"
        />
        <div className="catches__table__cell hasLengths__container">
          <div className="hasLengths__row">
            <div className="catches__table__cell catches__table__individuals hasLengths__row__sex">
              {catchContext.thisCatch.individuals_by_sex[1] || "0"}
            </div>
            <div className="catches__table__cell catches__table__individuals hasLengths__row__sex">
              {catchContext.thisCatch.individuals_by_sex[2] || "0"}
            </div>
            <div className="catches__table__cell catches__table__individuals hasLengths__row__sex">
              {catchContext.thisCatch.individuals_by_sex[3] || "0"}
            </div>
          </div>
        </div>
        <CatchButtonBar className="" />
      </form>
    );
  };

  return renderContent();
};

export default ViewCatchForm;
