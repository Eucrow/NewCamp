import React from "react";

import Hauls from "../hauls/Hauls";
import ViewEditStationForm from "./ViewEditStationForm";

const EditStation = ({ station, handleEdit, deleteHaul, createHaul }) => {
  return (
    <>
      <ViewEditStationForm
        station={station}
        handleEdit={handleEdit}
        edit={true}
      />
      <Hauls
        hauls={station.hauls}
        station_id={station.id}
        deleteHaul={deleteHaul}
        createHaul={createHaul}
      />
    </>
  );
};

export default EditStation;
