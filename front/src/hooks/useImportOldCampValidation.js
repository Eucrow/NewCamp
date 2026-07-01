import {useEffect, useState} from "react";
import surveyService from "../services/surveyService";

export const useImportOldCampValidation = () => {

    const filePrefix = {survey: "CAMP", hauls: "LANCE", fauna: "FAUNA", lengths: "NTALL", hydrographies: "HIDRO"};

    const [surveys, setSurveys] = useState([]);

    // Fetch surveys on component mount
    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const fetchedSurveys = await surveyService.getSurveys(); // Fetch surveys using the service
                setSurveys(fetchedSurveys); // Store surveys in the state
            } catch (error) {
                console.error("Error fetching surveys:", error);
            }
        };

        fetchSurveys(); // Call the function
    }, []); // Empty dependency array ensures this runs only once on mount

    const [surveyExists, setSurveyExists] = useState();

    const [isFormValid, setIsFormValid] = useState(false);

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
        const expectedRegex = new RegExp(`^${filePrefix.survey}[a-zA-Z0-9]{3}.DBF`, "i");
        const isValid = expectedRegex.test(fileName);
        setFieldValid("survey", isValid);
        isValid === true ?
            setValidationError("survey", "") :
            setValidationError("survey", "The file name should be CAMPN25.DBF or CAMPP25.DBF")

        return isValid;
    }

    const validateFileName = (key, fileName, code) => {
        const expectedItem = filePrefix[key] + code + ".DBF";
        const expectedRegex = new RegExp(`^${expectedItem}$`, "i")
        const isValid = expectedRegex.test(fileName);

        setFieldValid(key, isValid);
        isValid === true ?
            setValidationError(key, "") :
            setValidationError(key, `The ${key} file must be named as ${filePrefix[key]}${code}.DBF`)

        return isValid;
    }

    const validateSurveyExists = (acronym) => {
        const existsSurveys = surveys.some(s => s.acronym === acronym);
        setSurveyExists(existsSurveys);
        if (existsSurveys) {
            setFieldValid("survey", false);
            setValidationError("survey", `The ${acronym} survey already exists`)

        } else {
            setValidationError("survey", "");

        }

    }

    useEffect(() => {
        const valid =
            fieldsValid.survey &&
            fieldsValid.hauls &&
            fieldsValid.fauna &&
            fieldsValid.lengths &&
            fieldsValid.hydrographies &&
            !surveyExists

        setIsFormValid(valid);

    }, [fieldsValid.survey,
        fieldsValid.hauls,
        fieldsValid.fauna,
        fieldsValid.lengths,
        fieldsValid.hydrographies,
        surveyExists]);


    return {
        isFormValid: isFormValid,
        validationErrors: validationErrors,
        fieldsValid: fieldsValid,
        validateSurveyFileName: validateSurveyFileName,
        validateFileName: validateFileName,
        surveyExists: surveyExists,
        validateSurveyExists: validateSurveyExists,
    };


};