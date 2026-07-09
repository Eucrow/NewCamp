import React, {useEffect, useMemo, useRef, useState} from "react";
import {API_CONFIG, buildApiUrl} from "../../config/api";
import ImportOldCampFile from "./importOldCampFile";
import FloatingError from "../ui/FloatingError";
import {useImportOldCampValidation} from "../../hooks/useImportOldCampValidation";
import {EMPTY_FILES, FILE_TYPES} from "./importOldCampConfig";


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
 * ImportOldCamp React component – Import form for legacy CAMP survey files.
 *
 * This component allows users to upload primary and ancillary CAMP-related DBF files,
 * validates filenames and survey existence, and submits the package to the backend for import.
 *
 * State and Hooks:
 * - `files`: An object storing currently selected File objects for each supported type (survey, hauls, fauna, lengths, hydrographies).
 * - `importErrors`: Stores top-level import error messages (from the backend) to display to users.
 * - `importMessages`: Stores import status/info/warning messages (from the backend or validation) for user feedback.
 * - `uploading`: Boolean flag indicating if a submission is in progress, to disable UI elements appropriately.
 * - `errorRefs`: Refs for each file input, used for native validation and error tooltips placement.
 *
 * Validation logic (via useImportOldCampValidation):
 * - `isFormValid`: Boolean derived from per-field and survey-existence validation; guards submit enabled state.
 * - `validationErrors`: Tracks human-readable error details for each input for UI display.
 * - `fieldsValid`: Boolean object indicating which file inputs (by key) are currently valid.
 * - `validateSurveyFileName`, `validateFileName`: Functions used to validate selected file names against expected patterns.
 * - `validateSurveyExists`: Checks if a survey (parsed from filename) is already present.
 * - `resetFieldValidation`: Clears validation state for a particular file input.
 *
 * Derived Values:
 * - `surveyCode`: Acronym/code parsed from the uploaded survey file name, used as the base for ancillary filename validation.
 * - `disableFileFields`: Guards ancillary (non-survey) inputs until a valid survey file is selected.
 *
 * Core Event Handlers:
 * - `onSurveyChange`: Handler for the primary survey file input. Triggers filename and survey existence validation and resets or updates the state according to selection and parsing results.
 * - `onInputFileChange`: Handler for ancillary file inputs (hauls, fauna, lengths, hydrographies); validates filenames based on parsed survey code.
 * - `onImport`: Gathers all selected files and sends them as a multipart FormData PUT request; captures and displays server feedback.
 *
 * Messaging:
 * - Error and status messages are rendered within the form using helper logic. Both flat and sectioned message formats are supported for flexible backend responses.
 *
 * UI Layout:
 * - Presents file inputs for each file type (with dynamic enabling based on validation).
 * - Displays the detected survey code and current validation or upload status.
 * - Renders error feedback and detailed import messages after submission.
 * - Utilizes the `ImportOldCampFile` and `FloatingError` components for consistent field rendering and inline validation display.
 */

const ImportOldCamp = () => {

    const [files, setFiles] = useState({...EMPTY_FILES})

    const [importErrors, setImportErrors] = useState()
    const [importMessages, setImportMessages] = useState([])

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


    const [uploading, setUploading] = useState(false);

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
            return;
        }

        setFiles(prevState => ({...prevState, survey: file || null}));

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

    }

    const onImport = async (e) => {
        e.preventDefault();

        setUploading(true);
        const form = new FormData();
        form.append("survey", files["survey"]);
        form.append("hauls", files["hauls"]);
        form.append("fauna", files["fauna"]);
        form.append("lengths", files["lengths"]);
        form.append("hydrographies", files["hydrographies"]);

        const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.IMPORT_CAMP_FILE), {
            method: "PUT",
            body: form,
        });

        const importResponse = await response.json();
        console.log(importResponse);

        if (!response.ok) {
            setImportErrors(importResponse.error);
        }

        setImportMessages(importResponse);
        setUploading(false);
        // setFiles({...EMPTY_FILES});
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


    const renderImportMessages = (importMessages) => {
        if (!importMessages) {
            return null;
        }

        if (Array.isArray(importMessages)) {
            return importMessages.map((message, index) => (
                <div key={index}>{message}</div>
            ));
        }

        if (typeof importMessages === "object") {
            return Object.entries(importMessages).map(([sectionTitle, sectionData]) => {
                const messages = sectionData && Array.isArray(sectionData.messages)
                    ? sectionData.messages
                    : [];

                if (messages.length === 0) {
                    return null;
                }

                return (
                    <div key={sectionTitle}>
                        <ul>
                            {messages.map((message, index) => (
                                <li key={`${sectionTitle}-${index}`}>
                                    {message}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            });
        }

        return {importMessages};
    };


    return (
        <main>
            <header>
                <h1 className="title">Import Old Camp files</h1>
            </header>
            <div className="wrapper importOldCampWrapper">
                <div className="importOldCamp__row">
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
                        <div className="importOldCamp__row">
                            <div className="importOldCamp__cell importOldCamp__cell--center">
                                Detected survey code: <b>{surveyCode}</b>
                            </div>
                        </div>
                    )}

                    <div className="importOldCamp__row importOldCamp__cell--center">
                        <button type="submit" disabled={!isFormValid || uploading}>
                            {uploading ? "Importing..." : "Import"}
                        </button>
                    </div>
                    {importErrors && (
                        <div
                            className="wrapper importOldCamp__message importOldCamp__message--invalid">{importErrors}
                        </div>
                    )}
                    {importMessages && (
                        <div
                            className="wrapper importOldCamp__message importOldCamp__message--valid">{renderImportMessages(importMessages)}
                        </div>
                    )}
                </form>
            </div>

        </main>
    );
};

export default ImportOldCamp;