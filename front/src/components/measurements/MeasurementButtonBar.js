import React from "react";

// import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiIconEdit from "../ui/UiIconEdit";
// import UiIconDelete from "../ui/UiIconDelete";

/**
 * Represents a button bar component for managing measurements.
 *
 * @component
 * @param {string} id - The ID of the measurement.
 * @param {boolean} add - Indicates whether the component is in "add" mode.
 * @param {function} setAdd - The function to set the "add" mode.
 * @param {boolean} edit - Indicates whether the component is in "edit" mode.
 * @param {function} handleEdit - The function to handle the edit action.
 * @param {function} handleCancel - The function to handle the cancel action.
 * @param {boolean} isNameValid - Indicates whether the measurement name is valid.
 * @param {boolean} isFormValid - Indicates whether the measurement form is valid.
 * @returns {JSX.Element} The rendered MeasurementButtonBar component.
 */
const MeasurementButtonBar = ({
  // id,
  add,
  setAdd,
  edit,
  handleEdit,
  handleCancel,
  // deleteMeasurement,
  isNameValid,
  isFormValid,
}) => {
  var content = "";

  if (edit === true) {
    content = (
      <div className="form__cell form__cell--right">
        <UiButtonSave
          buttonText={"Save Measurement"}
          isDisabled={!isNameValid}
        />
        <button
          onClick={() => {
            handleCancel();
          }}
        >
          Cancel
        </button>
      </div>
    );
  }

  if (edit === false) {
    content = (
      <div className="form__cell form__cell--right buttonsWrapper">
        <UiButtonStatusHandle
          buttonText={"Edit Measurement"}
          handleMethod={handleEdit}
          newStatus={true}
        >
          <UiIconEdit />
        </UiButtonStatusHandle>
        {/* <UiButtonDelete
					id={id}
					deleteMethod={deleteMeasurement}
					buttonText="Delete Measurement"
					confirmMessage="Delete this species? All the samples of this species on ALL the surveys will be removed!! Are you sure?"
				>
					<UiIconDelete />
				</UiButtonDelete> */}
      </div>
    );
  }

  if (add === true) {
    content = (
      <div className="form__cell form__cell--right buttonsWrapper">
        <UiButtonSave
          buttonText={"Save Measurement"}
          isDisabled={!isFormValid}
        />
        <UiButtonStatusHandle
          buttonText={"Cancel"}
          handleMethod={setAdd}
          newStatus={false}
        />
      </div>
    );
  }

  return content;
};

export default MeasurementButtonBar;
