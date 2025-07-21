import { useState, useEffect, useCallback, useContext } from "react";
import ShipsContext from "../contexts/ShipsContext";

/**
 * Custom hook for handling form validation for ships.
 */
export const useShipsValidation = newShip => {
  // State to hold all validation-related values
  const [validationState, setValidationState] = useState({
    isFormValid: false,
    errors: {
      existsShip: "",
    },
    existsShip: false,
    areRequiredFieldsValid: false,
  });

  const shipsContext = useContext(ShipsContext);

  /**
   * Validates that all required fields are filled.
   * Checks group, species, category and weight.
   *
   * @returns {boolean} Whether all required fields are valid
   */
  const validateRequiredFields = useCallback(() => {
    const requiredFields = {
      name: newShip.name || null,
    };

    const isValid = Object.values(requiredFields).every(
      value => value !== null && value !== ""
    );

    setValidationState(prev => ({
      ...prev,
      areRequiredFieldsValid: isValid,
    }));

    return isValid;
  }, [newShip.name]);

  /**
   * Validate if ship already exists.
   * @returns {boolean} Whether the ship already exists.
   */
  const validateShipExists = useCallback(() => {
    const filteredShips = shipsContext.ships.filter(
      ship => ship.id !== newShip.id
    );

    const existsShip = filteredShips.some(ship => ship.name === newShip.name);

    setValidationState(prev => ({
      ...prev,
      existsShip: existsShip,
      errors: {
        ...prev.errors,
        existsShip: existsShip ? "A ship with this name already exists." : "",
      },
    }));

    return existsShip;
  }, [newShip.name, shipsContext.ships]);

  useEffect(() => {
    validateRequiredFields();
  }, [newShip.name, newShip.ship]);

  useEffect(() => {
    validateShipExists();
  }, [newShip.name]);

  // Effect hook that handles form validation on every change.
  useEffect(() => {
    const isValid =
      validationState.areRequiredFieldsValid && !validationState.existsShip;

    setValidationState(prev => ({
      ...prev,
      isFormValid: isValid,
    }));
  }, [validationState.areRequiredFieldsValid, validationState.existsShip]);

  return {
    isFormValid: validationState.isFormValid,
    validationErrors: validationState.errors,
    existsShip: validationState.existsShip,
  };
};
