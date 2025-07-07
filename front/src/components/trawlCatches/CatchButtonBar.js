import React, { useContext } from "react";

import CatchesContext from "../../contexts/CatchesContext";
import CatchContext from "../../contexts/CatchContext";

import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonSexes from "../ui/UiButtonSexes";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiIconEdit from "../ui/UiIconEdit";
import UiIconDelete from "../ui/UiIconDelete";
import UiButtonSave from "../ui/UiButtonSave";
import UiButton from "../ui/UiButton";
import UiIconSaveAndAdd from "../ui/UiIconSaveAndAdd";
import UiIconSaveAndFinish from "../ui/UiIconSaveAndFinish";
import UiIconCancel from "../ui/UiIconCancel";

/**
 * Catch button bar component.
 */
const CatchButtonBar = ({ newCatch, setNewCatch, isFormValid }) => {
  var ButtonBar = null;

  const catchesContext = useContext(CatchesContext);
  const catchContext = useContext(CatchContext);

  const isDisabled = () => {
    // console.log("isDisabled check:", {
    // 	catchId: catchContext.thisCatch?.catch_id,
    // 	editingId: catchesContext.editingCatchId,
    // 	add: catchesContext.add,
    // 	catchStatus: catchContext.catchStatus,
    // });

    return (
      catchesContext.add === true || catchesContext.editingCatchId !== null
      // (catchesContext.editingCatchId !== null &&
      // 	catchesContext.editingCatchId !== catchContext.thisCatch.catch_id)
      // (catchesContext.editingCatchId !== null &&
      // 	// catchesContext.editingCatchId !== catchContext.catchId)
      // catchesContext.editingCatchId !== catchContext.thisCatch.catch_id)
    );
  };

  // const isDisabled = () => {
  // 	// If we're adding a new catch, disable all buttons
  // 	if (catchesContext.add === true) {
  // 		return true;
  // 	}

  // 	// If a catch is being edited, only enable buttons for other catches
  // 	if (catchesContext.editingCatchId !== null) {
  // 		return catchesContext.editingCatchId === catchContext.thisCatch.catch_id;
  // 	}

  // 	// Otherwise, enable all buttons
  // 	return false;
  // };

  // const isDisabled = () => {
  // 	// Disable ALL buttons when:
  // 	// 1. We're adding a new catch OR
  // 	// 2. Any catch is being edited
  // 	return catchesContext.add === true || catchesContext.editingCatchId !== null;
  // };

  const handleSaveAndAdd = async e => {
    e.preventDefault();
    await catchesContext.createCatch(newCatch);
    setNewCatch({
      group: "",
      sp_id: "",
      sp_code: "",
      sp_name: "",
      category: "",
      weight: "",
      sampled_weight: "",
      not_measured_individuals: "",
    });
  };

  const handleSaveAndFinish = async e => {
    e.preventDefault();
    try {
      await catchesContext.createCatch(newCatch);
      catchContext.handleChangeAdd(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (catchContext.catchStatus === "add") {
    ButtonBar = (
      <div className="catches__table__buttonBar">
        <UiButton
          buttonText={"Save and add new species"}
          method={handleSaveAndAdd}
          disabled={!isFormValid}
        >
          <UiIconSaveAndAdd />
        </UiButton>

        <UiButton
          buttonText={"Save and finish"}
          method={handleSaveAndFinish}
          disabled={!isFormValid}
        >
          <UiIconSaveAndFinish />
        </UiButton>

        <UiButtonStatusHandle
          handleMethod={catchContext.handleChangeAdd}
          buttonText={"Cancel"}
          newStatus={false}
        >
          <UiIconCancel />
        </UiButtonStatusHandle>
      </div>
    );
  }

  if (catchContext.catchStatus === "view") {
    ButtonBar = (
      <div className="catches__table__buttonBar">
        <UiButtonStatusHandle
          handleMethod={catchContext.editCatchStatus}
          buttonText={"Edit species"}
          newStatus={"edit"}
          disabled={isDisabled()}
        >
          <UiIconEdit />
        </UiButtonStatusHandle>

        <UiButtonDelete
          id={catchContext.thisCatch.catch_id}
          deleteMethod={catchesContext.deleteCatch}
          buttonText={"Delete species"}
          confirmMessage={
            "Are you sure to delete this catch? This delete the catch and its sexes and lengths."
          }
          children={<UiIconDelete />}
          disabled={isDisabled()}
        />

        {catchContext.allowedSexes === false || isDisabled() === true ? (
          <UiButtonSexes disabled={true} />
        ) : catchContext.viewSexes === false ? (
          <UiButtonSexes
            handleMethod={catchContext.setViewSexes}
            newStatus={true}
            disabled={false}
          />
        ) : (
          <UiButtonSexes
            handleMethod={catchContext.setViewSexes}
            newStatus={false}
            disabled={false}
          />
        )}
      </div>
    );
  }

  if (catchContext.catchStatus === "edit") {
    ButtonBar = (
      <div className="catches__table__buttonBar">
        <UiButtonSave buttonText={"Save"} disabled={!isFormValid} />

        <button
          onClick={e => {
            e.preventDefault();
            catchContext.handleCancel();
          }}
        >
          Cancel
        </button>
      </div>
    );
  }

  return ButtonBar;
};

export default CatchButtonBar;
