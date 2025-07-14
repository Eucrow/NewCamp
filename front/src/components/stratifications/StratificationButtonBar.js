import React from "react";

import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonDelete from "../ui/UiButtonDelete";
import UiIconEdit from "../ui/UiIconEdit";
import UiIconDelete from "../ui/UiIconDelete";

/**
 * StratificationButtonBar component - Action buttons for stratification forms.
 *
 * A versatile button bar component that renders different sets of action buttons based on the current mode.
 * Supports three distinct modes: default (view), edit, and new creation. Each mode presents appropriate
 * actions for that context, maintaining a consistent user interface across all stratification operations.
 *
 * **Modes and their buttons:**
 * - **Default Mode**: Edit button (with edit icon) and Delete button (with delete icon and confirmation)
 * - **Edit Mode**: Save button (form submission) and Cancel button (reverts changes)
 * - **New Mode**: Save button (form submission) and Cancel button (closes form)
 *
 * **Features:**
 * - Delete button includes confirmation dialog with stratification name
 * - Delete button can be disabled when stratification is used in surveys
 * - Save button respects form validation state (disabled when invalid)
 * - Uses consistent UI components for all button types
 *
 * @component
 * @param {Object} props - The component props
 * @param {Object} [props.stratification] - The stratification object being acted upon
 * @param {number} props.stratification.id - Unique identifier for the stratification
 * @param {string} props.stratification.stratification - Name of the stratification (used in delete confirmation)
 * @param {boolean} [props.edit=false] - Whether the stratification is currently being edited
 * @param {Function} [props.setEdit] - Function to toggle edit state between true/false
 * @param {Function} [props.deleteStratification] - Function to delete the stratification by ID
 * @param {Function} [props.handleCancel] - Function to handle canceling edit mode and reverting changes
 * @param {Function} [props.handleAdd] - Function to handle canceling new stratification creation
 * @param {boolean} [props.addingStratification=false] - Whether a new stratification is being added
 * @param {boolean} [props.isEdit=false] - Alternative flag for edit mode (takes precedence over edit prop)
 * @param {boolean} [props.isValid=true] - Whether the current form state is valid (affects Save button state)
 * @param {boolean} [props.isDeleteable=true] - Whether the stratification can be deleted (affects Delete button state)
 * @returns {JSX.Element} The rendered button bar with mode-appropriate action buttons
 */
const StratificationButtonBar = ({
  stratification,
  edit,
  setEdit,
  deleteStratification,
  handleCancel,
  handleAdd,
  addingStratification,
  isEdit,
  isValid,
  isDeleteable,
}) => {
  /**
   * Configuration object defining button layouts for each mode.
   *
   * Contains JSX elements for three different button configurations:
   * - defaultMode: Edit and Delete buttons for viewing mode
   * - editMode: Save and Cancel buttons for editing mode
   * - newMode: Save and Cancel buttons for creation mode
   *
   * @type {Object}
   * @property {JSX.Element} defaultMode - Buttons for view mode (Edit, Delete)
   * @property {JSX.Element} editMode - Buttons for edit mode (Save, Cancel)
   * @property {JSX.Element} newMode - Buttons for creation mode (Save, Cancel)
   */
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
            "This stratification cannot be deleted because it is used in one or more surveys."
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

  /**
   * Determines and returns the appropriate button configuration based on current mode.
   *
   * @function
   * @returns {JSX.Element} The appropriate button configuration for the current mode
   */
  const renderContent = () => {
    if (isEdit || edit === true) {
      return buttonBarConfig.editMode;
    }

    if (addingStratification === true) {
      return buttonBarConfig.newMode;
    }

    return buttonBarConfig.defaultMode;
  };

  return renderContent();
};

export default StratificationButtonBar;
