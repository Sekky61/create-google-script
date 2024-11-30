// Example of using a library from npm
import _ from "lodash";

export function readRow(
    sheet: GoogleAppsScript.Spreadsheet.Sheet,
    rowNumber: number,
): string[] {
    const row = sheet
        .getRange(rowNumber, 1, 1, sheet.getLastColumn())
        .getValues()[0];
    return row.map((cell) => cell.toString().trim());
}

function main() {
    const chunks = _.chunk(["a", "b", "c", "d"], 2);
    console.log("Starting...", chunks);
}

// Call main here to not lose it after bundling
if (import.meta.main) {
    main();
}
