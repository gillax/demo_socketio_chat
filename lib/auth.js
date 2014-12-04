module.exports = function auth() {
  return function(socket, next) {
    var handshakeData = socket.handshake;

    console.log('socket_id: ' + socket.id);
    console.log('token: ' + handshakeData.query.token);
    console.log('headers: ');
    console.log(handshakeData.headers);
  
    //TODO authorization

    var user = {
      name: 'user-' + socket.id
    };

    if (user) {
      console.log('authorized!');
      socket.user = user;
      next();

    } else {
      console.log('not authorized...');
      next(new Error('not authorized'));
    }
  };
};
