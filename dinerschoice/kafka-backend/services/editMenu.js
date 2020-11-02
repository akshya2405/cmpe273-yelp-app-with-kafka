const mongo = require('mongodb');
const { mongoDB } = require('../../Backend/config/auth.config');
const conn = require('../dbConnection');

// TODO: Edit this part with findOneAndUpdate
function handle_edit_menu(msg, callback) {
  let res ={};
  console.log('in get request restaurant profile');
    conn.conn().then((db) => {
        console.log('connected to db');
        const options = { returnOriginal: false, upsert: true }
        let collectionName = '';
        const { id, updateList, deleteList } = msg;
        const findrestId = new mongo.ObjectID(id);
        collectionName = db.collection('menu');
        let update = {};
        updateList.map((dish) => {
            // const finddishId = new mongo.ObjectID(dish._id);
            update = {
                    restId : findrestId,
                    category: dish.category,
                    dishName: dish.dishName,
                    description: dish.description,
                    ingredients: dish.ingredients,
                    price: dish.price,
                    imageurl: dish.imageurl
                };
            collectionName.insert(update, function (err, dat) {
                if (err) {
                    res.status = 500;
                    callback(null, res);
                } else {
                    console.log(dat);
                    res.status = 200;
                    callback(null, res);
                }
            });
        });
  });
}

exports.handle_edit_menu = handle_edit_menu;