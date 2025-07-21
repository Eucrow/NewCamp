import React, { useState, useEffect } from "react";

import { useShipsCrud } from "../../hooks/useShipsCrud";

import ShipsContext from "../../contexts/ShipsContext";

import ShipsButtonBar from "./ShipsButtonBar";
import NewShipForm from "./NewShipForm";
import Ship from "./Ship";

/**
 * Component list of ships.
 * List of all the ships stored in database.
 */
const Ships = () => {
  const [adding, setAdding] = useState(false); // true to adding new ship; false to not to.

  const {
    ships,
    setShips,
    getShips,
    shipsInSurveys,
    fetchShipsInSurveys,
    createShip,
    updateShip,
    deleteShip,
  } = useShipsCrud();

  /**
   * Manage change in fields
   * @param {event} e - Event.
   * @param {numeric} ship_id - Identification number of the ship which fields are managed.
   */
  const handleChange = (e, ship_id) => {
    const name = e.target.name;
    const value = e.target.value;

    e.preventDefault();
    const newShips = ships.map(ship => {
      if (ship.id === ship_id) {
        var newShip = { ...ship };
        newShip[name] = value;
        return newShip;
      } else {
        return ship;
      }
    });

    setShips(newShips);
  };

  /**
   * Create ship in database and update the state.
   * @param {event} e - Event
   * @param {object} ship - Ship object to create.
   */
  const handleCreateShip = async (e, ship) => {
    e.preventDefault();
    await createShip(ship);
    setAdding(false); // Close the form after creating
  };

  useEffect(() => {
    getShips();
    fetchShipsInSurveys();
  }, []);

  return (
    <ShipsContext.Provider
      value={{
        handleChange: handleChange,
        setAdding: setAdding,
        createShip: handleCreateShip,
        updateShip: updateShip,
        deleteShip: deleteShip,
      }}
    >
      <main>
        <header>
          <h1 className="title">Ships</h1>
        </header>
        <div className="wrapper surveysWrapper">
          <ShipsButtonBar adding={adding} setAdding={setAdding} />

          {adding === true ? <NewShipForm /> : ""}

          {ships.map(ship => {
            const inSurveys = shipsInSurveys.some(s => s.id === ship.id);
            return <Ship key={ship.id} ship={ship} inSurveys={inSurveys} />;
          })}
        </div>
      </main>
    </ShipsContext.Provider>
  );
};

export default Ships;
