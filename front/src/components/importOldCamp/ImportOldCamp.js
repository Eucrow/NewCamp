/**
 * ImportOldCamp page component.
 *
 * Provides a guided UI to import historical CAMP survey data from legacy DBF files.
 * Workflow:
 * - User selects the main CAMP survey file; the component parses the survey code.
 * - Based on the parsed code, the user selects the required ancillary files (LANCE, FAUNA, NTALL, HIDRO).
 * - Client-side validation enforces exact file naming patterns and checks for survey duplication.
 * - On submit, files are posted as `multipart/form-data` to the backend import endpoint.
 */
import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import {API_CONFIG, buildApiUrl} from "../../config/api";
import ImportOldCampFile from "./importOldCampFile";
import FloatingError from "../ui/FloatingError";
import {useImportOldCampValidation} from "../../hooks/useImportOldCampValidation";
import {EMPTY_FILES, FILE_TYPES} from "./importOldCampConfig";
import GlobalContext from "../../contexts/GlobalContext";


/**
 * Parse a survey acronym from a CAMP filename.
 *
 * Locates the first digit in the filename and returns the 3‑character slice
 * composed of the letter immediately before the digit and the following two digits.
 * Accepts only codes that match `[NP]\d{2}` (case‑insensitive). Returns the
 * normalized uppercase code or `null` if not found/invalid.
 *
 * Parameters:
 * - `filename`: full filename including extension.
 *
 * Returns:
 * - Uppercase survey code string or `null`.
 */
function parseSurveyCodeFromCampFilename(filename) {
    const firstDigitIdx = filename.search(/\d/);
    if (firstDigitIdx <= 0) return null;
    const code = filename.substring(firstDigitIdx - 1, firstDigitIdx + 2);
    if (!/^[NP]\d{2}$/i.test(code)) return null;
    return code.toUpperCase();
}


/**
 * React component rendering the Import Old Camp form.
 *
 * State:
 * - `files`: currently selected File objects keyed by logical type.
 * - `messages`: user-facing status/info messages.
 * - `uploading`: submit in-flight flag to disable UI.
 * - `serverResponse`: raw text response from the backend after submission.
 *
 * Derived values:
 * - `surveyCode`: acronym parsed from the selected CAMP file name.
 * - `disableFileFields`: guards ancillary inputs until a valid survey file is chosen.
 */
const ImportOldCamp = () => {

    const globalContext = useContext(GlobalContext);
    const {setSurveys} = globalContext;

    const [files, setFiles] = useState({...EMPTY_FILES})

    const errorRefs = {
        survey: useRef(null),
        hauls: useRef(null),
        fauna: useRef(null),
        lengths: useRef(null),
        hydrographies: useRef(null),
    };


    const {
        isFormValid,
        validationErrors,
        fieldsValid,
        validateSurveyFileName,
        validateFileName,
        validateSurveyExists,
        resetFieldValidation,
    } = useImportOldCampValidation();

    const [messages, setMessages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [serverResponse, setServerResponse] = useState("");

    const surveyCode = useMemo(() => (files["survey"] ? parseSurveyCodeFromCampFilename(files["survey"].name) : null), [files["survey"]]);

    const disableFileFields = !fieldsValid.survey;


    const onSurveyChange = (e) => {
        const file = e.target.files && e.target.files[0];

        if (!file) {
            setFiles({...EMPTY_FILES});

            resetFieldValidation("survey");

            FILE_TYPES.forEach(type => {
                resetFieldValidation(type);
            })

            return;
        }

        const newSurveyCode = parseSurveyCodeFromCampFilename(file.name);

        // First validate filename format; then check if survey already exists so existence error isn't overwritten
        const isSurveyFileNameValid = validateSurveyFileName(file.name);

        if (isSurveyFileNameValid && newSurveyCode) {
            validateSurveyExists(newSurveyCode);

            FILE_TYPES.forEach(type => {
                if (files[type]) {
                    validateFileName(type, files[type].name, newSurveyCode);
                }
            })
        }

        if (!isSurveyFileNameValid || !newSurveyCode) {
            FILE_TYPES.forEach(resetFieldValidation);
            setFiles(prevState => ({
                ...prevState,
                survey: file,
                hauls: null,
                fauna: null,
                lengths: null,
                hydrographies: null,
            }));
            setServerResponse("");
            setMessages([]);
            return;
        }

        setFiles(prevState => ({...prevState, survey: file || null}));
        setServerResponse("");
        setMessages([]);
    };

    const onInputFileChange = (e, key) => {
        const file = e.target.files && e.target.files[0];

        if (!file) {
            setFiles(prevState => ({...prevState, [key]: null}));
            resetFieldValidation(key)
            return;
        }

        const isValid = validateFileName(key, file.name, surveyCode);

        setFiles(prevState => ({
            ...prevState,
            [key]: isValid ? file : null
        }));

        setServerResponse("");
        setMessages([]);
    }

    const onImport = async (e) => {
        e.preventDefault();
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
                const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.GET_SURVEYS));
                const updatedSurveys = await response.json();
                setSurveys(updatedSurveys);
            }
        } catch (err) {
            setMessages([`Error sending import: ${err.message}`]);
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        ["survey", ...FILE_TYPES].forEach(type => {
            const input = errorRefs[type]?.current;

            if (!input) {
                return;
            }

            input.setCustomValidity(validationErrors[type] || "");
        });
    }, [validationErrors]);


    return (
        <main>
            <header>
                <h1 className="title">Import Old Camp files</h1>
            </header>
            <div className="wrapper importOldCampWrapper">
                <div className="importOldCamp__introduction">
                    Select the files of old CAMP (CAMP, LANCE, FAUNA, NTALL, HIDRO).
                </div>
                <form onSubmit={onImport}>
                    <div className="importOldCamp__row">
                        <label className="importOldCamp__cell">
                            Survey file (CAMPN25, CAMPP15...):
                        </label>
                        <input
                            className="importOldCamp__cell--right"
                            type="file"
                            onChange={onSurveyChange}
                            ref={errorRefs["survey"]}
                        />
                        <FloatingError
                            message={validationErrors["survey"]}
                            show={!!validationErrors["survey"]}
                            inputRef={errorRefs["survey"]}
                        />
                    </div>

                    {FILE_TYPES.map(type => (
                        <ImportOldCampFile
                            key={type}
                            fileType={type}
                            disabled={disableFileFields}
                            anchorRef={errorRefs[type]}
                            onChangeMethod={(e) => onInputFileChange(e, type)}
                            validationError={validationErrors[type]}
                        />
                    ))}

                    {fieldsValid.survey && surveyCode && (
                        <div className="importOldCamp__introduction">
                            Detected survey code: <b>{surveyCode}</b>
                        </div>
                    )}

                    <div className="importOldCamp__introduction">
                        <button type="submit" disabled={!isFormValid || uploading}>
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
                            <div>{serverResponse}</div>
                        </div>
                    )}

                </form>
            </div>

        </main>
    );
};

export default ImportOldCamp;
