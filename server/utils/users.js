//Es6 classes
class Users {
    constructor(){
        this.users=[];
    }

    adduser(id,name,room){
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }
   
   removeUser(id){
        var user = this.users.filter((user)=>user.id===id)[0]; //this.getUser(id)
        if(user){
            this.users=this.users.filter((user)=>user.id!==id);
        }
        return user;
   };
   getUser(id){
        return  this.users.filter((user)=>user.id===id)[0]
   };
   getUsersList(room){
       var users = this.users.filter((user)=>user.room===room);//filter out all users with same name
       var namesArray = users.map((user)=>user.name);

       return namesArray;
   }
}

module.exports ={Users};