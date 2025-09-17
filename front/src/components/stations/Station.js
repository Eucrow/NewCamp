import React, { useState } from "react";

import ViewStation from "./ViewStation.js";
import EditStation from "./EditStation.js";

const Station = ({ station }) => {
  const [editStation, setEditStation] = useState(false);

  const renderContent = () => {
    if (editStation === false) {
      return (
        <div className="wrapper">
          <ViewStation station={station} handleEdit={setEditStation} />
        </div>
      );
    } else if (editStation === true) {
      return (
        <div className="wrapper">
          <EditStation station={station} handleEdit={setEditStation} />
        </div>
      );
    }
  };

  return renderContent();
};

export default Station;
