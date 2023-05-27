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

exports.createFood = async (req, res) => {
  try {
    let foodSaved = await FoodService.createFood(req.body);
    res.status(201).json({ message: "Food created", foodSaved: foodSaved });
  } catch (err) {
    console.error("err");
    res.status(400).json({
      message: "was not able to create the project",
    });
  }
};
