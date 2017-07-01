var socket = io();  

           socket.on('connect',function(){
               console.log('connected to server');
               
           });

           socket.on('disconnect',function(){
               console.log('disconnected from server');
           });
           
          socket.on('newMessage',function(message){
              var formattedTime = moment(message.createdAt).format('h:mm a');
              var template = jQuery('#message-template').html(); //grabbing template by id /html() will return markup inside template which is<p> in this case
              var html = Mustache.render(template,{
                  text:message.text,
                  from:message.from,
                  createdAt:formattedTime
              });

              jQuery('#messages').append(html);
         });

        socket.on('newLocationMessage',function(message){
              var formattedTime = moment(message.createdAt).format('h:mm a');
              var template = jQuery('#location-message-template').html(); 
              var html = Mustache.render(template,{
                  from:message.from,
                  url:message.url,
                  createdAt:formattedTime
              });

              jQuery('#messages').append(html);
        });
           
    jQuery('#message-form').on('submit',function(e){
       e.preventDefault(); 
       var messageTextBox=jQuery('[name=message]');

        socket.emit('createMessage',{
            from:'user',
            text:messageTextBox.val()
        },function(){
          messageTextBox.val('');
        });

});

var locatinButton=jQuery('#send-location');
locatinButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by browser');
    }
      
      locatinButton.attr('disabled','disabled').text('sending location ...');

    navigator.geolocation.getCurrentPosition(function(position){
      locatinButton.removeAttr('disabled').text('Send Location');
      socket.emit('createLocationMessage',{
          latitude:position.coords.latitude,
          longitude:position.coords.longitude
      });
     },function(){
          locatinButton.removeAttr('disabled').text('Send Location');
    alert('unable to feach  location.');
       });
});