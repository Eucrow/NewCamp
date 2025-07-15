import React, { useEffect, useState } from "react";

import { API_CONFIG, buildApiUrl } from "../../config/api";

import SurveysContext from "../../contexts/SurveysContext";

import SurveysButtonBar from "./SurveysButtonBar";
import Survey from "./Survey";
import NewSurveyForm from "./NewSurveyForm";

/**
 * Component list of surveys.
 * List of all the surveys stored in database.
 */
const Surveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [surveysBackup, setSurveysBackup] = useState([]);
  const [stratifications, setStratifications] = useState([]);
  const [add, setAdd] = useState(false);
  const [ships, setShips] = useState([]);

  const apiSurvey = buildApiUrl(API_CONFIG.ENDPOINTS.SURVEY);
  const apiStratifications = buildApiUrl(
    API_CONFIG.ENDPOINTS.GET_STRATIFICATIONS
  );
  const apiShips = buildApiUrl(API_CONFIG.ENDPOINTS.GET_SHIPS);

  /**
   * Manage change in fields of a previous created survey.
   * @param {event} e - Event.
   * @param {numeric} surveyId - Identification number of the survey which fields are managed.
   */
  const handleChange = (e, surveyId) => {
    const name = e.target.name;
    const value = e.target.value;

    e.preventDefault();
    const newSurveys = surveys.map(survey => {
      if (survey.id === surveyId) {
        let newSurvey = { ...survey };
        newSurvey[name] = value;
        return newSurvey;
      } else {
        return survey;
      }
    });

    setSurveys(newSurveys);
  };

  const handleChangeStratification = (e, surveyId) => {
    const value = e.target.value;
    e.preventDefault();

    const stratification = stratifications.find(st => {
      return st.id === Number(e.target.value);
    });

    const newSurveys = surveys.map(survey => {
      if (survey.id === surveyId) {
        let newSurvey = { ...survey };
        newSurvey["stratification"] = value;
        newSurvey["stratification_name"] = stratification.stratification;
        return newSurvey;
      } else {
        return survey;
      }
    });
    setSurveys(newSurveys);
  };

  const handleChangeShip = (e, shipId) => {
    const value = e.target.value;
    e.preventDefault();

    const ship = ships.find(s => {
      return s.id === Number(e.target.value);
    });

    const newSurveys = surveys.map(survey => {
      if (survey.id === shipId) {
        let newSurvey = { ...survey };
        newSurvey["ship"] = value;
        newSurvey["ship_name"] = ship.name;
        return newSurvey;
      } else {
        return survey;
      }
    });
    setSurveys(newSurveys);
  };
  /**
   * Get all surveys from database.
   */
  const getSurveys = () => {
    fetch(apiSurvey)
      .then(response => {
        if (response.status > 400) {
          alert("something were wrong getting the surveys!!");
        }
        return response.json();
      })
      .then(surveys => {
        setSurveys(surveys);
        setSurveysBackup(surveys);
      })
      .catch(error => console.log(error));
  };

  /**
   * Create survey in database and update the state.
   * @param {object} survey - Survey object to create.
   */
  const createSurvey = survey => {
    console.log("Creating survey:", JSON.stringify(survey));
    fetch(apiSurvey, {
      method: "POST",
      headers: API_CONFIG.HEADERS.DEFAULT,
      body: JSON.stringify(survey),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(survey => {
        const newSurveys = [...surveys, survey];

        setSurveys(newSurveys);
      })
      .catch(error => alert(error));
  };

  /**
   * Update survey from database and state.
   * @param {numeric} surveyId - Survey id of survey to update.
   */
  const updateSurvey = surveyId => {
    const api = apiSurvey + surveyId;

    const updatedSurvey = surveys.filter(survey => {
      return survey.id === surveyId;
    });

    fetch(api, {
      method: "PUT",
      headers: API_CONFIG.HEADERS.DEFAULT,
      body: JSON.stringify(updatedSurvey[0]),
    })
      .then(response => {
        if (response.status > 400) {
          alert("something were wrong updating the survey!!");
        }
        return response.json();
      })
      .catch(error => console.log(error));
  };

  /**
   * Restores the survey to its original state.
   * @param {number} surveyId - The ID of the haul to be restored.
   */

  const handleCancelEditSurvey = () => {
    setSurveys(surveysBackup);
  };

  /**
   * Delete survey from database and state.
   * @param {numeric} surveyId Survey identificator of survey to delete.
   */
  const deleteSurvey = surveyId => {
    const api = apiSurvey + surveyId;

    fetch(api, {
      method: "DELETE",
      headers: API_CONFIG.HEADERS.DEFAULT,
    })
      .then(() => {
        const newSurveys = surveys.filter(survey => survey.id !== surveyId);
        setSurveys(newSurveys);
      })
      .catch(error => alert(error));
  };

  /**
   * Get all stratifications.
   */
  const getStratifications = () => {
    return fetch(apiStratifications)
      .then(response => {
        if (response.status > 400) {
          alert("something were wrong getting the stratifications!!");
        }
        return response.json();
      })
      .then(stratifications => {
        setStratifications(stratifications);
      })
      .catch(error => console.log(error));
  };

  /**
   * Get ships.
   * @returns {Promise} Promise with the ships.
   * */
  const getShips = async () => {
    const shipsFetched = await fetch(apiShips)
      .then(response => {
        if (response.status > 400) {
          alert("something were wrong getting the ships!!");
        }
        return response.json();
      })
      .catch(error => console.log(error));
    setShips(shipsFetched);
  };

  // VALIDATIONS
  /**
   * Prevent 'e' and '-' in numeric input
   * @param {e} onKeyDown event
   */
  const preventNegativeE = e => {
    if (e.key === "e" || e.key === "-") {
      e.preventDefault();
    }
  };

  /**
   * Validate start date with end date
   * @param {event} e onChange event
   * @returns In case of error in date, show report validity.
   */
  const validateStartDate = (e, end_date) => {
    e.target.setCustomValidity("");

    if (typeof end_date != "undefined" && e.target.value > end_date) {
      e.target.setCustomValidity("Start date must be before the end date.");
    }

    return e.target.reportValidity();
  };

  /**
   * Validate end date with start date
   * @param {event} e onChange event.
   * @param {start_date} date Start date to compare with.
   * @returns In case of error in date, show report validity.
   */
  const validateEndDate = (e, start_date) => {
    e.target.setCustomValidity("");

    if (typeof start_date != "undefined" && start_date > e.target.value) {
      e.target.setCustomValidity("End date must be after the start date.");
    }

    return e.target.reportValidity();
  };

  /**
   * Force reportValidity() of an element.
   * Used with onInput event to show the validation messages in real time instead of show it when the form is submitted.
   * @param {e} e onInput event.
   */
  const forceReportValidity = e => {
    e.target.reportValidity();
  };

  useEffect(() => {
    getStratifications();
    getShips();
    getSurveys();
  }, []);

  /**
   * Create content to render.
   * @private
   */
  const renderContent = () => {
    let content;

    content = (
      <SurveysContext.Provider
        value={{
          apiSurvey: apiSurvey,
          handleChange: handleChange,
          handleChangeStratification: handleChangeStratification,
          handleChangeShip: handleChangeShip,
          add: add,
          setAdd: setAdd,
          createSurvey: createSurvey,
          updateSurvey: updateSurvey,
          deleteSurvey: deleteSurvey,
          stratifications: stratifications,
          ships: ships,
          preventNegativeE: preventNegativeE,
          validateStartDate: validateStartDate,
          validateEndDate: validateEndDate,
          forceReportValidity: forceReportValidity,
          handleCancelEditSurvey: handleCancelEditSurvey,
          getSurveys: getSurveys,
        }}
      >
        <main>
          <header>
            <h1 className="title">Surveys</h1>
          </header>

          <div className="wrapper surveysWrapper">
            <SurveysButtonBar add={add} handleAdd={setAdd} />
            {add === true ? <NewSurveyForm /> : ""}

            {surveys.map(survey => {
              return <Survey key={survey.id} survey={survey} />;
            })}
          </div>
        </main>
      </SurveysContext.Provider>
    );

    return content;
  };

  return renderContent();
};

export default Surveys;
