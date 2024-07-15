import Spreadsheet from "gasmask/dist/SpreadsheetApp/Spreadsheet";
import { getTable } from "./helpers";


class stock {
    user_id:string;
    stockLevel:number;
    constructor(user_id:string,stockLevel:number){
      this.user_id = user_id;
      this.stockLevel = stockLevel;
      }
    
    }
    
/* deprecated

const stockRange = ss.getRangeByName("stock");
    
function getStock(){
    return stockRange.getValue();
    }
    
    
function updateStock(quantity){
    stockRange.setValue(getStock()+quantity);
    Logger.log("Stock has been updated to"+ getStock());
    }
    
*/

/*
function getStocks():Object[]{
    return getTable(backoffice,'stocks');
}
*/

export{stock}