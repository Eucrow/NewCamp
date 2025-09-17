import React, { useContext } from "react";

import SurveysContext from "../../contexts/SurveysContext";

import UiButtonSave from "../ui/UiButtonSave";
import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

/**
 * SurveyButtonBar component that provides contextual action buttons for survey operations.
 *
 * This component renders different sets of buttons based on the current mode:
 * - Edit mode: Save and Cancel buttons
 * - View mode: Edit and Delete buttons (delete disabled if survey has stations)
 * - Adding mode: Save and Cancel buttons for new surveys
 *
 * The component integrates with SurveysContext for operations and handles
 * form validation states to enable/disable save functionality appropriately.
 * It provides user feedback through disabled states and confirmation dialogs.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.survey - Survey object for operations
 * @param {boolean} props.edit - Whether currently in edit mode
 * @param {Function} props.handleEdit - Function to toggle edit mode
 * @param {boolean} props.addingSurvey - Whether currently adding a survey
 * @param {boolean} props.isFormValid - Whether the form is valid for submission
 * @param {boolean} props.hasStations - Whether survey has stations (affects delete)
 * @returns {JSX.Element} Appropriate button bar for current mode
 *
 * @example
 * // Edit mode buttons
 * <SurveyButtonBar
 *   survey={surveyData}
 *   edit={true}
 *   handleEdit={setEditMode}
 *   isFormValid={true}
 * />
 *
 * @requires SurveysContext - Context for survey operations
 * @requires UiButtonSave - Save button component
 * @requires UiButtonDelete - Delete button component
 * @requires UiButtonStatusHandle - Status toggle button component
 */
const SurveyButtonBar = ({
  survey,
  edit,
  handleEdit,
  addingSurvey,
  isFormValid,
  hasStations,
}) => {
  const surveysContext = useContext(SurveysContext);
  var ButtonBar = "";

  if (edit === true) {
    ButtonBar = (
      <div className="form__cell form__cell--right buttonsWrapper">
        <UiButtonSave buttonText={"Save Survey"} disabled={!isFormValid} />
        <button
          className="buttonsWrapper__button"
          type="button"
          onClick={e => {
            e.preventDefault();
            surveysContext.handleCancelEditSurvey();
            handleEdit(false);
          }}
        >
          Cancel
        </button>
      </div>
    );
  }

  if (edit === false) {
    ButtonBar = (
      <div className="form__cell form__cell--right buttonsWrapper">
        <button
          type="button"
          className="buttonsWrapper__button"
          onClick={e => {
            handleEdit(true);
          }}
        >
          Edit Survey
        </button>
        <UiButtonDelete
          id={survey.id}
          deleteMethod={surveysContext.deleteSurvey}
          buttonText="Delete Survey"
          confirmMessage="Delete the survey?"
          disabled={hasStations}
          disabledMessage="This survey cannot be deleted because it has stations."
        />
      </div>
    );
  }

  if (addingSurvey === true) {
    ButtonBar = (
      <div className="survey__cell form__cell--right buttonsWrapper">
        <UiButtonSave buttonText={"Save Survey"} disabled={!isFormValid} />
        <UiButtonStatusHandle
          buttonText="Cancel"
          handleMethod={surveysContext.setAddingSurvey}
          newStatus={false}
        />
      </div>
    );
  }

  return ButtonBar;
};

export default SurveyButtonBar;
