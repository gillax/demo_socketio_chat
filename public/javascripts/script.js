$(function() {
  var socket = io('http://localhost:3000', {
    query: 'token=token1',
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    autoConnect: true
  });
  socket.on('connect', function() {
    console.log('Event:connect fired.');
  });
  socket.on('connect_error', function(err) {
    console.log('Event:connect_error fired.');
    console.log(err);
  }).on('connect_timeout', function() {
    console.log('Event:connect_timeout fired.');
  }).on('reconnect', function(num) {
    console.log('Event:reconnect fired. num=' + num);
  }).on('reconnect_attempt', function() {
    console.log('Event:reconnect_attempt fired.');
  }).on('reconnecting', function(num) {
    console.log('Event:reconnecting fired. num=' + num);
  }).on('reconnect_error', function(err) {
    console.log('Event:reconnect_error fired.');
    console.log(err);
  }).on('reconnect_failed', function() {
    console.log('Event:reconnect_failed fired.');
  });

  socket.on('chat message', function(data) {
    console.log('EventOn:chat message => ' + data);
    $('#messages').append($('<li>').append($('<span>').addClass('name').text(data.user))
      .append($('<span>').addClass('message').text(data.message)));
    //$('#messages').append($('<li>').text(data.message));
  });

  $('form').submit(function(e) {
    console.log('EventEmit:chat message => ' + $('#m').val());
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    //e.preventDefault();
    return false;
  });
});
