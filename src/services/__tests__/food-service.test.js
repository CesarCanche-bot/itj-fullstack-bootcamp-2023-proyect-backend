const Chance = require("chance");

const FoodService = require("../food");

const Food = require("../../models/food");

const chance = new Chance();

jest.mock("../../models/food");

describe("when calling food delete method", () => {
  let id;

  beforeEach(() => {
    id = chance.string();

    Food.findByIdAndDelete = jest.fn().mockReturnThis();
    Food.exec = jest.fn().mockResolvedValue();
  });

  it("should call deleteFood with an ID property", async () => {
    await FoodService.deleteFood(id);
    expect(Food.findByIdAndDelete).toBeCalledWith(id);
  });
});

describe("when calling food updateFood service method", () => {
  let id, foodData, updatedFood;

  beforeEach(() => {
    id = chance.guid();
    projectData = {
      name: chance.name(),
      describe: chance.string(),
    };
    updatedFood = foodData;

    Food.findByIdAndUpdate = jest.fn().mockReturnThis();
    Food.lean = jest.fn().mockReturnThis();
    Food.exec = jest.fn().mockResolvedValue(updatedFood);
  });

  it("should call Food.findByIdAndUpdate with the id, food data and return document new property value", async () => {
    await FoodService.updateFood(id, foodData);

    expect(Food.findByIdAndUpdate).toBeCalledWith(id, foodData, {
      new: true,
    });
  });

  it("should call Food.lean", async () => {
    await FoodService.updateFood(id, foodData);

    expect(Food.lean).toBeCalled();
  });

  it("should call Food.exec", async () => {
    await FoodService.updateFood(id, foodData);

    expect(Food.exec).toBeCalled();
  });

  it("should return the updated food data", async () => {
    const result = await FoodService.updateFood(id, foodData);

    expect(result).toEqual(updatedFood);
  });
});
