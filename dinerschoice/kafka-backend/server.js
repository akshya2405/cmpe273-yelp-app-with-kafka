const connection = require('./kafka/Connection');
const connect = require('./dbConnection');
const login = require('./services/login');
const signup = require('./services/signup');
const restaurantProfile = require('./services/restaurantProfile');
const editProfile = require('./services/editProfile');
const editMenu = require('./services/editMenu');
const getOrders = require('./services/getOrders');
const getEvents = require('./services/getEvents');
const editEvents = require('./services/editEvents');
const lookupService = require('./services/lookupService');
const customerProfile = require('./services/customerProfile');
const placeOrder = require('./services/placeOrder');
const updateOrderStatus = require('./services/updateOrderStatus');
const registerForEvent = require('./services/registerForEvent');
const getMessageList = require('./services/getMessageList');
const addMessage = require('./services/AddMessage');
const getReviews = require('./services/getReviews');
const addReviews = require('./services/AddReviews');

connect.connect().then(dbConn => {
  var consumer = connection.getConsumer();
  var producer = connection.getProducer();
  consumer.on('message', function (message) {
    console.log('In server.js : Message Received for topic: ' + message.topic);
    var data = JSON.parse(message.value);
    console.log('reply topic : ' + data.replyTo);
    switch (message.topic) {
      case "login_request":
        console.log("In server.js - login_request case");
        login.handle_login(data.data, dbConn, function (err, res) {
          handle_reply(producer, data, res);
          return;
        });
        break;
      case "signup_request":
        console.log("In server.js - signup_request case");
        signup.handle_signup(data.data, dbConn, function (err, res) {
          handle_reply(producer, data, res);
          return;
        });
        break;
      case "rest_profile_request":
        console.log("In server.js - rest_profile_request case");
        restaurantProfile.handle_profile(data.data, dbConn, function (err, res) {
          handle_reply(producer, data, res);
          return;
        });
        break;
      case "edit_profile_request":
        console.log("In server.js - edit_profile_request case");
        editProfile.handle_edit_profile(data.data, dbConn, function (err, res) {
          handle_reply(producer, data, res);
          return;
        });
        break;
      case "edit_menu_request":
        console.log("In server.js - edit_profile_request case");
        editMenu.handle_edit_menu(data.data, dbConn, function (err, res) {
          handle_reply(producer, data, res);
          return;
        });
        break;
      case "view_order_request":
        console.log("In server.js - view_order_request case");
        getOrders.handle_rest_orders(data.data, dbConn, function (err, res) {
          handle_reply(producer, data, res);
          return;
        });
        break;
      case "view_rest_events_request":
        console.log("In server.js - view_order_request case");
        getEvents.handle_get_events(data.data, dbConn, function (err, res) {
          handle_reply(producer, data, res);
          return;
        });
        break;
      case "add_rest_events_request":
        console.log("In server.js - add_rest_events_request case");
        console.log('data in server: ', data.data);
        editEvents.handle_edit_events(data.data, dbConn, function (err, res) {
          handle_reply(producer, data, res);
          return;
        });
        break;
      case "lookup_request":
        console.log("In server.js - lookup_request case");
        console.log('data in server: ', data.data);
        lookupService.handle_lookup(data.data, dbConn, function (err, res) {
          handle_reply(producer, data, res);
          return;
        });
        break;
      case "cust_profile_request":
        console.log("In server.js - cust_profile_request case");
        customerProfile.handle_profile(data.data, dbConn, function (err, res) {
          handle_reply(producer, data, res);
          return;
        });
        break;
      case "place_order_request":
        console.log("In server.js - place_order_request case");
        placeOrder.handle_place_order(data.data, dbConn, function (err, res) {
          handle_reply(producer, data, res);
          return;
        });
        break;
      case "update_order_request":
        console.log("In server.js - update_order_request case");
        updateOrderStatus.handle_update_order(data.data, dbConn, function (err, res) {
          handle_reply(producer, data, res);
          return;
        });
        break;
      case "register_to_event_request":
        console.log("In server.js - register_to_event_request case");
        // TODO change this
        registerForEvent.handle_register_for_event(data.data, dbConn, function (err, res) {
          handle_reply(producer, data, res);
          return;
        });
        break;
      case "view_messages_request":
        console.log("In server.js - view_messages_request case");
        // TODO change this
        getMessageList.handle_get_messages(data.data, dbConn, function (err, res) {
          handle_reply(producer, data, res);
          return;
        });
        break;
      case "add_messages_request":
        console.log("In server.js - add_messages_request case");
        // TODO change this
        addMessage.handle_add_message(data.data, dbConn, function (err, res) {
          handle_reply(producer, data, res);
          return;
        });
        break;

      case "get_reviews_request":
        console.log("In server.js - get_reviews_request case");
        // TODO change this
        getReviews.handle_get_reviews(data.data, dbConn, function (err, res) {
          handle_reply(producer, data, res);
          return;
        });
        break;

      case "add_reviews_request":
        console.log("In server.js - add_reviews_request case");
        // TODO change this
        addReviews.handle_add_review(data.data, dbConn, function (err, res) {
          handle_reply(producer, data, res);
          return;
        });
        break;
    }
  });
});

function handle_reply(producer, data, res) {
  var payloads = [
    {
      topic: data.replyTo,
      messages: JSON.stringify({
        correlationId: data.correlationId,
        data: res
      }),
      partition: 0
    }
  ];
  producer.send(payloads, function (err, data) {
    if (err)
      console.log(err);
  });
}