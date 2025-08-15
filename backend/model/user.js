class User{
    constructor(obj){
        this.name=obj.name;
        this.email=obj.email;
        this.password=obj.password;
        this.profileImage=obj.profileImage;
    }
}

module.exports=User;