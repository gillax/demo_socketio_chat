$(function() {
  var socket = io();
  $('form').submit(function(e) {
    console.log('EventEmit:chat message => ' + $('#m').val());
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    //e.preventDefault();
    return false;
  });

  socket.on('chat message', function(data) {
    console.log('EventOn:chat message => ' + data);
    $('#messages').append($('<li>').text(data));
  });
});
