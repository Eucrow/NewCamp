import React, {useMemo, useState} from "react";
import {API_CONFIG, buildApiUrl} from "../../config/api";
import UiButton from "../ui/UiButton";
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

function makeExpectedNames(code) {
    // For each required prefix, make a case-insensitive matcher for `<PREFIX><code>` with any extension
    // We'll resolve actual files by scanning selected directory files
    return REQUIRED_PREFIXES.reduce((acc, item) => {
        acc[item.key] = {
            prefix: item.prefix,
            code,
            regex: new RegExp(`^${item.prefix}[_]?${code}(?:\.[A-Za-z0-9]+)?$`, "i"),
        };
        return acc;
    }, {});
}

const ImportOldCamp = () => {
    const [campFile, setCampFile] = useState(null);
    const [haulsFile, setHaulsFile] = useState(null);
    const [faunaFile, setFaunaFile] = useState(null);
    const [lengthsFile, setLengthsFile] = useState(null);
    const [hydrographiesFile, setHydrographiesFile] = useState(null);

    const [checks, setChecks] = useState({}); // mapping key -> {found: boolean, file?: File, name?: string}
    const [messages, setMessages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [serverResponse, setServerResponse] = useState("");

    const surveyCode = useMemo(() => (campFile ? parseSurveyCodeFromCampFilename(campFile.name) : null), [campFile]);
    const expected = useMemo(() => (surveyCode ? makeExpectedNames(surveyCode) : null), [surveyCode]);

    const onCampChange = (e) => {
        const file = e.target.files && e.target.files[0];
        setCampFile(file || null);
        setServerResponse("");
        setMessages([]);
        setChecks({});
    };

    const onHaulChange = (e) => {
        const file = e.target.files && e.target.files[0];
        setHaulsFile(file || null);
        setServerResponse("");
        setMessages([]);
        setChecks({});
    }
    const onFaunaChange = (e) => {
        const file = e.target.files && e.target.files[0];
        setFaunaFile(file || null);
        setServerResponse("");
        setMessages([]);
        setChecks({})
    }
    const onLengthsChange = (e) => {
        const file = e.target.files && e.target.files[0];
        setLengthsFile(file || null);
        setServerResponse("");
        setMessages([]);
        setChecks({})
    }
    const onHidrographiesChange = (e) => {
        const file = e.target.files && e.target.files[0];
        setHydrographiesFile(file || null);
        setServerResponse("");
        setMessages([]);
        setChecks({})
    }


    const onImport = async () => {
        setServerResponse("");
        // if (!ok) return;

        try {
            setUploading(true);
            const form = new FormData();
            // Attach the exact files under the expected field keys
            // Ensure we use the user-selected CAMP file object (to respect their choice)
            form.append("survey", campFile);
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
                            Survey file (CAMPN25, CAMPP15...)
                        </label>
                        <div className="importOldCamp__element--right">
                            <UiButtonFile
                                buttonText="Choose CAMP file"
                                accept=".dbf,.DBF"
                                selectedFile={campFile}
                                onChange={onCampChange}
                            /></div>
                    </div>
                    <div className="importOldCamp__row">
                        <label className="importOldCamp__element">
                            Hauls file (LANCEN25, LANCEP15...)
                        </label>
                        <UiButtonFile
                            buttonText="Choose LANCE file"
                            accept=".dbf,.DBF"
                            selectedFile={haulsFile}
                            onChange={onHaulChange}
                        /></div>
                    <div className="importOldCamp__row">
                        <label className="importOldCamp__element">
                            Fauna file (FAUNAN25, FAUNAP15...)
                        </label>
                        <UiButtonFile
                            buttonText="Choose FAUNA file"
                            accept=".dbf,.DBF"
                            selectedFile={faunaFile}
                            onChange={onFaunaChange}
                        /></div>
                    <div className="importOldCamp__row">
                        <label className="importOldCamp__element">
                            Lengths file (NTALLN25, NTALLP15...)
                        </label>
                        <UiButtonFile
                            buttonText="Choose NTALL file"
                            accept=".dbf,.DBF"
                            selectedFile={lengthsFile}
                            onChange={onLengthsChange}
                        /></div>
                    <div className="importOldCamp__row">
                        <label className="importOldCamp__element">
                            Hydrography file (HIDRON25, HIDROP15...)
                        </label>
                        <UiButtonFile
                            buttonText="Choose HIDRO file"
                            accept=".dbf,.DBF"
                            selectedFile={hydrographiesFile}
                            onChange={onHidrographiesChange}
                        />
                    </div>


                    {surveyCode && (
                        <div style={{fontSize: 14}}>
                            Detected survey code from CAMP filename: <b>{surveyCode}</b>
                        </div>
                    )}

                    <div>
                        <button onClick={onImport} disabled={!campFile || uploading}>
                            {uploading ? "Importing..." : "Import"}
                        </button>
                    </div>

                    {messages.length > 0 && (
                        <div style={{color: "#a00"}}>
                            {messages.map((m, i) => (
                                <div key={i}>{m}</div>
                            ))}
                        </div>
                    )}

                    {serverResponse && (
                        <div>
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
