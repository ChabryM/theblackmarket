import { getTable,randomIntFromInterval,randomXpercentOfincrease,nPercentOfChance,objectArrayTo2DArray,sumProperties} from '../src/helpers';
import Spreadsheet from "gasmask/dist/SpreadsheetApp/Spreadsheet";
import Sheet from 'gasmask/dist/SpreadsheetApp/Sheet';
import { transaction } from '../src/transactions';
import { UnifiedSheet } from '../types';
import { user } from '../src/users';
import { stock } from '../src/stocks';

test('it returns null when the sheet does not exist', () => {
    const testSpreadsheet = new Spreadsheet();
    expect(getTable(testSpreadsheet,'sheet1')).toBeNull()
})

test('it returns an array with 2 credits transactions when passing a transactions sheet with no empty column', () => {
    let testSpreadsheet:Spreadsheet = new Spreadsheet();
    let transactions:UnifiedSheet = testSpreadsheet.insertSheet('transactions');
    transactions.appendRow(['id','day','user_id','debit','credit','type','quantity','unit_price','comment']);
    transactions.appendRow(["1",2,'user_id1',0,100,'credit',-2,50,'comment 1']);
    transactions.appendRow(["2",2,'user_id2',0,50,'credit',-1,50,'comment 2']);
    let expectedTransaction1:transaction = new transaction('1',2,'user_id1','credit',2,50,'comment 1');
    let expectedTransaction2:transaction = new transaction('2',2,'user_id2','credit',1,50,'comment 2');

    expect(getTable(testSpreadsheet,'transactions')).toEqual([expectedTransaction1,expectedTransaction2]);
})

test('it returns an array with 1 debit transaction when passing a transactions sheet with no empty column', () => {
    let testSpreadsheet:Spreadsheet = new Spreadsheet();
    let transactions:UnifiedSheet = testSpreadsheet.insertSheet('transactions');
    transactions.appendRow(['id','day','user_id','debit','credit','type','quantity','unit_price','comment']);
    transactions.appendRow(["1",2,'user_id1',100,0,'debit',2,50,'comment 1']);
    let expectedTransaction1:transaction = new transaction('1',2,'user_id1','debit',2,50,'comment 1');

    expect(getTable(testSpreadsheet,'transactions')).toEqual([expectedTransaction1]);
})


test('it returns an array with 1 debit transaction and 1 credit when passing a transactions sheet with no empty column', () => {
    let testSpreadsheet:Spreadsheet = new Spreadsheet();
    let transactions:UnifiedSheet = testSpreadsheet.insertSheet('transactions');
    transactions.appendRow(['id','day','user_id','debit','credit','type','quantity','unit_price','comment']);
    transactions.appendRow(["1",2,'user_id1',100,0,'debit',2,50,'comment 1']);
    transactions.appendRow(["1",2,'user_id2',0,50,'credit',-1,50,'comment 2']);
    let expectedTransaction1:transaction = new transaction('1',2,'user_id1','debit',2,50,'comment 1');
    let expectedTransaction2:transaction = new transaction('1',2,'user_id2','credit',1,50,'comment 2');
    expect(getTable(testSpreadsheet,'transactions')).toEqual([expectedTransaction1,expectedTransaction2]);
})

test('it returns an array with one transaction when passing the a sheet with empty columns', () => {
    let testSpreadsheet:Spreadsheet = new Spreadsheet();
    let transactions:UnifiedSheet = testSpreadsheet.insertSheet('transactions');
    transactions.appendRow(['id','day','','user_id','debit','credit','type','quantity','','unit_price','comment']);
    transactions.appendRow(["1",2,'','user_id1',0,100,'credit',-2,'',50,'comment 1']);
    let expectedTransaction1:transaction = new transaction('1',2,'user_id1','credit',2,50,'comment 1')

    expect(getTable(testSpreadsheet,'transactions')).toEqual([expectedTransaction1])
})


test('it returs an array with one user when passing a users sheet.',() => {
    let testSpreadsheet:Spreadsheet = new Spreadsheet();
    let users:UnifiedSheet = testSpreadsheet.insertSheet('users');
    users.appendRow(['id','name','wallet','stock']);
    users.appendRow(['user1_id','zergola',10,3]);

    let expectedUsersList = [new user('user1_id','zergola',10,3)]

    expect(getTable(testSpreadsheet,'users')).toEqual(expectedUsersList);

})


test('it returs an array with one stock when passing a Stocks sheet.',() => {
    let testSpreadsheet:Spreadsheet = new Spreadsheet();
    let stocks:UnifiedSheet = testSpreadsheet.insertSheet('stocks');
    stocks.appendRow(['user_id','stockLevel']);
    stocks.appendRow(['user1_id',3]);

    let expectedStockList = [new stock('user1_id',3)];

    expect(getTable(testSpreadsheet,'stocks')).toEqual(expectedStockList);

})


test ('returns a number between both thresholds.',() => {
    let min = 3;
    let max = 10;

    expect(randomIntFromInterval(min,max)).toBeLessThanOrEqual(max);
    expect(randomIntFromInterval(min,max)).toBeGreaterThanOrEqual(min);
})

test('returns null when parameters do not fit conditions',() => {

    expect(randomXpercentOfincrease(2,true,10,5,0)).toBeNull();
    expect(randomXpercentOfincrease(2,true,5,10,6)).toBeNull();
    expect(randomXpercentOfincrease(2,true,-5,10,5)).toBeNull();
})

test('returns null if n > 100',() => {
    expect(nPercentOfChance(102)).toBeNull();
})

test('returns true if n=100',() => {
    expect(nPercentOfChance(100)).toStrictEqual(true);
})

test('returns false if n=0',() => {
    expect(nPercentOfChance(0)).toStrictEqual(false);
})


test('returns a correct table',() => {
    let ss:Spreadsheet = new Spreadsheet();
    let sheet1:Sheet = ss.insertSheet('stocks');
    sheet1.appendRow(['header1','header 2']);

    let objectArray:Object[] = [ { header1 : 'object 1', 'header 2' : 'test 1'},{ header1 : 'object 2', 'header 2' : 'test 2'} ]
    
    let expectedArray = [['object 1','test 1'],['object 2','test 2']]
    expect(objectArrayTo2DArray(objectArray,sheet1)).toEqual(expectedArray);

})


test('should return 2', () => {
let object1 = { force : 2 };
let arrayOfObjects = [object1]
expect(sumProperties(arrayOfObjects,'force')).toEqual(2);
})

test('should return 2', () => {
let object1 = { force : 1 };
let object2 = { force : 1 };
let arrayOfObjects = [object1,object2]
expect(sumProperties(arrayOfObjects,'force')).toEqual(2);
})

test('should return null', () => {
    let object1 = { force : 1 };
    let object2 = { force : 1 };
    let arrayOfObjects = [object1,object2]
    expect(sumProperties(arrayOfObjects,'notexistingproperty')).toBeNull;
})