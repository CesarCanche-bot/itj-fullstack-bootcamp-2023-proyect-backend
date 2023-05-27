const express = require("express");
const FoodController = require("../controllers/food");
const router = express.Router();

router.get("/", FoodController.getFoods);
router.post("/", FoodController.createFood)

module.exports = router;