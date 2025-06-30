import React, { useState, useContext } from "react";

import { API_CONFIG, buildApiUrl } from "../../config/api";

import GlobalContext from "../../contexts/GlobalContext";
import UiButtonDownload from "../ui/UiButtonDownload";

const Reports = () => {
  const globalContext = useContext(GlobalContext);
  const surveys = globalContext.surveys;

  const [selectedSurvey, setSelectedSurvey] = useState("");
  const [disableDownload, setDisableDownload] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    const apiReport = buildApiUrl(
      API_CONFIG.ENDPOINTS.GET_REPORTS_CSV(selectedSurvey)
    );
    //TODO: convert this to a custom hook
    fetch(apiReport)
      .then(response => {
        if (response.status > 400) {
          setIsLoading(false);
          alert("something were wrong getting the report!!");
        }
        return response.blob();
      })
      .then(blob => {
        if (!blob) {
          setIsLoading(false);
          return;
        }
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "report.csv"; // You can set the filename here
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url); // Clean up the URL object
        setIsLoading(false); // Set loading to false after download is triggered
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const renderContent = () => {
    return (
      <main>
        <header>
          <h1 className="title">Reports</h1>
        </header>
        <div className="wrapper">
          {isLoading ? (
            <p>Creating file... Please wait.</p>
          ) : (
            <form className="wrapper form__row reportWrapper">
              <div className="form__cell">Lengths report:</div>
              <div className="form__cell">
                <select
                  type="select"
                  id="report"
                  name="report"
                  value={selectedSurvey}
                  required
                  onChange={e => {
                    setSelectedSurvey(e.target.value);
                    setDisableDownload(false);
                  }}
                >
                  <option value="" disabled>
                    Select survey
                  </option>
                  {surveys.map(survey => {
                    return (
                      <option key={survey.id} value={survey.id}>
                        {survey.description}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form__cell">
                <UiButtonDownload
                  handleMethod={handleSubmit}
                  disabled={disableDownload}
                />
              </div>
            </form>
          )}
        </div>
      </main>
    );
  };

  return renderContent();
};

export default Reports;
