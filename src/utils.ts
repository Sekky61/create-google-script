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
