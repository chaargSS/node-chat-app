var socket = io();  

             function scrollToBottom (){

                 var messages= jQuery('#messages');
                 var newMessage=messages.children('li:last-child');
               
                 var clientHeight = messages.prop('clientHeight');
                 var scrollTop = messages.prop('scrollTop')
                 var scrollHeight = messages.prop('scrollHeight');
                 var newMessageHeight = newMessage.innerHeight();
                 var lastMessageHeigh = newMessage.prev().innerHeight();

                 if(scrollTop+clientHeight+newMessageHeight+lastMessageHeigh >= scrollHeight){
                    messages.scrollTop(scrollHeight);
                 }
             };
           
           socket.on('connect',function(){
               var params =jQuery.deparam(window.location.search);

               socket.emit('join',params,function(err){
                   if(err) {
                       alert(err);
                       window.location.href="/";
                   }else{
                         console.log('no error');
                   };
               });
               
           });

           socket.on('disconnect',function(){
               console.log('disconnected from server');
           });

           socket.on('updateUserslist',function(users){
               var ol =jQuery('<ol></ol>');

               users.forEach(function(user){
                   ol.append(jQuery('<li></li>').text(user));
               });

               jQuery('#users').html(ol);
           })
           
          socket.on('newMessage',function(message){
              var formattedTime = moment(message.createdAt).format('h:mm a');
              var template = jQuery('#message-template').html(); //grabbing template by id /html() will return markup inside template which is<p> in this case
              var html = Mustache.render(template,{
                  text:message.text,
                  from:message.from,
                  createdAt:formattedTime
              });

              jQuery('#messages').append(html);
              scrollToBottom();
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
              scrollToBottom();
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