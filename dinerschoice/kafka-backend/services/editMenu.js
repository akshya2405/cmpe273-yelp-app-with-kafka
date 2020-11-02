const mongo = require('mongodb');
const { mongoDB } = require('../../Backend/config/auth.config');

function getNextSequenceValue(sequenceName){
    var sequenceDocument = db.counters.findAndModify({
        query:{_id: sequenceName },
        update: {$inc:{sequence_value:1}},
        new:true
    });
    return sequenceDocument.sequence_value;
}

// TODO: Edit this part with findOneAndUpdate
function handle_edit_menu(msg, callback) {
  let res ={};
  console.log('in get request restaurant profile');
  mongo.connect(mongoDB,function (err, db){
      if (err) {
          callback(null, 'Cannot connect to db');
      } else {
        console.log('connected to db');
        const options = { returnOriginal: false, upsert: true }
        let collectionName = '';
        const { id, updateList, deleteList } = msg;
        const findrestId = new mongo.ObjectID(id);
        collectionName = db.collection('menu');
        updateList.map((dish) => {
            const finddishId = new mongo.ObjectID(dish._id);
            const update = {
                "$set": {
                    restId : findrestId,
                    dishName: dish.dishName,

                }};
            collectionName.findOneAndUpdate({ restId:findrestId, _id: finddishId },
                update, options, function (error, result) {
                    if (error) {
                        console.log(error);
                        res.status = 500
                        res.message = 'Error occurred';
                        db.close();
                        callback(null, res);
                    }
                    if (result) {
                        console.log(JSON.stringify(result.value));
                    }
                });
        });
        collectionName.find({restId: findrestId}).toArray(function (error, dishes) {
            if (error) {
                console.log(error);
                res.status = 500;
                res.message = 'Error occurred';
                db.close();
                callback(null, res);
            }
            if (dishes) {
                console.log(JSON.stringify(dishes));
                db.close();
                callback(null, dishes);
            }
        })
      }
  });
}

exports.handle_edit_menu = handle_edit_menu;