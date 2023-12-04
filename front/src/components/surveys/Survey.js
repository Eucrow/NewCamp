import React, { useState } from "react";

import ViewEditSurveyForm from "./ViewEditSurveyForm";

/**
 * Survey component. Manage component logic.
 * @param {object} props survey object
 */
const Survey = ({ survey }) => {
	const [edit, setEdit] = useState(false);

	const renderContent = () => {
		let content = "";

		if (edit === true) {
			content = <ViewEditSurveyForm survey={survey} edit={true} handleEdit={setEdit} />;
		} else {
			content = <ViewEditSurveyForm survey={survey} edit={false} handleEdit={setEdit} />;
		}

		return content;
	};

	return renderContent();
};

export default Survey;
