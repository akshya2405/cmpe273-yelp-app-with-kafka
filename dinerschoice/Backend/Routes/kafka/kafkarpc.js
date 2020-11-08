const crypto = require('crypto');
const conn = require('./Connection');

const TIMEOUT = 80000;
let self;

exports = module.exports = new KafkaRPC;

function KafkaRPC() {
  self = this;
  this.connection = conn;
  this.requests = {};
  this.response_queue = false;
  this.producer = this.connection.getProducer();
}

KafkaRPC.prototype.makeRequest = function (request_queue, response_queue, content, callback) {
  console.log(`This is content ------- ${JSON.stringify(content)}`);
  self = this;

  const correlationId = crypto.randomBytes(16).toString('hex');

  const tId = setTimeout((corr_id) => {
    callback(new Error(`timeout ${corr_id}`));
    delete self.requests[corr_id];
  }, TIMEOUT, correlationId);

  const entry = {
    callback,
    timeout: tId,
  };

  self.requests[correlationId] = entry;

  self.setupResponseQueue(self.producer, request_queue, response_queue, () => {
    const payloads = [
      {
        topic: request_queue,
        messages: JSON.stringify({
          correlationId,
          replyTo: response_queue,
          data: content,
        }),
        partition: 0,
      },
    ];
    console.log(JSON.stringify(payloads));
    self.producer.send(payloads, (err, data) => {
      console.log(`In kafkarpc.js - producer.send : ${JSON.stringify(data)}`);
      console.log(data);

      if (err) console.log(err);
    });
  });
};

KafkaRPC.prototype.setupResponseQueue = function (producer, request_queue, response_queue, next) {
  if (this.response_queue) return next();

  self = this;
  console.log('in setupResponseQueue');

  const consumer = self.connection.getConsumer(response_queue);

  consumer.on('message', (message) => {
    console.log(`In kafkarpc - message received for topic : ${message.topic}`);
    const data = JSON.parse(message.value);
    const { correlationId } = data;
    if (correlationId in self.requests) {
      const entry = self.requests[correlationId];
      clearTimeout(entry.timeout);
      delete self.requests[correlationId];
      entry.callback(null, data.data);
    }
  });

  self.response_queue = true;
  return next();
};
