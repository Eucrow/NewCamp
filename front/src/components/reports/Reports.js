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

  const handleSubmit = (e, endpointName, survey) => {
    e.preventDefault();
    setIsLoading(true);
    const apiReport = buildApiUrl(API_CONFIG.ENDPOINTS[endpointName](survey));
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

  const reportContent = (reportName, endpointName) => {
    return (
      <form className="wrapper form__row reportWrapper">
        <div className="form__cell">{reportName}</div>
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
                <option key={survey.id} value={survey.acronym}>
                  {survey.description}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form__cell">
          <UiButtonDownload
            handleMethod={e => handleSubmit(e, endpointName, selectedSurvey)}
            disabled={disableDownload}
          />
        </div>
      </form>
    );
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
            <>
              {reportContent("Fauna report:", "GET_REPORT_CAMP_FAUNA_CSV")}
              {reportContent("Hauls report:", "GET_REPORT_CAMP_HAULS_CSV")}
              {reportContent("Lengths report:", "GET_REPORT_CAMP_LENGTHS_CSV")}
              {reportContent("Species report:", "GET_REPORT_CAMP_SPECIES_CSV")}
            </>
          )}
        </div>
      </main>
    );
  };

  return renderContent();
};

export default Reports;
