/**
 * Import Old Camp configuration.
 *
 * Defines the naming conventions and the set of ancillary files used when importing
 * historical CAMP data files. All file names follow the pattern `${PREFIX}${CODE}.DBF`,
 * where `CODE` is the survey acronym parsed from the main CAMP file.
 *
 * Exports:
 * - `FILE_PREFIX`: map of logical file types to the expected filename prefixes.
 * - `FILE_TYPES`: list of ancillary file types required in addition to the main survey file.
 * - `EMPTY_FILES`: initial shape for component state holding selected files.
 */
export const FILE_PREFIX = {
    survey: "CAMP",
    hauls: "LANCE",
    fauna: "FAUNA",
    lengths: "NTALL",
    hydrographies: "HIDRO"
};

/**
 * Ordered list of ancillary file types required to complete the import.
 * The `survey` file is handled separately and is not part of this list.
 */
export const FILE_TYPES = [
    "hauls",
    "fauna",
    "lengths",
    "hydrographies"
];

/**
 * Helper object used to initialize/reset the file selection state in the UI.
 */
export const EMPTY_FILES = {
    survey: null,
    hauls: null,
    fauna: null,
    lengths: null,
    hydrographies: null,
};
