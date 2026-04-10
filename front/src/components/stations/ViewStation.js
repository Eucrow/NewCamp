import React from "react";

import Hauls from "../hauls/Hauls";
import ViewEditStationForm from "./ViewEditStationForm";

const ViewStation = ({ station, handleEdit }) => {
  return (
    <>
      <ViewEditStationForm
        station={station}
        handleEdit={handleEdit}
        edit={false}
      />
      <Hauls hauls={station.hauls} stationId={station.id} />
    </>
  );
};

export default ViewStation;
