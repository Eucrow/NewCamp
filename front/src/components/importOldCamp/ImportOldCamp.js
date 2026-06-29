import React, {useEffect, useMemo, useRef, useState} from "react";
import {API_CONFIG, buildApiUrl} from "../../config/api";
import ImportOldCampFile from "./importOldCampFile";


function parseSurveyCodeFromCampFilename(filename) {
    // Extract like N18 or P21 from names such as CAMPN18.dbf, CAMP_N18.DBF, CAMP-N18.csv
    // Backend logic finds first digit and takes (digitIndex-1 .. digitIndex+2)
    const firstDigitIdx = filename.search(/\d/);
    if (firstDigitIdx <= 0) return null;
    const code = filename.substring(firstDigitIdx - 1, firstDigitIdx + 2); // e.g., N18
    if (!/^[NP]\d{2}$/i.test(code)) return null;
    return code.toUpperCase();
}


const ImportOldCamp = () => {

    const [files, setFiles] = useState([{
        hauls: null,
        fauna: null,
        lengths: null,
        hydrographies: null,
    }])

    const [messages, setMessages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [serverResponse, setServerResponse] = useState("");

    const surveyCode = useMemo(() => (files["survey"] ? parseSurveyCodeFromCampFilename(files["survey"].name) : null), [files["survey"]]);

    const filePrefix = {survey: "CAMP", hauls: "LANCE", fauna: "FAUNA", lengths: "NTALL", hydrographies: "HIDRO"};

    const [validationErrors, setValidationErrors] = useState({})
    const [fieldsValid, setFieldValidState] = useState({
        survey: false,
        hauls: false,
        fauna: false,
        lengths: false,
        hydrographies: false
    });

    const setFieldValid = (key, valid) => {
        setFieldValidState(prevState => ({
            ...prevState,
            [key]: valid
        }));
    }

    const isFormValid = useMemo(() => {
        return Object.values(fieldsValid).every(value => value === true);
    }, [fieldsValid]);

    const [disableFileFields, setDisableFileFields] = useState(true)

    useEffect(() => {
        if (files["survey"]) {
            setDisableFileFields(false)
        } else {
            setDisableFileFields(true)
        }
    })

    let haulsErrorAnchorRef = useRef(null);
    let faunaErrorAnchorRef = useRef(null);
    let lengthsErrorAnchorRef = useRef(null);
    let hydrographiesErrorAnchorRef = useRef(null);

    useEffect(() => {
        if (haulsErrorAnchorRef.current) {
            haulsErrorAnchorRef.current.setCustomValidity(fieldsValid.hauls ? "" : "The hauls file must be named as LANCEN25.DBF");
        }
        if (faunaErrorAnchorRef.current) {
            faunaErrorAnchorRef.current.setCustomValidity(fieldsValid.fauna ? "" : "The fauna file must be named as FAUNAN25.DBF");
        }
        if (lengthsErrorAnchorRef.current) {
            lengthsErrorAnchorRef.current.setCustomValidity(fieldsValid.lengths ? "" : "The lengths file must be named as NTALLN25.DBF");
        }
        if (hydrographiesErrorAnchorRef.current) {
            hydrographiesErrorAnchorRef.current.setCustomValidity(fieldsValid.hydrographies ? "" : "The hydrographies file must be named as HIDRON25.DBF");
        }
    }, [fieldsValid.hauls, fieldsValid.fauna, fieldsValid.lengths, fieldsValid.hydrographies,])

    const validateSurveyFileName = (fileName) => {
        const expectedRegex = new RegExp(`^${filePrefix.survey}[a-zA-Z0-9]{3}.DBF`, "i");
        const isValid = expectedRegex.test(fileName);
        setFieldValid("survey", isValid);
        // parseSurveyCodeFromCampFilename(fileName);
        return isValid;
    }

    const validateFileName = (key, fileName, code = surveyCode) => {
        const expectedItem = filePrefix[key] + code + ".DBF";
        const expectedRegex = new RegExp(`^${expectedItem}$`, "i")
        const isValid = expectedRegex.test(fileName);

        setFieldValid(key, isValid);
        return isValid;
    }

    const onSurveyChange = (e) => {
        const file = e.target.files && e.target.files[0];

        if (!file) {
            setFiles(prevState => ({...prevState, survey: null}));
            return;
        }

        const newSurveyCode = parseSurveyCodeFromCampFilename(file.name);

        validateSurveyFileName(file.name);

        if (files["haulsFile"]) {
            validateFileName("hauls", files["haulsFile"].name, newSurveyCode);
        }
        if (files["faunaFile"]) {
            validateFileName("fauna", files["faunaFile"].name, newSurveyCode);
        }
        if (files["lengthsFile"]) {
            validateFileName("lengths", files["lengthsFile"].name, newSurveyCode);
        }
        if (files["hydrographiesFile"]) {
            validateFileName("hydrographies", files["hydrographiesFile"].name, newSurveyCode);
        }

        setFiles(prevState => ({...prevState, survey: file || null}));
        setServerResponse("");
        setMessages([]);
    };


    const onInputFileChange = (e, key) => {
        const file = e.target.files && e.target.files[0];

        if (!file) {
            setFiles(prevState => ({...prevState, [key]: null}));
            return;
        }

        const isValid = validateFileName(key, file.name);

        setFiles(prevState => ({
            ...prevState,
            [key]: isValid ? file : null
        }));

        setValidationErrors(prevState => ({
            ...prevState,
            [key]: isValid ? "" : `The ${key} file must be named like ${filePrefix[key]}${surveyCode}.DBF`
        }));

        setServerResponse("");
        setMessages([]);
    }

    const onImport = async () => {
        setServerResponse("");

        try {
            setUploading(true);
            const form = new FormData();
            // Attach the exact files under the expected field keys
            // Ensure we use the user-selected CAMP file object (to respect their choice)
            form.append("survey", files["survey"]);
            form.append("hauls", files["hauls"]);
            form.append("fauna", files["fauna"]);
            form.append("lengths", files["lengths"]);
            form.append("hydrographies", files["hydrographies"]);

            const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.IMPORT_CAMP_FILE), {
                method: "PUT",
                body: form,
            });

            const text = await res.text();
            setServerResponse(text || (res.ok ? "Import completed (no response body)." : "Import failed."));
            if (!res.ok) {
                setMessages([`Server returned status ${res.status}. Check the response below.`]);
            } else {
                setMessages(["Import request sent successfully. Review the server response below."]);
            }
        } catch (err) {
            setMessages([`Error sending import: ${err.message}`]);
        } finally {
            setUploading(false);
        }
    };

    return (
        <main>
            <header>
                <h1 className="title">Import Old Camp files</h1>
            </header>
            <div className="wrapper importOldCampWrapper">
                <div className="importOldCamp__introduction">
                    Select the files of old CAMP (CAMP, LANCE, FAUNA, NTALL, HIDRO).
                </div>
                <form>
                    <div className="importOldCamp__row">
                        <label className="importOldCamp__cell">
                            Survey file (CAMPN25, CAMPP15...):
                        </label>
                        <input
                            className="importOldCamp__cell--right"
                            type="file"
                            onChange={onSurveyChange}
                        />

                    </div>
                    <ImportOldCampFile key="hauls"
                                       disabled={disableFileFields}
                                       anchorRef={haulsErrorAnchorRef}
                                       onChangeMethod={(e) => onInputFileChange(e, "hauls")}
                                       validationError={validationErrors["hauls"] ? [validationErrors["hauls"]] : null}/>
                    <ImportOldCampFile key="fauna"
                                       disabled={disableFileFields}
                                       anchorRef={faunaErrorAnchorRef}
                                       onChangeMethod={(e) => onInputFileChange(e, "fauna")}
                                       validationError={validationErrors["fauna"] ? [validationErrors["fauna"]] : null}/>
                    <ImportOldCampFile key="lengths"
                                       disabled={disableFileFields}
                                       anchorRef={lengthsErrorAnchorRef}
                                       onChangeMethod={(e) => onInputFileChange(e, "lengths")}
                                       validationError={validationErrors["lengths"] ? [validationErrors["lengths"]] : null}/>
                    <ImportOldCampFile key="hydrographies"
                                       disabled={disableFileFields}
                                       anchorRef={hydrographiesErrorAnchorRef}
                                       onChangeMethod={(e) => onInputFileChange(e, "hydrographies")}
                                       validationError={validationErrors["hydrographies"] ? [validationErrors["hydrographies"]] : null}/>

                    {surveyCode && (
                        <div className="importOldCamp__introduction">
                            Detected survey code from CAMP filename: <b>{surveyCode}</b>
                        </div>
                    )}

                    <div className="importOldCamp__introduction">
                        <button onClick={onImport} disabled={!isFormValid || uploading}>
                            {uploading ? "Importing..." : "Import"}
                        </button>
                    </div>

                    {messages.length > 0 && (
                        <div className="importOldCamp__introduction">
                            {messages.map((m, i) => (
                                <div key={i}>{m}</div>
                            ))}
                        </div>
                    )}

                    {serverResponse && (
                        <div className="importOldCamp__introduction">
                            <div>Server response</div>
                            <pre>{serverResponse}</pre>
                        </div>
                    )}

                </form>
            </div>

        </main>
    );
};

export default ImportOldCamp;
