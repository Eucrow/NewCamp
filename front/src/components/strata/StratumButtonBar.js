import React from "react";

import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonDelete from "../ui/UiButtonDelete";
import UiIconEdit from "../ui/UiIconEdit";
import UiIconDelete from "../ui/UiIconDelete";

/**
 * StratumButtonBar component.
 * Renders a button bar with actions for a stratum, supporting edit, add, and default modes.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.stratum - The stratum object.
 * @param {boolean} props.edit - Whether the stratum is currently being edited.
 * @param {Function} props.setEdit - Function to set the edit state.
 * @param {Function} props.deleteStratum - Function to delete the stratum by id.
 * @param {Function} props.handleCancel - Function to handle canceling the edit mode.
 * @param {Function} props.handleAdd - Function to handle canceling the add mode.
 * @param {boolean} props.addStratum - Whether a new stratum is being added.
 * @param {boolean} props.isEdit - Whether this is edit mode (alternative to `edit`).
 * @param {boolean} props.isValid - Whether the current form state is valid.
 *
 * @returns {React.ReactElement} The rendered StratumButtonBar component.
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
  isValid,
  isDeleteable,
}) => {
  const buttonBarConfig = {
    defaultMode: (
      <div className="form__cell form__cell--right">
        <UiButtonStatusHandle handleMethod={setEdit} newStatus={true}>
          <UiIconEdit />
        </UiButtonStatusHandle>
        <UiButtonDelete
          confirmMessage={`Are you sure you want to delete the stratum "${stratum?.stratum}"?`}
          deleteMethod={() => deleteStratum(stratum?.id)}
          buttonText={"Delete stratum"}
          disabled={!isDeleteable}
          disabledMessage={
            "This stratum cannot be deleted because it is used in one or more hauls."
          }
        >
          <UiIconDelete />
        </UiButtonDelete>
      </div>
    ),
    editMode: (
      <div className="form__cell form__cell--right">
        <UiButtonSave buttonText={"Save"} disabled={!isValid} />
        <UiButtonStatusHandle
          buttonText={"Cancel"}
          handleMethod={() => handleCancel(false)}
          newStatus={false}
        />
      </div>
    ),
    newMode: (
      <div className="form__cell form__cell--right">
        <UiButtonSave buttonText={"Save"} disabled={!isValid} />
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
    }

    if (addStratum === true) {
      return buttonBarConfig.newMode;
    }

    return buttonBarConfig.defaultMode;
  };

  return renderContent();
};

export default StratumButtonBar;
