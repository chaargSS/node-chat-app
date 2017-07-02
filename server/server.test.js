const expect = require('expect');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {Users} =require('./utils/users');

describe('generateMessage',()=>{

        it("should generate right message object",()=>{
             var from='juli';
             var text='wana meet at evening';
            var message = generateMessage(from,text);

            expect(message.from).toBe('juli'); //expect(message.from).toBe(from);//expect(message.from).toinclude({ from,text});
             expect(message.text).toBe(text);
             expect(message.createdAt).toBeA('number');
             
        });
});

describe('generateLocationMessage',()=>{

        it('should generate correct location message',()=>{

                var from='juli';
             var latitude=1;
             var longitude=1;
             var url = 'https://www.google.com/maps?q=1,1';
            var message = generateLocationMessage(from,latitude,longitude);

            expect(message.from).toBe(from); 
             expect(message.url).toBe(url);
             expect(message.createdAt).toBeA('number');
        });
})

describe('Users',()=>{
         
         var users;
        beforeEach(()=>{
              users = new Users();
              users.users=[{
                      id:'1',
                      name:'torment',
                      room:'wildling'
              },
              {
                      id:'2',
                      name:'john',
                      room:'nights watch'
              },
              {
                      id:'3',
                      name:'oli',
                      room:'nights watch'
              }]
        });

       it('should add new user',()=>{
               var users = new Users();
               var user={
                  id: '123',
                  name:'sam',
                  room:'nights watch'
               };
               var resUser = users.adduser(user.id,user.name,user.room);

               expect(users.users).toEqual([user]);
       })

       it('should return names for nights watch',()=>{

               var names=users.getUsersList('nights watch');
               expect(names).toEqual(['john','oli']);
       })

       it('should return names for wildling',()=>{

               var names=users.getUsersList('wildling');
               expect(names).toEqual(['torment']);
       });

       it('should get the user By id',()=>{
              var userID='2';
               var user=users.getUser(userID);
               expect(user.id).toBe(userID);
       })

     it('should not get the user if id dont exist',()=>{
              var userID='5';
               var user=users.getUser(userID);
               expect(user).toNotExist();
       })

       it('should remove the  user ',()=>{
                var userID='1';
               var user=users.removeUser(userID);
               expect(user.id).toBe(userID);
               expect(users.users.length).toBe(2);              
       });

       it('should not remove the  user ',()=>{
                var userID='99';
               var user=users.removeUser(userID);
               expect(user).toNotExist();
               expect(users.users.length).toBe(3);              
       });

});
