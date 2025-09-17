import React, { useState } from "react";

import ViewEditShipForm from "./ViewEditShipForm";

/**
 * Ship component - Individual ship item container.
 *
 * This component serves as a wrapper for individual ship items in the ships list.
 * It manages the editing state for each ship and renders the appropriate form component.
 * The component acts as a stateful container that controls whether a ship is in view or edit mode.
 *
 * @component
 * @param {Object} ship - Ship object containing all ship data (id, name, datras_id, etc.)
 * @param {boolean} inSurveys - Whether this ship is currently used in any surveys
 * @returns {JSX.Element} The ship item with view/edit functionality
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
