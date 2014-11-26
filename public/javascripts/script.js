$(function() {
  var socket = io();
  $('form').submit(function(e) {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    //e.preventDefault();
    return false;
  });

  socket.on('chat message', function(data) {
    $('#messages').append($('<li>').text(data));
  });
});
