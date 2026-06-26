import React, {useMemo, useState} from "react";
import {API_CONFIG, buildApiUrl} from "../../config/api";
import UiButtonFile from "../ui/UiButtonFile";


const REQUIRED_PREFIXES = [
    {key: "survey", prefix: "CAMP"},
    {key: "hauls", prefix: "LANCE"},
    {key: "fauna", prefix: "FAUNA"},
    {key: "lengths", prefix: "NTALL"},
    {key: "hydrographies", prefix: "HIDRO"},
];

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
    const [surveyFile, setSurveyFile] = useState(null);
    const [haulsFile, setHaulsFile] = useState(null);
    const [faunaFile, setFaunaFile] = useState(null);
    const [lengthsFile, setLengthsFile] = useState(null);
    const [hydrographiesFile, setHydrographiesFile] = useState(null);

    const [messages, setMessages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [serverResponse, setServerResponse] = useState("");

    const surveyCode = useMemo(() => (surveyFile ? parseSurveyCodeFromCampFilename(surveyFile.name) : null), [surveyFile]);

    const filePrefix = {survey: "CAMP", hauls: "LANCE", fauna: "FAUNA", lengths: "NTALL", hydrographies: "HIDRO"};

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

        console.log("fileName:", JSON.stringify(fileName));
        console.log("expectedItem:", JSON.stringify(expectedItem));
        console.log("fileName length:", fileName.length);
        console.log("expectedItem length:", expectedItem.length);
        console.log(
            "fileName chars:",
            [...fileName].map(c => `${c}=${c.charCodeAt(0)}`)
        );
        console.log(
            "expectedItem chars:",
            [...expectedItem].map(c => `${c}=${c.charCodeAt(0)}`)
        );
        console.log("regex:", expectedRegex);
        console.log("matches:", expectedRegex.test(fileName));


        setFieldValid(key, isValid);
        return isValid;
    }

    const onCampChange = (e) => {
        const file = e.target.files && e.target.files[0];

        if (!file) {
            setSurveyFile(null);
            return;
        }

        const newSurveyCode = parseSurveyCodeFromCampFilename(file.name);


        validateSurveyFileName(file.name);

        if (haulsFile) {
            validateFileName("hauls", haulsFile.name, newSurveyCode);
        }
        if (faunaFile) {
            validateFileName("fauna", faunaFile.name, newSurveyCode);
        }

        if (lengthsFile) {
            validateFileName("lengths", lengthsFile.name, newSurveyCode);
        }
        if (hydrographiesFile) {
            validateFileName("hydrographies", hydrographiesFile.name, newSurveyCode);
        }


        setSurveyFile(file || null);
        setServerResponse("");
        setMessages([]);
    };

    const onHaulChange = (e) => {
        const file = e.target.files && e.target.files[0];
        validateFileName("hauls", file.name);
        setHaulsFile(file || null);
        setServerResponse("");
        setMessages([]);
    }
    const onFaunaChange = (e) => {
        const file = e.target.files && e.target.files[0];
        validateFileName("fauna", file.name);
        setFaunaFile(file || null);
        setServerResponse("");
        setMessages([]);
    }
    const onLengthsChange = (e) => {
        const file = e.target.files && e.target.files[0];
        validateFileName("lengths", file.name);
        setLengthsFile(file || null);
        setServerResponse("");
        setMessages([]);
    }
    const onHydrographiesChange = (e) => {
        const file = e.target.files && e.target.files[0];
        validateFileName("hydrographies", file.name);
        setHydrographiesFile(file || null);
        setServerResponse("");
        setMessages([]);
    }

    const onImport = async () => {
        setServerResponse("");
        // if (!ok) return;

        try {
            setUploading(true);
            const form = new FormData();
            // Attach the exact files under the expected field keys
            // Ensure we use the user-selected CAMP file object (to respect their choice)
            form.append("survey", surveyFile);
            form.append("hauls", haulsFile);
            form.append("fauna", faunaFile);
            form.append("lengths", lengthsFile);
            form.append("hydrographies", hydrographiesFile);

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

                <form className="importOldCamp__form">

                    <div className="importOldCamp__row">
                        <label className="importOldCamp__element">
                            Survey file (CAMPN25, CAMPP15...):
                        </label>
                        <div className="importOldCamp__element--right">
                            <UiButtonFile
                                buttonText="Choose CAMP file"
                                accept=".dbf,.DBF"
                                selectedFile={surveyFile}
                                onChange={onCampChange}
                            /></div>
                    </div>
                    <div className="importOldCamp__row">
                        <label className="importOldCamp__element">
                            Hauls file (LANCEN25, LANCEP15...):
                        </label>
                        <UiButtonFile
                            buttonText="Choose LANCE file"
                            accept=".dbf,.DBF"
                            selectedFile={haulsFile}
                            onChange={onHaulChange}
                        /></div>
                    <div className="importOldCamp__row">
                        <label className="importOldCamp__element">
                            Fauna file (FAUNAN25, FAUNAP15...):
                        </label>
                        <UiButtonFile
                            buttonText="Choose FAUNA file"
                            accept=".dbf,.DBF"
                            selectedFile={faunaFile}
                            onChange={onFaunaChange}
                        /></div>
                    <div className="importOldCamp__row">
                        <label className="importOldCamp__element">
                            Lengths file (NTALLN25, NTALLP15...):
                        </label>
                        <UiButtonFile
                            buttonText="Choose NTALL file"
                            accept=".dbf,.DBF"
                            selectedFile={lengthsFile}
                            onChange={onLengthsChange}
                        /></div>
                    <div className="importOldCamp__row">
                        <label className="importOldCamp__element">
                            Hydrography file (HIDRON25, HIDROP15...):
                        </label>
                        <UiButtonFile
                            buttonText="Choose HIDRO file"
                            accept=".dbf,.DBF"
                            selectedFile={hydrographiesFile}
                            onChange={onHydrographiesChange}
                        />
                    </div>


                    {surveyCode && (
                        <div className="importOldCamp__introduction">
                            Detected survey code from CAMP filename: <b>{surveyCode}</b>
                        </div>
                    )}

                    <div>
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
