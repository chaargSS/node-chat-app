var socket = io();  

           socket.on('connect',function(){
               console.log('connected to server');
               
           });

           socket.on('disconnect',function(){
               console.log('disconnected from server');
           });
           
          socket.on('newMessage',function(message){
                   console.log('new message received',message);
                   var li = jQuery('<li></li>');
                   li.text(`${message.from} : ${message.text}`);

                   jQuery('#messages').append(li);
               });
    //preventing the default behaviour of form  of submit by refreshing and overridng it        
    jQuery('#message-form').on('submit',function(e){
       e.preventDefault(); //prevent the default behaiviour

       
        socket.emit('createMessage',{
            from:'user',
            text:jQuery('[name=message]').val()
        },function(){

        });

});