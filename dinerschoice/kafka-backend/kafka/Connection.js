var kafka = require('kafka-node');
var topics = [
    {topic: 'login_request', partition: 0},
    {topic: 'signup_request', partition: 0},
    {topic: 'rest_profile_request', partition: 0},
    { topic: 'edit_profile_request', partition: 0 },
    { topic: 'edit_menu_request', partition: 0 },
    { topic: 'view_order_request', partition: 0 },
    { topic: 'view_rest_events_request', partition: 0 },
    { topic: 'add_rest_events_request', partition: 0 },
    { topic: 'lookup_request', partition: 0 },
    { topic: 'cust_profile_request', partition: 0 },
];

function ConnectionProvider() {

    this.getConsumer = function () {
        if (!this.kafkaConsumerConnection) {

            this.client = new kafka.KafkaClient("localhost:2181");
            this.kafkaConsumerConnection = new kafka.Consumer(this.client, topics);
            this.client.on('ready', function () {
                console.log('In kafka-back-end - Connection.js : Client ready!')
            })
        }
        return this.kafkaConsumerConnection;
    };

    this.getProducer = function () {

        if (!this.kafkaProducerConnection) {
            this.client = new kafka.KafkaClient("localhost:2181");
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(this.client);
            //this.kafkaConnection = new kafka.Producer(this.client);
            console.log('In kafka-back-end - Connection.js : Producer ready');
        }
        return this.kafkaProducerConnection;
    };
}

exports = module.exports = new ConnectionProvider;