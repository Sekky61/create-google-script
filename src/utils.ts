type Range = GoogleAppsScript.Spreadsheet.Range;

/**
 * Take tabular data and convert it to an array of objects with keys determined by
 * the column names.
 */
export function convertRangeToObjects(
    columnRange: Range,
    dataRange: Range,
): { [key: string]: unknown }[] {
    const columnNames = columnRange.getValues()[0] as string[];
    const data = dataRange.getValues();

    return mapArrayToObjects(columnNames, data);
}

/**
 * Convert objects from array form to object form.
 * One item in data is one object represented as a row.
 */
export function mapArrayToObjects(
    columns: string[],
    data: unknown[][],
): { [key: string]: unknown }[] {
    // Validate invariant: every row should match column length
    if (!data.every((row) => row.length === columns.length)) {
        throw new Error("Data rows do not match column count.");
    }

    // Convert to array of objects
    return data.map((row) =>
        columns.reduce(
            (obj, colName, index) => {
                obj[colName] = row[index];
                return obj;
            },
            {} as { [key: string]: unknown },
        ),
    );
}

/**
 * Create an internal or external link similar to "#gid=0&range=B2".
 * If spreadsheetId is not provided, the link will be local.
 */
export function rangeLinkRaw(
    sheetId: string,
    a1Range: string,
    spreadsheetId?: string,
) {
    const url = spreadsheetId
        ? `https://docs.google.com/spreadsheets/d/${spreadsheetId}`
        : "";
    return `${url}#gid=${sheetId}&range=${a1Range}`;
}

/**
 * Create an local (default) or external link to a range.
 * Clicking on local link is more pleasant for the user.
 */
export function rangeLink(range: Range, local = true) {
    const sheet = range.getSheet();
    const spreadsheetId = local ? undefined : sheet.getParent().getId();
    return rangeLinkRaw(
        sheet.getSheetId().toString(),
        range.getA1Notation(),
        spreadsheetId,
    );
}

/**
 * Create a link in a range
 */
export function setLink(range: Range, url: string, label?: string) {
    const richValue = SpreadsheetApp.newRichTextValue()
        .setText(label ?? url)
        .setLinkUrl(url)
        .build();
    range.setRichTextValue(richValue);
}
