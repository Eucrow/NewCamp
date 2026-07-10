import React, {useRef} from "react";


const UiButtonFile = ({
                          buttonText,
                          selectedFile,
                          onChange,
                          accept,
                          disabled = false,
                          inputRef = null,
                      }) => {


    const fileInputRef = useRef(inputRef);


    const visibleText = selectedFile ? selectedFile.name : buttonText;

    return (
        <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            disabled={disabled}
            onChange={onChange}
            onClick={e => {
                e.currentTarget.value = "";
            }}
        />

    );
};

export default UiButtonFile;