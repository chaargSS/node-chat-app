const path=require('path');  
const express = require('express');
const socketIO= require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');

var PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);  
var io =socketIO(server); 


app.use(express.static(publicPath));

io.on('connection',(socket)=>{
     console.log('new user connected');

   socket.emit('newMessage',generateMessage('Admin','welcome to chat app'));
    
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user is joined'));

        socket.on('createMessage',(message)=>{
         console.log('create new message',message);
         //user to user message
         io.emit('newMessage',generateMessage(message.from,message.text));
     });


     socket.on('disconnect',()=>{
               console.log('disconnected from client');
           });
});

server.listen(PORT,()=>{
    console.log('listening to port',PORT);
});