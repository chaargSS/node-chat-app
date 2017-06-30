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

        socket.on('newLocationMessage',function(message){
              
              var li =jQuery('<li></li>');
              var a=jQuery('<a target="_blank">My current location</a>');

              li.text(`${message.from}:`);
              a.attr('href',message.url);
              li.append(a);
              jQuery('#messages').append(li);
        });
           
    jQuery('#message-form').on('submit',function(e){
       e.preventDefault(); //prevent the default behaiviour

       
        socket.emit('createMessage',{
            from:'user',
            text:jQuery('[name=message]').val()
        },function(){

        });

});

var locatinButton=jQuery('#send-location');
locatinButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by browser');
    }

    navigator.geolocation.getCurrentPosition(function(position){
      socket.emit('createLocationMessage',{
          latitude:position.coords.latitude,
          longitude:position.coords.longitude
      });
     },function(){
    alert('unable to feach  location.');
       });
});