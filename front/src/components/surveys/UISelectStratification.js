import React, { useContext, Fragment } from "react";

import SurveysContext from "../../contexts/SuverysContext";

const SelectStratification = () => {
  const surveysContext = useContext(SurveysContext);

  const renderContent = ({ props }) => {
    const content = "";

    content = (
      <Fragment>
        <label htmlFor="stratification">Stratification:</label>
        <select
          id="stratification"
          name="stratification"
          onChange={props.handleChangeNew}
        >
          <option />

          {surveysContext.stratifications.map((st, idx) => {
            return (
              <option value={st.id} key={idx}>
                {st.id} - {st.stratification}
              </option>
            );
          })}
        </select>
      </Fragment>
    );

    return content;
  };

  return renderContent();
};

export default SelectStratification;
