import React, {useRef} from "react";

import UiButton from "./UiButton";

const UiButtonFile = ({
                          buttonText,
                          selectedFile,
                          onChange,
                          accept,
                          disabled = false,
                      }) => {
    const inputRef = useRef(null);

    const visibleText = selectedFile ? selectedFile.name : buttonText;

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                disabled={disabled}
                style={{display: "none"}}
                onChange={onChange}
                onClick={e => {
                    e.currentTarget.value = "";
                }}
            />

            <UiButton
                buttonText={visibleText}
                disabled={disabled}
                method={() => {
                    if (inputRef.current) {
                        inputRef.current.click();
                    }
                }}
            />
        </>
    );
};

export default UiButtonFile;