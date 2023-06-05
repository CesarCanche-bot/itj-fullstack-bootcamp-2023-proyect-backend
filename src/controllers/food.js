const FoodService = require("../services/food");

exports.getFoods = async (req, res) => {
  try {
    const foods = await FoodService.getFoods();
    res.json({ foods: foods });
  } catch (err) {
    console.error("err", err);
    res.status(500).json({
      message: "Foods were not retrieved",
    });
  }
};

exports.getFoodById = async (req, res) => {
  try {
    let food = await FoodService.getFoodById(req.params.id);
    res.json({
      food: food,
    });
  } catch (err) {
    console.error("err", err);
    res.status(404).json({ message: "Food was not found" });
  }
};

exports.createFood = async (req, res) => {
  try {
    let foodSaved = await FoodService.createFood(req.body);
    res.status(201).json({ message: "Food created", foodSaved: foodSaved });
  } catch (err) {
    console.error("err", err);
    res.status(400).json({
      message: "was not able to create the food",
    });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const foodData = req.body;
    const updatedFood = await FoodService.updateFood(id, foodData);
    res.status(200).json(updatedFood);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal error" });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    await FoodService.deleteFood(id);
    res.status(204).json();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal Error" });
  }
};
