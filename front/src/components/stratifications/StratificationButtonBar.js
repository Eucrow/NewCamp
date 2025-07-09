import React from "react";

import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonDelete from "../ui/UiButtonDelete";
import UiIconEdit from "../ui/UiIconEdit";
import UiIconDelete from "../ui/UiIconDelete";

/**
 * StratificationButtonBar component.
 * Renders a button bar with actions for a stratification, supporting edit, add, and default modes.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.stratification - The stratification object.
 * @param {boolean} props.edit - Whether the stratification is currently being edited.
 * @param {Function} props.setEdit - Function to set the edit state.
 * @param {Function} props.deleteStratification - Function to delete the stratification by id.
 * @param {Function} props.handleCancel - Function to handle canceling the edit mode.
 * @param {Function} props.handleAdd - Function to handle canceling the add mode.
 * @param {boolean} props.addStratification - Whether a new stratification is being added.
 * @param {boolean} props.isEdit - Whether this is edit mode (alternative to `edit`).
 * @param {boolean} props.isValid - Whether the current form state is valid.
 * @param {boolean} props.isDeleteable - Whether the stratification can be deleted.
 *
 * @returns {React.ReactElement} The rendered StratificationButtonBar component.
 */
const StratificationButtonBar = ({
  stratification,
  edit,
  setEdit,
  deleteStratification,
  handleCancel,
  handleAdd,
  addStratification,
  isEdit,
  isValid,
  isDeleteable,
  focusIndex = 0, // Default focus index for accessibility
}) => {
  const buttonBarConfig = {
    defaultMode: (
      <div className="form__cell form__cell--right">
        <UiButtonStatusHandle handleMethod={setEdit} newStatus={true}>
          <UiIconEdit />
        </UiButtonStatusHandle>
        <UiButtonDelete
          confirmMessage={`Are you sure you want to delete the stratification "${stratification?.stratification}"?`}
          deleteMethod={() => deleteStratification(stratification?.id)}
          buttonText={"Delete stratification"}
          disabled={!isDeleteable}
          disabledMessage={
            "This stratification cannot be deleted because it is used in one or more strata."
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

    if (addStratification === true) {
      return buttonBarConfig.newMode;
    }

    return buttonBarConfig.defaultMode;
  };

  return renderContent();
};

export default StratificationButtonBar;
