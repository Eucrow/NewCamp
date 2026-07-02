import React from "react";
import FloatingError from "../ui/FloatingError";
import {FILE_PREFIX} from "./importOldCampConfig";

/**
 * Presentational row for selecting a single legacy DBF file associated with a survey import.
 *
 * Props:
 * - `fileType` ("hauls" | "fauna" | "lengths" | "hydrographies"): logical type used to
 *   build the label and to associate validation/error state.
 * - `disabled` (boolean): when true, disables the file input until a valid survey file is chosen.
 * - `anchorRef` (React.RefObject<HTMLInputElement>): reference to the input used by `FloatingError`
 *   to position and assign `setCustomValidity` messages.
 * - `onChangeMethod` ((e: React.ChangeEvent<HTMLInputElement>) => void): change handler invoked
 *   when the user selects a file.
 * - `validationError` (string): error message to display and attach as custom validity.
 */
const ImportOldCampFile = ({fileType, disabled = true, anchorRef, onChangeMethod, validationError}) => {

    const labelInput = fileType.charAt(0).toUpperCase() +
        fileType.slice(1) +
        " file ("
        + FILE_PREFIX[fileType] +
        "N25.DBF, " +
        FILE_PREFIX[fileType] + "P15.DBF...):"

    return (
        <div className="importOldCamp__row">
            <label className="importOldCamp__cell">
                {labelInput}
            </label>
            <input
                className="importOldCamp__cell--right"
                type="file"
                disabled={disabled}
                onChange={onChangeMethod}
                ref={anchorRef}
            />
            <FloatingError
                message={validationError}
                show={!!validationError}
                inputRef={anchorRef}
            />

        </div>
    )

}

export default ImportOldCampFile;