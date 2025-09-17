import React, { useState, useContext } from "react";

import { API_CONFIG, buildApiUrl } from "../../config/api";

import SelectedSurveyContext from "../../contexts/SelectedSuveryContext";
import UiButtonDownload from "../ui/UiButtonDownload";

const Reports = () => {
  const selectedSurveyContext = useContext(SelectedSurveyContext);

  // Add debugging to see what's in the context
  console.log("Selected Survey Context:", selectedSurveyContext);

  // Destructure the values from context with proper fallbacks
  const { selectedSurveyAcronym, selectedSurvey, selectedSurveyId } =
    selectedSurveyContext || {};

  // Add debugging for the actual values
  console.log("Selected Survey Acronym:", selectedSurveyAcronym);
  console.log("Selected Survey:", selectedSurvey);
  console.log("Selected Survey ID:", selectedSurveyId);

  const [disableDownload, setDisableDownload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e, endpointName, survey = null, filename) => {
    e.preventDefault();
    setIsLoading(true);

    const exportFilename = filename + ".csv" || "report.csv";

    // Handle endpoint calls with or without survey parameter
    const apiReport = buildApiUrl(
      survey
        ? API_CONFIG.ENDPOINTS[endpointName](survey)
        : API_CONFIG.ENDPOINTS[endpointName]()
    );

    // Add debugging to see the constructed URL
    console.log("API Report URL:", apiReport);
    console.log("Survey parameter:", survey);
    console.log("Endpoint name:", endpointName);

    fetch(apiReport)
      .then(response => {
        if (response.status > 400) {
          setIsLoading(false);
          alert("Something went wrong getting the report!!");
          return null;
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
        a.download = exportFilename; // You can set the filename here
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error downloading report:", error);
        alert("Failed to download report. Please try again.");
      });
  };

  const reportContent = (reportName, endpointName, needsSurvey = true) => {
    return (
      <form className="wrapper form__row reportWrapper">
        <div className="form__cell">{reportName}</div>

        <div className="form__cell">
          <UiButtonDownload
            handleMethod={
              needsSurvey
                ? e =>
                    handleSubmit(
                      e,
                      endpointName,
                      selectedSurveyAcronym,
                      API_CONFIG.FILENAMES[endpointName.split("GET_REPORT_")[1]]
                    )
                : e =>
                    handleSubmit(
                      e,
                      endpointName,
                      null,
                      API_CONFIG.FILENAMES[endpointName.split("GET_REPORT_")[1]]
                    )
            }
            disabled={disableDownload}
          />
        </div>
      </form>
    );
  };

  const renderContent = () => {
    if (selectedSurveyContext.selectedSurveyId === "") {
      const content = (
        <main>
          <header>
            <h1 className="title">Reports</h1>
          </header>
          <div>There is not survey selected</div>;
        </main>
      );
      return content;
    }

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
              {reportContent("Camp Fauna report:", "GET_REPORT_CAMP_FAUNA_CSV")}
              {reportContent("Camp Hauls report:", "GET_REPORT_CAMP_HAULS_CSV")}
              {reportContent(
                "Camp Lengths report:",
                "GET_REPORT_CAMP_LENGTHS_CSV"
              )}
              {reportContent(
                "Camp hydrography report:",
                "GET_REPORT_CAMP_HYDROGRAPHY_CSV"
              )}
              {reportContent(
                "Camp Species report:",
                "GET_REPORT_CAMP_SPECIES_CSV",
                false
              )}
            </>
          )}
        </div>
      </main>
    );
  };

  return renderContent();
};

export default Reports;
