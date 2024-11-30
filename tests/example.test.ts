import { expect, test, mock } from "bun:test";
import { readRow } from "../src/index";

// Mock the necessary functions
const sheet = {
    getRange: mock(() => {
        return {
            getValues: () => [[1, 2, 3, 4]],
        };
    }),
    getLastColumn: mock(() => 4),
    // biome-ignore lint: just a test
} as any as GoogleAppsScript.Spreadsheet.Sheet;

test("2 + 2", () => {
    expect(2 + 2).toBe(4);
});

test("readRow", () => {
    expect(readRow(sheet, 1)).toEqual(["1", "2", "3", "4"]);
});
