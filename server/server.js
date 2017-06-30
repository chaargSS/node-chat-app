const path=require('path');  
const express = require('express');
const socketIO= require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname,'../public');

var PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);  //earlier we are using createServer() bihind in app.listen()
var io =socketIO(server); //we are getting web socket server

//creating static middleware
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
     console.log('new user connected');

     socket.emit('newMessage',{
         from:'abc',
         text:'hey,are you listening',
         cteatedAt:123
     });

     socket.on('createMessage',(createM)=>{
         console.log('create new message',createM);
     })

     socket.on('disconnect',()=>{
               console.log('disconnected from client');
           });
});
 //io.on(event name,callback) lets us register event //socket represent the individual user

//socket.emit()//emit to single connection
//io.emit () //emit to all connection



server.listen(PORT,()=>{
    console.log('listening to port',PORT);
});