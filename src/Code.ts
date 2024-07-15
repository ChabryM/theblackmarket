import { Spreadsheet } from "../types";
import { getTable } from "./helpers";

function test() {
    let ss:Spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    Logger.log(getTable(ss, 'transactions'))
    //Logger.log(getTable(ss,'transactions'));
    //Logger.log(getTable(ss,'users'));
    //Logger.log(getTable(ss,'stocks'));
    //Logger.log(randomIntFromInterval(1,3))
}
