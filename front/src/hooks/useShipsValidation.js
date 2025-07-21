import { useState, useEffect, useCallback, useContext } from "react";
import ShipsContext from "../contexts/ShipsContext";

/**
 * useShipsValidation - Custom hook for ships form validation.
 *
 * This hook provides comprehensive validation functionality for ship forms,
 * including both new ship creation and existing ship editing. It validates
 * required fields, checks for duplicate ship names, and provides real-time
 * validation feedback with appropriate error messages.
 *
 * Features:
 * - Required field validation (ship name)
 * - Duplicate ship name detection
 * - Real-time validation state updates
 * - Comprehensive error messaging
 * - Integration with ships context for data access
 *
 * @hook
 * @param {Object} newShip - The ship object being validated
 * @returns {Object} Validation state containing isFormValid, validationErrors, existsShip
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
   * Validates required fields are populated.
   *
   * @function validateRequiredFields
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
   * Validates if a ship with the same name already exists.
   *
   * @function validateShipExists
   * @returns {boolean} Whether the ship already exists
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
