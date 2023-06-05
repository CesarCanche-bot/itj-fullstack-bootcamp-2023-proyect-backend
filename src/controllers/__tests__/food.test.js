const Chance = require("chance");

//What we want to test
const FoodController = require("../food");

//Dependencies
const FoodService = require("../../services/food");

const chance = new Chance();

//Mock dependencies
jest.mock("../../services/food");

describe("When calling Get food controller", () => {
  beforeEach(() => {
    id = chance.guid();
    foodData = {
      name: chance.name(),
      description: chance.string(),
    };
    updatedFood = foodData;
    req = {
      params: { id },
      body: foodData,
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    global.console = { log: jest.fn(), error: jest.fn() };

    FoodService.updateFood = jest.fn().mockResolvedValue(updatedFood);
  });

  it("should call FoodService.getFoods", async () => {
    //ACT
    await FoodController.getFoods(req, res);

    //ASSERT
    expect(FoodService.getFoods).toBeCalled();
  });

  it("should call res.status with 500 when the FoodService.getFoods service fails", async () => {
    //ARRANGE
    const error = new Error();
    FoodService.getFoods = jest.fn().mockRejectedValue(error);

    //ACT
    await FoodController.getFoods(req, res);

    //ASSERT
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe("when calling update food controller", () => {
  let id, foodData, updatedFood, req, res;

  beforeEach(() => {
    id = chance.guid();
    foodData = {
      name: chance.name(),
      description: chance.string(),
    };
    updatedFood = foodData;
    req = {
      params: { id },
      body: foodData,
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    global.console = { log: jest.fn(), error: jest.fn() };

    FoodService.updateFood = jest.fn().mockResolvedValue(updatedFood);
  });

  it("should call FoodService.updateFood with the id and foodData", async () => {
    //ACT
    await FoodController.updateFood(req, res);

    //ASSERT
    expect(FoodService.updateFood).toHaveBeenCalledWith(id, foodData);
  });

  it("should call res.status with a 200 status code", async () => {
    await FoodController.updateFood(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should call res.json with the updated food data", async () => {
    await FoodController.updateFood(req, res);

    expect(res.json).toHaveBeenCalledWith(updatedFood);
  });

  it("should call res.status with 500 when the FoodService.updateFood service fails", async () => {
    //ARRANGE
    const error = new Error();
    FoodService.updateFood = jest.fn().mockRejectedValue(error);

    //ACT
    await FoodController.updateFood(req, res);

    //ASSERT
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
