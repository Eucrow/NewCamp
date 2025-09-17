import React, { useState } from "react";

import EditSurveyForm from "./EditSurveyForm";
import ViewSurveyForm from "./ViewSurveyForm";

/**
 * Survey component that manages the display state of a single survey.
 *
 * This component acts as a controller that switches between edit and view modes
 * for a survey. It determines whether to show the EditSurveyForm or ViewSurveyForm
 * based on the current edit state. This provides a clean separation between
 * display logic and form presentation.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.survey - Survey object containing all survey data
 * @param {boolean} props.hasStations - Whether the survey has associated stations
 * @returns {JSX.Element} Either EditSurveyForm or ViewSurveyForm component
 *
 * @example
 * // Display a survey with edit capabilities
 * <Survey
 *   survey={surveyData}
 *   hasStations={false}
 * />
 *
 * @requires EditSurveyForm - Form component for editing surveys
 * @requires ViewSurveyForm - Form component for viewing surveys
 */
const Survey = ({ survey, hasStations }) => {
  const [edit, setEdit] = useState(false);

  return edit === true ? (
    <EditSurveyForm survey={survey} handleEdit={setEdit} />
  ) : (
    <ViewSurveyForm
      survey={survey}
      handleEdit={setEdit}
      hasStations={hasStations}
    />
  );
};

export default Survey;
