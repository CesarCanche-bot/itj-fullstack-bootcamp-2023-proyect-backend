const { request } = require("express");
const Food = require("../models/food");

exports.getFoods = async () => {
  let foods = await Food.find().lean().exec();
  return foods;
};

exports.createFood = async (requestBody) => {
  const food = new Food({
    name: requestBody.name,
    price: requestBody.price,
    discount: requestBody.discount,
    rate: 5,
    imageUrl: requestBody.imageUrl,
    description: requestBody.description,
    ingredients: requestBody.ingredients,
  });

  return await food.save();
};
