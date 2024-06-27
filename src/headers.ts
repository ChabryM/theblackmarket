import { Spreadsheet } from "../types";

function readSheetHeaders(spreadsheet: Spreadsheet, sheetName: string): string[] {
    const sheet = spreadsheet.getSheetByName(sheetName);
    if(sheet == null) return null
    const firstLine = sheet.getRange('1:1').getValues()[0];
    return firstLine.filter(Boolean) // remove empty values
}

function testReader() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    Logger.log(readSheetHeaders(ss,"Sheet1"))
}

export {readSheetHeaders}