import { describe, expect, test } from "bun:test";
import { convertRangeToObjects, mapArrayToObjects } from "../src/utils";

describe("mapArrayToObjects", () => {
    test("maps", () => {
        const columns = ["a", "b", "c"];
        const data = [
            [1, 2, 3],
            [4, 5, 6],
        ];

        const objects = mapArrayToObjects(columns, data);
        expect(objects.length).toBe(2);
        expect(objects[0]).toEqual({ a: 1, b: 2, c: 3 });
    });

    test("checks dimensions", () => {
        const columns = ["a", "b"];
        const data = [
            [1, 2, 3],
            [4, 5, 6],
        ];

        expect(() => mapArrayToObjects(columns, data)).toThrowError();
    });
});

describe("convertRangeToObjects", () => {
    // Mock the necessary functions
    const colRange = {
        getValues: () => [[1, 2, 3, 4]],
        // biome-ignore lint: just a test
    } as any as GoogleAppsScript.Spreadsheet.Range;

    const valueRange = {
        getValues: () => [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
        ],
        // biome-ignore lint: just a test
    } as any as GoogleAppsScript.Spreadsheet.Range;

    test("converts", () => {
        const objects = convertRangeToObjects(colRange, valueRange);
        expect(objects.length).toBe(2);
        expect(objects[0]).toEqual({ "1": 1, "2": 2, "3": 3, "4": 4 });
        expect(objects[1]).toEqual({ "1": 5, "2": 6, "3": 7, "4": 8 });
    });
});
