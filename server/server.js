const path=require('path');  
const express = require('express');
const socketIO= require('socket.io');
const http = require('http');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname,'../public');

var PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);  
var io =socketIO(server); 
var users = new Users();


app.use(express.static(publicPath));

io.on('connection',(socket)=>{
     console.log('new user connected');


    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback(" name and room name required");
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.adduser(socket.id,params.name,params.room);  

        io.to(params.room).emit('updateUserslist',users.getUsersList(params.room))  

    socket.emit('newMessage',generateMessage('Admin','welcome to chat app'));
    
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name}  is joined`));
       callback();
    })

        socket.on('createMessage',(message,callback)=>{
         console.log('create new message',message);
         io.emit('newMessage',generateMessage(message.from,message.text));
         callback();
     });

     socket.on('createLocationMessage',(coords)=>{
           io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude));
     });

     socket.on('disconnect',()=>{
               var user = users.removeUser(socket.id);
               if(user){
                   io.to(user.room).emit('updateUserslist',users.getUsersList(user.room));
                   io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name}  has left `));
               }
           });
});

server.listen(PORT,()=>{
    console.log('listening to port',PORT);
});

