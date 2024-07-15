import { Spreadsheet, Range, Sheet, UnifiedSheet,UnifiedRange } from "../types";
import { transaction } from "../src/transactions"
import { user } from "../src/users"
import { stock } from "../src/stocks"
//import Range from "gasmask/dist/SpreadsheetApp/Range";
//import Sheet from "gasmask/dist/SpreadsheetApp/Sheet";
/**
 * Convert a sheet table into an array of Objects
 * @param {string} tableSheetName The name of the specified table/sheet
 * @return An array of objects
 * @customfunction
*/
function getTable(spreadsheet:Spreadsheet, tableSheetName:string):Object[]{
    //add to objects the class that have to be supported
    const objects = { 'transactions' : transaction , 'users' : user, 'stocks' : stock}
    
    let tableSheet: UnifiedSheet = spreadsheet.getSheetByName(tableSheetName);
    if (tableSheet === null) {return null};

    let tableRange: UnifiedRange = tableSheet.getDataRange();
    let cellsValues = tableRange.getValues();
    let headers = tableRange.getValues()[0];

    cellsValues = cellsValues.filter( (row) => row[0] != '' && row[1] != '' )
    
    let objectArray = [];

    for(let i = 1 ; i < cellsValues.length ; i = i+1){
      let temp_object = new objects[tableSheetName]();
      headers.forEach((header) => {
        if (header != '') {
        temp_object[header] = cellsValues[i][headers.indexOf(header)]}
        })
      objectArray.push(temp_object)
    }
  
    return objectArray
  
  }




function randomIntFromInterval(min:number, max:number):number { // min and max included 
  if (min > max) { return null; }
  else { return Math.floor(Math.random() * (max - min + 1) + min); }
}


/**
 * Increase or decrease a number by a random percentage between two thresholds
 * @param {number} x The number to increase or decrease.
 * @param {boolean} increase True = increase , False = decrease
 * @param {number} lowThreshold low threshold
 * @param {number} highThreshold high threshold
 * @param {number} decimalNumber number of decimals : must be between 0 and 5
 * @return The increased or decreased number
 * @customfunction
*/
function randomXpercentOfincrease(x:number,increase:boolean,lowThreshold:number,highThreshold:number,decimalNumber:number):number{
  
  if ( 0 <= lowThreshold && lowThreshold <= highThreshold && decimalNumber >= 0 && decimalNumber <= 5 ) {
    
    let multiplicator = 1;
    if(increase == false) { multiplicator = -1 }
    let notFlooredResult =  x * (1 + multiplicator * randomIntFromInterval(lowThreshold,highThreshold)/100)
    let tenPower = Math.pow(10, decimalNumber)
    let flooredResult = Math.floor(notFlooredResult * tenPower) / tenPower + 1

    return flooredResult

 }

else { return null }

}

/**
 * Returns true in n% of the cases.
 * @param {number} n Between 0 and 100
 * @return True in n% of the cases
 * @customfunction
*/
function nPercentOfChance(n:number):boolean{
  if ( 0 <= 0 && n <= 100) {
    return randomIntFromInterval(1,100) > (100-n)
  }

  else { return null } 

}

/**
 * Returns an integer between 1 and n
 * @param {int} n An integer >= 1
 * @return An integer between 1 and n
 * @customfunction
*/
function returnAnumberBetween1andN(n:number):number{
  if (n < 1 ) { return null };
  return randomIntFromInterval(1,n);
}


function retrieveTableHeaders(tableSheet:Sheet):any[]{
  let tableRange = tableSheet.getDataRange();
  let headers = tableRange.getValues()[0];
  return headers;
}

/**
 * Convert an array of objects into a 2D-Array with a specified sheet headers. Headers need to match objects parameters
 * @param {array} objectArray An array with similar objects
 * @param {Sheet} targetSheet The name of the specified table/sheet
 * @return A 2D Array with mathing parameters
 * @customfunction
*/
function objectArrayTo2DArray(objectArray:Object[],targetSheet:Sheet):any[]{
  
  let targetSheetHeaders = retrieveTableHeaders(targetSheet);
  let target2DArray = [];

  objectArray.forEach( (object) => {
  let line = [];
  targetSheetHeaders.forEach(header => line.push(object[header]))
  target2DArray.push(line);
  })

  return target2DArray

}

function sortObjectArray(array,sortingParameters,ascending):object[]{
  let newArray = array.sort((a, b) => a[sortingParameters] - b[sortingParameters]);
  if (ascending) {
  return newArray
  }
  else {
    return newArray.reverse();
  }
  
  }

function sumProperties(arrayOfObjects:Object[],property:string):number {

  if (arrayOfObjects.length > 0) {
    if ( typeof (arrayOfObjects[0][property]) === "number") {
      let sum = 0;
      arrayOfObjects.forEach((object) => sum = sum + object[property])
      return sum
    } 
    else { return null }

  }

  else { return null }
  
  }


export {getTable,
  randomIntFromInterval,
  randomXpercentOfincrease,
  nPercentOfChance,
  returnAnumberBetween1andN,
  retrieveTableHeaders,
  objectArrayTo2DArray,
  sumProperties}


