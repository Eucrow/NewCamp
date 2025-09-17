import React, { useState, useEffect, useContext } from "react";

import GlobalContext from "../../contexts/GlobalContext";
import SelectSurveyButton from "./UiSelectSurveyButton";
import UnselectSurveyButton from "./UiUnselectSurveyButton";

const SurveySelect = () => {
  const globalContext = useContext(GlobalContext);
  const { surveys } = globalContext;

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const ShowUnselectButton = () => {
    if (globalContext.surveySelector === null) {
      return null;
    } else {
      return <UnselectSurveyButton className="selectSurvey__row" />;
    }
  };

  return (
    <main>
      <header>
        <h1 className="title">Survey selection</h1>
      </header>
      <form className="wrapper selectSurvey">
        {surveys.map(s => {
          return (
            <div key={s.id} className="selectSurvey__row">
              <label className="selectSurvey__element" htmlFor={s.description}>
                {s.description}
              </label>
              <SelectSurveyButton
                survey_id={s.id}
                survey_description={s.description}
                survey_acronym={s.acronym}
              />
            </div>
          );
        })}
        <div className="selectSurvey__row">
          <ShowUnselectButton />
        </div>
      </form>
    </main>
  );
};

export default SurveySelect;
