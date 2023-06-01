const Order = require("../models/order");

exports.createOrder = async (requestBody) => {
  const order = new Order({
    nameUser: requestBody.nameUser,
    addressUser: requestBody.addressUser,
    foods: requestBody.foods
  });
  return await order.save();
};
