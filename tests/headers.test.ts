import { readSheetHeaders } from '../src/headers';
import Spreadsheet from "gasmask/dist/SpreadsheetApp/Spreadsheet"

test('it reads headers correctly', () => {
    const testSpreadsheet = new Spreadsheet();
    const sheet1 = testSpreadsheet.insertSheet('Sheet1');
    sheet1.appendRow(['Column 1', 'Column 2']);
    sheet1.appendRow(['Dummy value', 'Dummy too', 'Orphan data']);
    expect(readSheetHeaders(testSpreadsheet, "Sheet1")).toEqual(['Column 1', 'Column 2'])
})

test('it returns null when the sheet does not exist', () => {
    const testSpreadsheet = new Spreadsheet();
    expect(readSheetHeaders(testSpreadsheet, "Sheet1")).toBeNull()
})

test('it returns an empty array when the sheet has no headers', () => {
    const testSpreadsheet = new Spreadsheet();
    testSpreadsheet.insertSheet('Sheet1');
    expect(readSheetHeaders(testSpreadsheet, "Sheet1")).toEqual([])
})