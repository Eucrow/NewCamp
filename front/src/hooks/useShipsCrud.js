import { useState, useCallback } from "react";

import shipService from "../services/shipService";

/**
 * Custom hook for managing ships CRUD operations.
 *
 * Provides state management and API operations for ships.
 * Handles create, read, update, and delete operations for ships with proper error handling.
 *
 * @returns {Object} Hook object containing:
 * - ships: Array of all ships
 * - shipsBackup: Backup array of ships for restoration
 * - getShips: Function to fetch all ships
 * - setShips: Function to manually update ships state
 * - createShip: Function to create a new ship
 * - updateShip: Function to update an existing ship
 * - deleteShip: Function to delete a ship
 */
export const useShipsCrud = () => {
  const [ships, setShips] = useState([]);
  const [shipsBackup, setShipsBackup] = useState([]);
  const [shipsInSurveys, setShipInSurveys] = useState([]);

  /**
   * Fetches all ships from the database and updates both ships and shipsBackup state.
   *
   * @function getShips
   * @returns {void} No return value, updates state directly
   * @throws {Error} Shows alert with error message if fetch fails
   */
  const getShips = useCallback(async () => {
    try {
      const ships = await shipService.getShips();
      setShips(ships);
      setShipsBackup(ships);
    } catch (error) {
      alert(`Error fetching ships: ${error.message}`);
      console.error(error);
    }
  }, []);

  /**
   * Creates a new ship in the database and updates the local state.
   * Cleans empty values from the ship object before sending to API.
   *
   * @function createShip
   * @param {Object} ship - Ship object to create with all necessary properties
   * @returns {void} No return value, updates state directly on success
   * @throws {Error} Shows alert with error message if creation fails
   */
  const createShip = useCallback(async ship => {
    try {
      const newShip = await shipService.createShip(ship);
      setShips(prevShips => [...prevShips, newShip]);
      setShipsBackup(prevShips => [...prevShips, newShip]);
    } catch (error) {
      alert(`Error creating ship: ${error.message}`);
      console.error(error);
    }
  }, []);

  /**
   * Updates an existing ship in the database and local state.
   * Finds the ship by ID from the current ships state and sends it to the API.
   *
   * @function updateShip
   * @param {number} shipId - Unique identifier of the ship to update
   * @returns {Promise<void>} Promise that resolves when ship is updated
   * @throws {Error} Shows alert with error message if update fails
   */
  const updateShip = useCallback(
    async shipId => {
      const shipToUpdate = ships.find(ship => ship.id === shipId);

      if (!shipToUpdate) {
        alert("Ship not found");
        return;
      }

      try {
        const updatedShip = await shipService.updateShip(shipId, shipToUpdate);

        // Update both ships and shipsBackup states
        setShips(prevShips =>
          prevShips.map(ship => (ship.id === shipId ? updatedShip : ship))
        );
        setShipsBackup(prevBackup =>
          prevBackup.map(ship => (ship.id === shipId ? updatedShip : ship))
        );
      } catch (error) {
        alert(`Error updating ship: ${error.message}`);
        console.error(error);
      }
    },
    [ships]
  );

  /**
   * Deletes a ship from the database and removes it from local state.
   * Removes the ship from both ships and shipsBackup arrays.
   *
   * @function deleteShip
   * @param {number} shipId - Unique identifier of the ship to delete
   * @returns {Promise<void>} Promise that resolves when ship is deleted
   * @throws {Error} Shows alert with error message if deletion fails
   */
  const deleteShip = useCallback(async shipId => {
    try {
      await shipService.deleteShip(shipId);

      setShips(prevShips => prevShips.filter(ship => ship.id !== shipId));
      setShipsBackup(prevBackup =>
        prevBackup.filter(ship => ship.id !== shipId)
      );
    } catch (error) {
      alert(`Error deleting ship: ${error.message}`);
      console.error(error);
    }
  }, []);

  const fetchShipsInSurveys = useCallback(async () => {
    try {
      const response = await shipService.getShipsInSurvey();

      setShipInSurveys(response);
    } catch (error) {
      alert(`Error fetching ships in surveys: ${error.message}`);
      console.error(error);
    }
  }, []);

  return {
    ships,
    getShips,
    setShips,
    shipsBackup,
    shipsInSurveys,
    fetchShipsInSurveys,
    createShip,
    updateShip,
    deleteShip,
  };
};
