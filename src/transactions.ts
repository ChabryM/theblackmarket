class transaction {
    id:string = '';
    day:number = 0;
    user_id:string = '';
    type:string = '';
    quantity:number = 0;
    unit_price:number = 0;
    comment:string = '';
    credit:number = 0;
    debit:number = 0;

    constructor(id:string,day:number,user_id:string,type:string,quantity:number,unit_price:number,comment:string){
    let sign = 1;
    if (type == 'credit') {
      sign = -1;
    }
    this.id = id;
    this.day = day;
    this.user_id = user_id;
    if (type != undefined) {this[type] = unit_price * quantity;} 
    this.type = type;
    this.quantity = sign * quantity;
    this.unit_price = unit_price;
    this.comment = comment
    }
  
  }



  export{transaction}