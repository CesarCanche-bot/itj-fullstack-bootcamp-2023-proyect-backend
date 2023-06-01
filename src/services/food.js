const { request } = require("express");
const Food = require("../models/food");
const food = require("../models/food");

exports.getFoods = async () => {
  let foods = await Food.find().lean().exec();
  return foods;
};

exports.getFoodById = async(id) =>{
  let project = await Food.findById(id).lean().exec();
  return project;
}

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

exports.updateFood = async (id, foodData) => {
  return await Food.findByIdAndUpdate(id, foodData, { new: true })
    .lean()
    .exec();
};

exports.deleteFood = async (id) => {
  await Food.findByIdAndDelete(id).exec();
};
