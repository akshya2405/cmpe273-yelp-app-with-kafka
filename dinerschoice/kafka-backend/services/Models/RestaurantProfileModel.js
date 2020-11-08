const mongoose = require('mongoose');

const { Schema } = mongoose;

const restaurantProfileSchema = new Schema({
  id: {type :String, required: true},
  name: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String },
  contactInfo: { type: String },
  cuisine: { type: String },
  status: { type: String },
  mode: { type: String },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipcode: { type: Number, required: true },
  isopen: { type: Boolean },
  stars: { type: Number },
  reviewCount: { type: Number },
  profileImage: [String],
  dishes: [{
    dishName: { type: String },
    ingredients: { type: String },
    price: { type: Number },
    description: { type: String },
    category: { type: String },
    imageURL: { type: String },
  }],
  hours: [{
    dayOfWeek: { type: String },
    openTime: { type: String },
    closeTime: { type: String },
    openClose: { type: String },
  }],
},
{
  versionKey: false,
});

module.exports = mongoose.model('restaurantProfile', restaurantProfileSchema);
