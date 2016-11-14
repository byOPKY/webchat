var socket = io.connect();
var $messageForm = $('#send-message');
var $messageBox = $('#message');
var $chat = $('#chat');
var $buttonSend = $('#send');

var $nickForm = $('#setNick');
var $nickBox = $('#nickname');
var $users = $('#users');
var $closeAlert = $('#closeAlert');

var chat = function(e) {
   e.preventDefault();
   socket.emit('new user', $nickBox.val(), function(data) {
       if(data) {
           $('#nickWrap').hide();
           $('#contentWrap').show();
       } else {
           $("#login-error").show();
       }
   });
   $nickBox.val('');
}
var iniciar = function($) {
   $nickForm.click(chat);
   $closeAlert.click(function(e) {
        $("#login-error").hide();
   });
   $messageForm.submit(function(e) {
       e.preventDefault();
       if($messageBox.val()!='') socket.emit('send message', $messageBox.val());
       $messageBox.val('');
   });
   socket.on('new message', function(data) {
      $chat.append('<b>'+data.nick+":</b> "+data.msg+"<br/>"); 
   });
   socket.on('usernames', function(data) {
        var html = '';
        for (var username in data) {
            html += username + '<br/>';
        }
        $users.html(html);
    });
   
};
jQuery(iniciar);