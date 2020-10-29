const mongoose = require('mongoose');

const { Schema } = mongoose;

const customerProfileSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  choosingSince: { type: Date },
  dob: { type: Date },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  phoneNumber: { type: String },
  nickname: { type: String },
  headline: { type: String },
  favorites: { type: String },
  profileImage: [String],
},
{
  versionKey: false,
});

module.exports = mongoose.model('customerProfile', customerProfileSchema);
