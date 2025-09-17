import React, { useState, useEffect } from "react";

import { useShipsCrud } from "../../hooks/useShipsCrud";

import ShipsContext from "../../contexts/ShipsContext";

import ShipsButtonBar from "./ShipsButtonBar";
import NewShipForm from "./NewShipForm";
import Ship from "./Ship";

/**
 * Ships component - Main container for ship management functionality.
 *
 * This component serves as the primary interface for managing ships in the system.
 * It provides a complete CRUD interface that allows users to view, create, edit, and delete ships.
 * The component displays all ships in a list format and includes a form for adding new ships.
 * It also checks which ships are currently in use by surveys to prevent deletion of active ships.
 *
 * Features:
 * - Displays all ships stored in the database
 * - Toggle form for adding new ships
 * - Real-time field editing for ship properties
 * - Integration with surveys to show ship usage status
 * - Context-based state management for child components
 *
 * @component
 * @returns {JSX.Element} The complete ships management interface
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
    restoreShipsState,
  } = useShipsCrud();

  /**
   * Handles input field changes for ship data.
   * Updates the ship properties in real-time as user types.
   *
   * @function handleChange
   * @param {Event} e - The input change event
   * @param {number} ship_id - ID of the ship being modified
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
   * Creates a new ship in the database.
   * Waits for the API call to complete before closing the form.
   *
   * @function handleCreateShip
   * @param {Event} e - The form submit event
   * @param {Object} ship - Ship data object to create
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
        ships: ships,
        setAdding: setAdding,
        handleChange: handleChange,
        createShip: handleCreateShip,
        updateShip: updateShip,
        deleteShip: deleteShip,
        restoreShipsState: restoreShipsState,
      }}
    >
      <main>
        <header>
          <h1 className="title">Ships</h1>
        </header>
        <div className="wrapper shipsWrapper">
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
