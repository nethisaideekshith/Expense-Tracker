class Transaction{
    constructor(obj){
        this.type=obj.type;
        this.category=obj.category;
        this.amount=obj.amount;
        this.date=obj.date;
    }
}

module.exports= Transaction;