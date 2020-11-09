const kafka = require('kafka-node');

const topics = [
  { topic: 'login_response', partition: 0 },
  { topic: 'signup_response', partition: 0 },
  { topic: 'rest_profile_response', partition: 0 },
  { topic: 'edit_profile_response', partition: 0 },
  { topic: 'edit_menu_response', partition: 0 },
  { topic: 'view_order_response', partition: 0 },
  { topic: 'view_rest_events_response', partition: 0 },
  { topic: 'add_rest_events_response', partition: 0 },
  { topic: 'lookup_response', partition: 0 },
  { topic: 'cust_profile_response', partition: 0 },
  { topic: 'place_order_response', partition: 0 },
  { topic: 'update_order_response', partition: 0 },
  { topic: 'register_to_event_response', partition: 0 },
  { topic: 'view_messages_response', partition: 0 },
  { topic: 'add_messages_response', partition: 0 },
  { topic: 'get_reviews_response', partition: 0 },
  { topic: 'add_reviews_response', partition: 0 },
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
