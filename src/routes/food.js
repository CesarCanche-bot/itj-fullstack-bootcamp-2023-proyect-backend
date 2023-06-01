const express = require("express");
const FoodController = require("../controllers/food");
const router = express.Router();

router.get("/", FoodController.getFoods);
router.get("/:id", FoodController.getFoodById);
router.post("/", FoodController.createFood)
router.put("/:id", FoodController.updateFood);
router.delete("/:id", FoodController.deleteFood);

module.exports = router;