var connection = require('./kafka/Connection');
var login = require('./services/login');
var signup = require('./services/signup');
// var getFiles = require('./services/getFiles');
// var deleteFile = require('./services/deleteFile');
// var uploadFile = require('./services/uploadFile');
// var shareFile = require('./services/shareFile');
// var about = require('./services/about');
// var starFile = require('./services/starFile');
// var group = require('./services/createGroup');

var consumer = connection.getConsumer();
var producer = connection.getProducer();

consumer.on('message', function (message) {
    console.log('In server.js : Message Received for topic: ' + message.topic);

    var data = JSON.parse(message.value);

    console.log('reply topic : ' + data.replyTo);

    switch (message.topic) {
        case "login_request":
            console.log("In server.js - login_request case");
            login.handle_login(data.data, function (err, res) {
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
            signup.handle_signup(data.data, function (err, res) {
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

        // case "getfiles_request":
        //     console.log("In server.js - getfiles_request case");
        //     console.log("This is data.data : " + data.data);

        //     getFiles.handle_getFiles(data.data, function (err, res) {
        //         var payloads = [
        //             {
        //                 topic: data.replyTo,
        //                 messages: JSON.stringify({
        //                     correlationId: data.correlationId,
        //                     data: res
        //                     }),
        //                 partition: 0
        //             }
        //         ];
        //         producer.send(payloads, function(err, data) {
        //             if(err)
        //                 console.log(err);
        //         });
        //         return;
        //     });
        //     break;

        // case "delete_request":
        //     console.log("In server.js - delete_request case");
        //     console.log("This is data.data : " + data.data);
        //     deleteFile.handle_deleteFile(data.data, function (err, res) {
        //         var payloads = [
        //             {
        //                 topic: data.replyTo,
        //                 messages: JSON.stringify({
        //                     correlationId: data.correlationId,
        //                     data: res
        //                 }),
        //                 partition: 0
        //             }
        //         ];
        //         producer.send(payloads, function(err, data) {
        //             if(err)
        //                 console.log(err);
        //         });
        //         return;
        //     });
        //     break;

        // case "star_request":
        //     console.log("In server.js - star_request case");
        //     console.log("This is data.data : " + data.data);
        //     starFile.handle_starFile(data.data, function (err, res) {
        //         var payloads = [
        //             {
        //                 topic: data.replyTo,
        //                 messages: JSON.stringify({
        //                     correlationId: data.correlationId,
        //                     data: res
        //                 }),
        //                 partition: 0
        //             }
        //         ];
        //         producer.send(payloads, function(err, data) {
        //             if(err)
        //                 console.log(err);
        //         });
        //         return;
        //     });
        //     break;

        // case "upload_request":

        //     console.log("In server.js - upload_request case");
        //     console.log("This is data.data : " + data.data);

        //     uploadFile.handle_uploadFile(data.data, function (err, res) {
        //         var payloads = [
        //             {
        //                 topic: data.replyTo,
        //                 messages: JSON.stringify({
        //                     correlationId: data.correlationId,
        //                     data: res
        //                 }),
        //                 partition: 0
        //             }
        //         ];
        //         producer.send(payloads, function(err, data) {
        //             if(err)
        //                 console.log(err);
        //         });
        //         return;
        //     });
        //     break;

        // case "fileShare_request":

        //     console.log("In server.js - shareFile_request case");
        //     console.log("This is data.data : " + data.data);

        //     shareFile.handle_shareFile(data.data, function (err, res) {
        //         var payloads = [
        //             {
        //                 topic: data.replyTo,
        //                 messages: JSON.stringify({
        //                     correlationId: data.correlationId,
        //                     data: res
        //                 }),
        //                 partition: 0
        //             }
        //         ];
        //         producer.send(payloads, function(err, data) {
        //             if(err)
        //                 console.log(err);
        //         });
        //         return;
        //     });
        //     break;

        // case "about_request":

        //     console.log("In server.js - about_request case");
        //     console.log("This is data.data : " + data.data);

        //     about.handle_about(data.data, function (err, res) {
        //         var payloads = [
        //             {
        //                 topic: data.replyTo,
        //                 messages: JSON.stringify({
        //                     correlationId: data.correlationId,
        //                     data: res
        //                 }),
        //                 partition: 0
        //             }
        //         ];
        //         producer.send(payloads, function(err, data) {
        //             if(err)
        //                 console.log(err);
        //         });
        //         return;
        //     });
        //     break;

        // case "getdetails_request":

        //     console.log("In server.js - getdetails_request case");
        //     console.log("This is data.data : " + data.data);

        //     about.handle_getDetails(data.data, function (err, res) {
        //         var payloads = [
        //             {
        //                 topic: data.replyTo,
        //                 messages: JSON.stringify({
        //                     correlationId: data.correlationId,
        //                     data: res
        //                 }),
        //                 partition: 0
        //             }
        //         ];
        //         producer.send(payloads, function(err, data) {
        //             if(err)
        //                 console.log(err);
        //         });
        //         return;
        //     });
        //     break;

        // case "createGroup_request":

        //     console.log("In server.js - createGroup_request case");
        //     console.log("This is data.data : " + data.data);

        //     group.handle_createGroup(data.data, function (err, res) {
        //         var payloads = [
        //             {
        //                 topic: data.replyTo,
        //                 messages: JSON.stringify({
        //                     correlationId: data.correlationId,
        //                     data: res
        //                 }),
        //                 partition: 0
        //             }
        //         ];
        //         producer.send(payloads, function(err, data) {
        //             if(err)
        //                 console.log(err);
        //         });
        //         return;
        //     });
        //     break;

        // case "getGroups_request":
        //     console.log("In server.js - getGroups_request case");
        //     console.log("This is data.data : " + data.data);

        //     group.handle_getGroups(data.data, function (err, res) {
        //         var payloads = [
        //             {
        //                 topic: data.replyTo,
        //                 messages: JSON.stringify({
        //                     correlationId: data.correlationId,
        //                     data: res
        //                 }),
        //                 partition: 0
        //             }
        //         ];
        //         producer.send(payloads, function(err, data) {
        //             if(err)
        //                 console.log(err);
        //         });
        //         return;
        //     });
        //     break;

        // case "updateUsernames_request":
        //     console.log("In server.js - getGroups_request case");
        //     console.log("This is data.data : " + data.data);

        //     group.handle_updateUsernames(data.data, function (err, res) {
        //         var payloads = [
        //             {
        //                 topic: data.replyTo,
        //                 messages: JSON.stringify({
        //                     correlationId: data.correlationId,
        //                     data: res
        //                 }),
        //                 partition: 0
        //             }
        //         ];
        //         producer.send(payloads, function(err, data) {
        //             if(err)
        //                 console.log(err);
        //         });
        //         return;
        //     });
        //     break;

        // case "groupShare_request":

        //     console.log("In server.js - groupShare_request case");
        //     console.log("This is data.data : " + data.data);

        //     group.handle_groupShare(data.data, function (err, res) {
        //         var payloads = [
        //             {
        //                 topic: data.replyTo,
        //                 messages: JSON.stringify({
        //                     correlationId: data.correlationId,
        //                     data: res
        //                 }),
        //                 partition: 0
        //             }
        //         ];
        //         producer.send(payloads, function(err, data) {
        //             if(err)
        //                 console.log(err);
        //         });
        //         return;
        //     });
        //     break;

        // case "deleteGroup_request":
        //     console.log("In server.js - deleteGroup_request case");
        //     console.log("This is data.data : " + data.data);

        //     group.handle_deleteGroup(data.data, function (err, res) {
        //         var payloads = [
        //             {
        //                 topic: data.replyTo,
        //                 messages: JSON.stringify({
        //                     correlationId: data.correlationId,
        //                     data: res
        //                 }),
        //                 partition: 0
        //             }
        //         ];
        //         producer.send(payloads, function(err, data) {
        //             if(err)
        //                 console.log(err);
        //         });
        //         return;
        //     });
        //     break;
    }
});