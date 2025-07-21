import React, { useState } from "react";

import ViewEditShipForm from "./ViewEditShipForm";

/**
 * Ship component. Manage component logic.
 * @param {object} props ship object
 */
const Ship = ({ ship, inSurveys }) => {
  const [editing, setEditing] = useState(false);

  return (
    <ViewEditShipForm
      ship={ship}
      editing={editing}
      setEditing={setEditing}
      inSurveys={inSurveys}
    />
  );
};

export default Ship;
