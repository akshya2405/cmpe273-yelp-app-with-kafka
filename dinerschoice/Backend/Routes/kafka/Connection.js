const kafka = require('kafka-node');

const topics = [
  { topic: 'login_response', partition: 0 },
  { topic: 'signup_response', partition: 0 },
  // {topic: 'getfiles_response', partition: 0},
  // {topic: 'delete_response', partition: 0},
  // {topic: 'upload_response', partition: 0},
  // {topic: 'fileShare_response', partition: 0},
  // {topic: 'about_response', partition: 0},
  // {topic: 'star_response', partition: 0},
  // {topic: 'getdetails_response', partition: 0},
  // {topic: 'createGroup_response', partition: 0},
  // {topic: 'getGroups_response', partition: 0},
  // {topic: 'updateUsernames_response', partition: 0},
  // {topic: 'groupShare_response', partition: 0},
  // {topic: 'deleteGroup_response', partition: 0}
];

function ConnectionProvider() {
  this.getConsumer = function () {
    // if (!this.kafkaConsumerConnection) {
    this.client = new kafka.KafkaClient('localhost:2181');
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, topics);
    this.client.on('ready', () => { console.log('In Back-end - Connection.js : Client ready!'); });
    // }
    return this.kafkaConsumerConnection;
  };

  // Code will be executed when we start Producer
  this.getProducer = function () {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.KafkaClient('localhost:2181');
      const { HighLevelProducer } = kafka;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      // this.kafkaConnection = new kafka.Producer(this.client);
      console.log('In Back-end - Connection.js : Producer ready');
    }
    return this.kafkaProducerConnection;
  };
}
module.exports = new ConnectionProvider();
