import React from "react";
import FloatingError from "../ui/FloatingError";
import {FILE_PREFIX} from "./importOldCampConfig";


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