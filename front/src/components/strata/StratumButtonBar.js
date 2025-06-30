import React from "react";

import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonDelete from "../ui/UiButtonDelete";
import UiIconEdit from "../ui/UiIconEdit";
import UiIconDelete from "../ui/UiIconDelete";

/**
 * StratumButtonBar component.
 * Renders a button bar with different actions related to a stratum.
 *
 * @param {number} stratum_id - The ID of the stratum.
 * @param {boolean} edit - A boolean indicating if the stratum is currently being edited.
 * @param {function} setEdit - A function to set the edit state.
 * @param {function} deleteStratum - A function to delete the stratum.
 * @param {function} handleCancel - A function to handle canceling the edition of the stratum.
 * @param {boolean} isEdit - A boolean indicating if this is edit mode.
 * @param {object} stratum - The stratum object.
 *
 * @returns {React.Element} The rendered StratumButtonBar component.
 */
const StratumButtonBar = ({
  stratum,
  edit,
  setEdit,
  deleteStratum,
  handleCancel,
  handleAdd,
  addStratum,
  isEdit,
}) => {
  const buttonBarConfig = {
    defaultMode: (
      <div className="form__cell form__cell--right">
        <UiButtonStatusHandle
          buttonText={<UiIconEdit />}
          handleMethod={setEdit}
          newStatus={true}
        />
        <UiButtonDelete
          handleMethod={() => deleteStratum && deleteStratum(stratum?.id)}
        />
      </div>
    ),
    editMode: (
      <div className="form__cell form__cell--right">
        <UiButtonSave />
        <UiButtonStatusHandle
          buttonText={"Cancel"}
          handleMethod={
            handleCancel ? () => handleCancel(false) : () => setEdit(false)
          }
          newStatus={false}
        />
      </div>
    ),
    newMode: (
      <div className="form__cell form__cell--right">
        <UiButtonSave />
        <UiButtonStatusHandle
          buttonText={"Cancel"}
          handleMethod={handleAdd}
          newStatus={false}
        />
      </div>
    ),
  };

  const renderContent = () => {
    if (isEdit || edit === true) {
      return buttonBarConfig.editMode;
    } else if (addStratum === true) {
      return buttonBarConfig.newMode;
    } else {
      return buttonBarConfig.defaultMode;
    }
  };

  return renderContent();
};

export default StratumButtonBar;
