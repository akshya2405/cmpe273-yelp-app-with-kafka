const rpc = require('./kafkarpc');

function make_request(request_queue, response_queue, msg_payload, callback) {
  console.log(`In client.js - before make request ${request_queue}`, response_queue);

  rpc.makeRequest(request_queue, response_queue, msg_payload, (err, response) => {
    if (err) console.error(err);
    else {
      console.log('In client.js - after make request ', response);

      callback(null, response);
    }
  });
}

exports.make_request = make_request;
