const MongoClient = require('mongodb').MongoClient;

const { mongoDB } = require('../Backend/config/auth.config');

const options = {
    // useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    // bufferMaxEntries: 0,
};
// const conn = () => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         MongoClient.connect(mongoDB, options, (err, client) => {
//             if (err) {
//                 console.log(err);
//                 console.log('MongoDB Connection Failed');
//             } else {
//                 console.log('MongoDB Connected');
//                 resolve(client.db('cmpe273-yelp-app'));
//             }
//         });
//     }, 1000);
// });
//
// exports.conn = conn;

function connect() {
    return MongoClient.connect(mongoDB, options).then(client => client.db('cmpe273-yelp-app'));
}
exports.connect = connect;
// module.exports = async function() {
//     let database = await Promise.resolve(connect(mongoDB));
//     return database;
// }
