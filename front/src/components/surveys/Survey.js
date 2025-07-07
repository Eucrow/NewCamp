import React, { useState } from "react";

import EditSurveyForm from "./EditSurveyForm";
import ViewSurveyForm from "./ViewSurveyForm";

/**
 * Survey component. Manage component logic.
 * @param {object} props survey object
 */
const Survey = ({ survey }) => {
  const [edit, setEdit] = useState(false);

  return edit === true ? (
    <EditSurveyForm survey={survey} handleEdit={setEdit} />
  ) : (
    <ViewSurveyForm survey={survey} handleEdit={setEdit} />
  );
};

export default Survey;
