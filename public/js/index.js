var socket = io();  

           socket.on('connect',function(){
               console.log('connected to server');

                socket.emit('createMessage',{
               to:'qwerty',
               text:'hey whats up'
                });

           });

           socket.on('disconnect',function(){
               console.log('disconnected from server');
           });
           
               socket.on('newMessage',function(newM){
                   console.log('new message received',newM);
               });

//dont use  Es6 (arrow function) in client side other wise it will cause problem in mobile or other plateform which doesnt suppport