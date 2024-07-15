class user {
  id:string;
  name:string;
  wallet: number;
  stock:number;
  
    constructor(id:string,name:string,wallet:number,stock:number){
      this.id = id;
      this.name = name;
      this.wallet = wallet;
      this.stock = stock;
    }
    
      /*
      trucmuch(){
          return this.id
        }
      */
    }

export{user}