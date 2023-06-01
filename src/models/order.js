const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  _idFood: { type: String, required: true },
  itemNumber: {
    type: Number,
    required: true,
  },
  price: { type: Number, required: true },
  name: { type: String, required: true },
});

const orderSchema = new Schema({
  nameUser: { type: String, required: true },
  addressUser: { type: String, required: true },
  foods: { type: [foodSchema], required: true },
});

module.exports = mongoose.model("Order", orderSchema);
