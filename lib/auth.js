var AWS = require('aws-sdk');
var config = require('config');

var aws_config = config.get('aws') || {};
aws_config.apiVersion = '2012-08-10';
aws_config.endpoint = 'http://localhost:8000';

var dynamodb = new AWS.DynamoDB(aws_config);
//console.log(dynamodb);
//dynamodb.listTables({}, function(err, data) {
//  if (err) console.log(err);
//  else console.log(data);
//});

module.exports = function auth() {
  return function(socket, next) {
    var handshakeData = socket.handshake;
    var token = handshakeData.query.token;
    console.log('socket_id: ' + socket.id);
    console.log('token: ' + token);
    console.log('headers: ');
    console.log(handshakeData.headers);
  
    dynamodb.scan({
      TableName: 'users',
      //Limit: 1,
      ScanFilter: {
        'token': {
          ComparisonOperator: 'EQ',
          AttributeValueList: [
            {S: token}
          ]
        }
      }
    }, function(err, data) {
      if (err) {
        console.log(err);
        console.log('not authorized...');
        next(new Error('not authorized'));
      } else {
        //console.log(data); 
        if (data && data.Items[0]) {
          console.log('authorized!');
          socket.user = data.Items[0];
          next();

        } else {
          console.log('not authorized...');
          next(new Error('not authorized'));
        }
      }
    });

  };
};
