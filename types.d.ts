import { default as GMSheet } from "gasmask/dist/SpreadsheetApp/Sheet";
import { default as GMRange } from "gasmask/dist/SpreadsheetApp/Range";

interface Spreadsheet {
    getId(): string;
    deleteSheet(sheet: UnifiedSheet): void;
    getActiveSheet(): UnifiedSheet;
    getSheets(): UnifiedSheet[];
    getSheetByName(name: string): UnifiedSheet;
    insertSheet(sheetName: string, sheetIndex?: number, options?: {
        template: UnifiedSheet;
    }): UnifiedSheet;
    toast(msg: string, title?: string, timeoutSeconds?: number): void;
}

type UnifiedSheet = Sheet | GoogleAppsScript.Spreadsheet.Sheet | GMSheet ;
interface Sheet {
    activate(): void;
    appendRow(row: any[]): void;
    autoResizeColumn(colNumber: number): void;
    getName(): string | null;
    deleteRow(): void;
    getLastColumn(): number;
    getLastRow(): number;
    getDataRange(): UnifiedRange;
    getRange(row: Number, column: Number): UnifiedRange;
    getRange(row: Number, column: Number, numRows: Number): UnifiedRange;
    getRange(row: Number, column: Number, numRows: Number, numColumns: Number): UnifiedRange;
    getRange(a1: string): UnifiedRange;
    getSheetValues(startRow: Number, startColumn: Number, numRows: Number, numColumns: Number): any[];
    setFrozenColumns(cols: number): void;
    setFrozenRows(rows: number): void;
    setName(name: string): void;
    showSheet(): void;
}

type UnifiedRange = Range | GoogleAppsScript.Spreadsheet.Range | GMRange
interface Range {
    activate(): UnifiedRange;
    activateAsCurrentCell(): UnifiedRange;
    setValue(value: any): UnifiedRange;
    getValue(): any;
    setValues(values: any[][]): UnifiedRange;
    getValues(): any[];
    setFontWeight(weight: string): UnifiedRange;
    setNumberFormat(format: string): UnifiedRange;
    setDataValidation(rule: any): UnifiedRange;
}