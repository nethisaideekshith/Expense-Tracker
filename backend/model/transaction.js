class Transaction{
    constructor(obj){
        this.type=obj.type;
        this.category=obj.category;
        this.amount=obj.amount;
        this.description=obj.description;
        this.userId=obj.userId;
        this.date=obj.date;
    }
}

module.exports= Transaction;