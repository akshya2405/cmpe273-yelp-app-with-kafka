const mongoose = require('mongoose');

const { Schema } = mongoose;

const usersSchema = new Schema({
  category: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
},
{
  versionKey: false,
});

module.exports = mongoose.model('user', usersSchema);
