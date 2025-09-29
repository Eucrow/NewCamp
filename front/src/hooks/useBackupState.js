import { useState, useCallback, useRef } from "react";

/**
 * Custom React hook that provides state management with backup/restore functionality.
 * Useful for forms, editors, or any component where you need to track changes and
 * provide undo/revert capabilities.
 *
 * @param {any} [initialValue={}] - The initial value for the state
 * @returns {Object} An object containing state management functions and values
 * @returns {any} returns.value - The current state value
 * @returns {Function} returns.setValue - Function to update the current state value
 * @returns {Function} returns.createBackup - Function to create a backup of the current state
 * @returns {Function} returns.restoreFromBackup - Function to restore state from the backup
 * @returns {Function} returns.getBackup - Function to get the current backup value (read-only)
 * @returns {Function} returns.hasChanges - Function that returns true if current value differs from backup
 *
 * @example
 * // Basic usage
 * const { value, setValue, createBackup, restoreFromBackup, hasChanges } = useBackupState({
 *   name: '',
 *   email: ''
 * });
 *
 * // Update state
 * setValue({ name: 'John', email: 'john@example.com' });
 *
 * // Create backup before making changes
 * createBackup();
 *
 * // Make more changes
 * setValue(prev => ({ ...prev, name: 'Jane' }));
 *
 * // Check if there are unsaved changes
 * if (hasChanges()) {
 *   console.log('You have unsaved changes');
 * }
 *
 * // Restore to backup if needed
 * restoreFromBackup();
 */
export const useBackupState = (initialValue = {}) => {
  const [value, setValue] = useState(initialValue);
  const backupRef = useRef(initialValue);

  /**
   * Deep clone utility to avoid reference issues when copying objects.
   * Uses JSON.parse/stringify for simplicity but has limitations with functions,
   * undefined values, symbols, and circular references.
   *
   * @param {any} obj - The object to clone
   * @returns {any} A deep clone of the input object
   */
  const deepClone = useCallback(obj => {
    return JSON.parse(JSON.stringify(obj));
  }, []);

  /**
   * Updates the main state value. Supports both direct values and updater functions.
   *
   * @param {any|Function} newValue - The new value or an updater function that receives
   *                                  the previous value and returns the new value
   *
   * @example
   * // Direct value update
   * updateValue({ name: 'John', age: 30 });
   *
   * // Functional update
   * updateValue(prev => ({ ...prev, age: prev.age + 1 }));
   */
  const updateValue = useCallback(newValue => {
    if (typeof newValue === "function") {
      setValue(prevValue => {
        const updatedValue = newValue(prevValue);
        return updatedValue;
      });
    } else {
      setValue(newValue);
    }
  }, []);

  /**
   * Creates a backup of the current state value. This snapshot can be restored later
   * using restoreFromBackup(). Call this before making changes you might want to revert.
   *
   * @example
   * // Create backup before editing
   * createBackup();
   * setValue({ name: 'Temporary Name' });
   * // Later, can restore with restoreFromBackup()
   */
  const createBackup = useCallback(() => {
    setValue(currentValue => {
      backupRef.current = deepClone(currentValue);
      return currentValue;
    });
  }, [deepClone]);

  /**
   * Restores the state to the last created backup. If no backup has been created,
   * restores to the initial value provided when the hook was instantiated.
   *
   * @example
   * // After making changes you want to revert
   * restoreFromBackup();
   */
  const restoreFromBackup = useCallback(() => {
    setValue(deepClone(backupRef.current));
  }, [deepClone]);

  /**
   * Returns the current backup value without modifying it. Useful for comparing
   * or displaying the backup state without affecting the backup itself.
   *
   * @returns {any} The current backup value (read-only reference)
   *
   * @example
   * const backupData = getBackup();
   * console.log('Backup contains:', backupData);
   */
  const getBackup = useCallback(() => {
    return backupRef.current;
  }, []);

  /**
   * Checks if the current state value differs from the backup value.
   * Uses JSON.stringify for comparison, so it works with nested objects but
   * may not detect differences in function properties or object references.
   *
   * @returns {boolean} true if current value differs from backup, false otherwise
   *
   * @example
   * if (hasChanges()) {
   *   // Show "You have unsaved changes" warning
   *   // or enable/disable save button
   * }
   */
  const hasChanges = useCallback(() => {
    return JSON.stringify(value) !== JSON.stringify(backupRef.current);
  }, [value]);

  return {
    value,
    setValue: updateValue,
    createBackup,
    restoreFromBackup,
    getBackup,
    hasChanges,
  };
};
