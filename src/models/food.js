const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    require: true,
  },
  discount: { type: Number, require: true },
  rate: { type: Number },
  imageUrl: { type: String, require: true },
  description: { type: String, require: true },
  ingredients: { type: [{ type: String }], require: true },
});

module.exports = mongoose.model("Food", foodSchema);
