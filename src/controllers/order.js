const OrderService = require("../services/order");

exports.createOrder = async (req, res) => {
  try {
    const orderSaved = await OrderService.createOrder(req.body);
    res.status(201).json({ orderSaved: orderSaved, message: "Order created" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Was not able to create the order" });
  }
};
