import React from "react";
import FloatingError from "../ui/FloatingError";

const ImportOldCampFile = ({fileType, disabled = true, anchorRef, onChangeMethod, validationError}) => {
    const labelInput = fileType.charAt(0).toUpperCase() + fileType.slice(1) + " file (" + fileType + "N25.DBF" + fileType + "P15.DBF...):"

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
                disabled={disabled}
            />

        </div>
    )

}

export default ImportOldCampFile;