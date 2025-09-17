import React from "react";

import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonDelete from "../ui/UiButtonDelete";
import UiIconEdit from "../ui/UiIconEdit";
import UiIconDelete from "../ui/UiIconDelete";

/**
 * StratumButtonBar component - Action buttons for stratum forms.
 *
 * Renders different button sets for default (view), edit, and new modes.
 * Handles delete validation and form submission states.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Object} [props.stratum] - The stratum object
 * @param {boolean} [props.edit] - Whether in edit mode
 * @param {Function} [props.setEdit] - Function to toggle edit state
 * @param {Function} [props.deleteStratum] - Function to delete stratum
 * @param {Function} [props.handleCancel] - Function to handle edit cancellation
 * @param {Function} [props.handleAdd] - Function to handle new stratum cancellation
 * @param {boolean} [props.addingStratum] - Whether adding new stratum
 * @param {boolean} [props.isEdit] - Alternative edit mode flag
 * @param {boolean} [props.isValid] - Whether form state is valid
 * @param {boolean} [props.isDeleteable] - Whether stratum can be deleted
 * @returns {JSX.Element} The rendered button bar for current mode
 */
const StratumButtonBar = ({
  stratum,
  edit,
  setEdit,
  deleteStratum,
  handleCancel,
  handleAdd,
  addingStratum,
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

    if (addingStratum === true) {
      return buttonBarConfig.newMode;
    }

    return buttonBarConfig.defaultMode;
  };

  return renderContent();
};

export default StratumButtonBar;
