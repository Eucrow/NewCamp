import React, { useContext } from "react";

import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiButtonDelete from "../ui/UiButtonDelete";

import LengthsContext from "../../contexts/LengthsContext";

/**
 * Lengths button bar component.
 */
const LengthsButtonBar = () => {
  var ButtonBar = null;

  const lengthsContext = useContext(LengthsContext);

  if (lengthsContext.lengthsStatus === "empty") {
    ButtonBar = (
      <div className="form__cell sexWrapper__buttons_bar">
        <UiButtonStatusHandle
          buttonText={"Add Lengths"}
          handleMethod={lengthsContext.setLengthsStatus}
          newStatus={"add"}
        />
      </div>
    );
  } else if (lengthsContext.lengthsStatus === "view") {
    ButtonBar = (
      <div className="form__cell sexWrapper__buttons_bar">
        <UiButtonStatusHandle
          buttonText={"Edit Lengths"}
          handleMethod={lengthsContext.setLengthsStatus}
          newStatus={"edit"}
        />
        <UiButtonDelete
          deleteMethod={lengthsContext.deleteLengths}
          buttonText={"Delete Lengths"}
          confirmMessage={"Are you sure to remove all the lengths of this sex?"}
        />
      </div>
    );
  } else if (lengthsContext.lengthsStatus === "edit") {
    ButtonBar = (
      <div className="form__cell sexWrapper__buttons_bar">
        <button
          className="buttonsWrapper__button"
          type="submit"
          disabled={!lengthsContext.validLengths}
        >
          Save
        </button>
        <button
          onClick={() => {
            lengthsContext.cancelEditLengths();
          }}
        >
          Cancel
        </button>
        <div className="form__cell buttonsWrapper--center"></div>
      </div>
    );
  } else if (lengthsContext.lengthsStatus === "add") {
    ButtonBar = null;
  } else if (lengthsContext.lengthsStatus === "new") {
    ButtonBar = (
      <div className="form__cell sexWrapper__buttons_bar">
        <button
          className="buttonsWrapper__button"
          type="submit"
          disabled={!lengthsContext.validLengths}
        >
          Add Lengths
        </button>
        <button
          type="button"
          onClick={() => {
            lengthsContext.cancelEditLengths();
          }}
        >
          Cancel
        </button>
        <div className="form__cell buttonsWrapper--center"></div>
      </div>
    );
  }

  return ButtonBar;
};

export default LengthsButtonBar;
