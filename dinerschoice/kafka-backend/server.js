const connection = require('./kafka/Connection');
const connect = require('./dbConnection');
const login = require('./services/login');
const signup = require('./services/signup');
const restaurantProfile = require('./services/restaurantProfile');
const editProfile = require('./services/editProfile');
const editMenu = require('./services/editMenu');
const getOrders = require('./services/getOrders');
const getRestEvents = require('./services/getRestEvents');
const editEvents = require('./services/editEvents');
const lookupService = require('./services/lookupService');
const customerProfile = require('./services/customerProfile');
const placeOrder = require('./services/placeOrder');
const updateOrderStatus = require('./services/updateOrderStatus');

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
                    console.log(res);
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
                    console.log("In server.js - sending payload" + payloads);

                    producer.send(payloads, function (err, data) {
                        if (err)
                            console.log(err);
                    });
                    return;
                });
                break;

            case "signup_request":
                console.log("In server.js - signup_request case");
                signup.handle_signup(data.data, dbConn, function (err, res) {
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
                    return;
                });
                break;

            case "rest_profile_request":
                console.log("In server.js - rest_profile_request case");
                restaurantProfile.handle_profile(data.data, dbConn, function (err, res) {
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
                    return;
                });
                break;

            case "edit_profile_request":
                console.log("In server.js - edit_profile_request case");
                editProfile.handle_edit_profile(data.data, dbConn, function (err, res) {
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
                    return;
                });
                break;

            case "edit_menu_request":
                console.log("In server.js - edit_profile_request case");
                editMenu.handle_edit_menu(data.data, dbConn, function (err, res) {
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
                    return;
                });
                break;

            case "view_order_request":
                console.log("In server.js - view_order_request case");
                getOrders.handle_rest_orders(data.data, dbConn, function (err, res) {
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
                    return;
                });
                break;

            case "view_rest_events_request":
                console.log("In server.js - view_order_request case");
                getRestEvents.handle_rest_events(data.data, dbConn, function (err, res) {
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
                    return;
                });
                break;

            case "add_rest_events_request":
                console.log("In server.js - add_rest_events_request case");
                console.log('data in server: ', data.data);
                editEvents.handle_edit_events(data.data, dbConn, function (err, res) {
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
                    return;
                });
                break;

            case "lookup_request":
                console.log("In server.js - lookup_request case");
                console.log('data in server: ', data.data);
                lookupService.handle_lookup(data.data, dbConn, function (err, res) {
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
                    return;
                });
                break;

            case "cust_profile_request":
                console.log("In server.js - cust_profile_request case");
                customerProfile.handle_profile(data.data, dbConn, function (err, res) {
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
                    return;
                });
                break;

            case "place_order_request":
                console.log("In server.js - place_order_request case");
                placeOrder.handle_place_order(data.data, dbConn, function (err, res) {
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
                    return;
                });
                break;

            case "update_order_request":
                console.log("In server.js - place_order_request case");
                updateOrderStatus.handle_update_order(data.data, dbConn, function (err, res) {
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
                    return;
                });
                break;
        }
    });
});