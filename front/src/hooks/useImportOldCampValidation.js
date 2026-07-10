/**
 * Validation hook for the Import Old Camp flow.
 *
 * Responsibilities:
 * - Keep per-field validity and error messages for the survey and each ancillary file.
 * - Verify file name formats match the strict legacy naming convention.
 * - Check whether a survey already exists in global application state.
 *
 * Returns an object containing:
 * - `isFormValid` (boolean): true when all files are valid and the survey does not already exist.
 * - `validationErrors` (Record<string,string>): current error messages keyed by file type.
 * - `fieldsValid` (Record<string,boolean>): current boolean validity per file type.
 * - `validateSurveyFileName(fileName: string): boolean`: checks CAMP file naming pattern and updates state.
 * - `validateFileName(key: string, fileName: string, code: string): boolean`: checks ancillary file naming for the provided survey code.
 * - `validateSurveyExists(acronym: string): boolean`: verifies the survey is not already present in global state.
 * - `resetFieldValidation(key: string): void`: clears validity and error for a specific field.
 */
import {useContext, useState} from "react";
import GlobalContext from "../contexts/GlobalContext";
import {FILE_PREFIX} from "../components/importOldCamp/importOldCampConfig";


/**
 * Hook computing and exposing validation state and helpers for the import form.
 */
export const useImportOldCampValidation = () => {

    const {surveys = [], surveysLoaded = false} = useContext(GlobalContext);

    const [surveyExists, setSurveyExists] = useState(false);

    const [fieldsValid, setFieldsValid] = useState({
        survey: false,
        hauls: false,
        fauna: false,
        lengths: false,
        hydrographies: false
    });

    const setFieldValid = (key, valid) => {
        setFieldsValid(prevState => ({
            ...prevState,
            [key]: valid
        }));
    }
    const isFormValid =
        fieldsValid.survey &&
        fieldsValid.hauls &&
        fieldsValid.fauna &&
        fieldsValid.lengths &&
        fieldsValid.hydrographies &&
        !surveyExists;

    const [validationErrors, setValidationErrors] = useState({
        survey: "",
        hauls: "",
        fauna: "",
        lengths: "",
        hydrographies: ""
    })

    const setValidationError = (fileType, valid) => {
        setValidationErrors(prevState => ({
            ...prevState,
            [fileType]: valid
        }));
    }

    const validateSurveyFileName = (fileName) => {
        const expectedRegex = new RegExp(`^${FILE_PREFIX.survey}[NP]\\d{2}\\.DBF$`, "i");
        const isValid = expectedRegex.test(fileName);
        setFieldValid("survey", isValid);
        if (!isValid) {
            setSurveyExists(false);
        }
        isValid === true ?
            setValidationError("survey", "") :
            setValidationError("survey", "The file name should be CAMPN25.DBF or CAMPP25.DBF")

        return isValid;
    }

    const validateFileName = (key, fileName, code) => {
        const expectedItem = FILE_PREFIX[key] + code + ".DBF";
        const expectedRegex = new RegExp(`^${expectedItem}$`, "i")
        const isValid = expectedRegex.test(fileName);

        setFieldValid(key, isValid);
        isValid === true ?
            setValidationError(key, "") :
            setValidationError(key, `The ${key} file must be named as ${FILE_PREFIX[key]}${code}.DBF`)

        return isValid;
    }

    const validateSurveyExists = (acronym) => {

        if (!surveysLoaded) {
            setSurveyExists(false);
            setFieldValid("survey", false);
            setValidationError("survey", "Surveys are still loading. Please try again.");
            return false;
        }

        const existsSurveys = surveys.some(s => s.acronym === acronym);
        setSurveyExists(existsSurveys);
        if (existsSurveys) {
            setFieldValid("survey", false);
            setValidationError("survey", `The ${acronym} survey already exists`)
        } else {
            setValidationError("survey", "");
        }
        return !existsSurveys;
    }

    const resetFieldValidation = (key) => {
        setFieldValid(key, false);
        setValidationError(key, "");
    };

    return {
        isFormValid: isFormValid,
        validationErrors: validationErrors,
        fieldsValid: fieldsValid,
        validateSurveyFileName: validateSurveyFileName,
        validateFileName: validateFileName,
        validateSurveyExists: validateSurveyExists,
        resetFieldValidation: resetFieldValidation,
    };


};