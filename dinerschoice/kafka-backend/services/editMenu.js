const mongo = require('mongodb');
const { mongoDB } = require('../../Backend/config/auth.config');
const conn = require('../dbConnection');

// TODO: Edit this part with findOneAndUpdate
function handle_edit_menu(msg, db, callback) {
  let res ={};
  console.log('in get request restaurant profile');
    // conn.conn().then((db) => {
        console.log('connected to db');
        const options = { returnOriginal: false, upsert: true }
        let collectionName = '';
        const { id, updateList, deleteIds } = msg;
        const findrestId = new mongo.ObjectID(id);
        collectionName = db.collection('menu');
        console.log('delete ids: ', deleteIds);
        let deleteList = [];
        deleteIds.map((id) => {
            deleteList.push(new mongo.ObjectID(id));
        });
        console.log(deleteList);
        collectionName.deleteMany({_id : {$in: deleteList}});
        let update = {};
        updateList.map((dish) => {

            update = {
                $set: {
                    restId: findrestId,
                    category: dish.category,
                    dishName: dish.dishName,
                    description: dish.description,
                    ingredients: dish.ingredients,
                    price: dish.price,
                    imageurl: dish.imageurl
                }
            };
            console.log(dish._id);
            let dishID = dish._id;
            if (dish._id.length === 24) {
                dishID = new mongo.ObjectID(dish._id);
            }
            collectionName.findOneAndReplace({_id: dishID}, update, options);
        });
            db.collection('menu').find({restId: findrestId}).toArray(function (error, menu) {
                if (error) {
                    console.log(error);
                    res.status = 500
                    res.message = 'Error occurred';
                    callback(null, res);
                }
                if (menu) {
                    menu = menu;
                    console.log(JSON.stringify(menu));
                    callback(null, menu);
                }
            });
        // });
// });
}

exports.handle_edit_menu = handle_edit_menu;