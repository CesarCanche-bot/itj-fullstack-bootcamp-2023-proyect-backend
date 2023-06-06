const request = require("supertest");
const app = require("../../../app").app;
const Food = require("../../models/food");

const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect(process.env.DATABASE_URL);
});

afterAll(async (done) => {
  await mongoose.disconnect();
  await app.close(done);
});

const FoodOne = {
  name: "salbut one",
  price: 200,
  discount: 10,
  imageUrl:
    "https://editorialtelevisa.brightspotcdn.com/dims4/default/8adbc70/2147483647/strip/true/crop/600x338+0+31/resize/1000x563!/quality/90/?url=https%3A%2F%2Fk2-prod-editorial-televisa.s3.amazonaws.com%2Fbrightspot%2Fwp-content%2Fuploads%2F2021%2F05%2Fcarne-cochinita.jpg",
  description:
    "La cochinita pibil es un plato icónico de la cocina mexicana, originario de la región de Yucatán. Se trata de carne de cerdo marinada y cocida lentamente en una salsa a base de achiote, que le da su característico color rojizo y un sabor único. La marinada también incluye otros ingredientes como jugo de naranja agria, ajo, comino, orégano y otras especias y condimentos. La preparación de la cochinita pibil tradicionalmente implica envolver la carne marinada en hojas de plátano y cocinarla en un horno subterráneo llamado PIB. Sin embargo, en la actualidad, se puede preparar utilizando métodos de cocción alternativos, como el horno convencional o la olla de cocción lenta. El resultado final es una carne de cerdo tierna y jugosa, llena de sabores intensos y aromáticos. La cochinita pibil se desmenuza fácilmente y se suele servir en tacos o tortas, acompañada de cebolla morada encurtida, cilantro y salsa de chile habanero. Su sabor es equilibrado, con un ligero toque cítrico y notas ahumadas provenientes del achiote y la cocción lenta. La cochinita pibil es un platillo muy apreciado en la gastronomía mexicana, tanto a nivel nacional como internacional. Su combinación de sabores y texturas la convierte en una experiencia culinaria deliciosa y representativa de la rica tradición culinaria de la región de Yucatán.",
  ingredients: [
    "Carne de cerdo",
    "Achiote",
    "Jugo de naranja agria",
    "Ajo",
    "Comino",
    "Orégano",
    "Cebolla",
    "Vinagre",
    "Sal",
    "Pimienta",
    "Hojas de plátano (para envolver la carne)",
    "Cebolla morada (para acompañar)",
    "Cilantro (para acompañar)",
    "Salsa de chile habanero (para acompañar)",
  ],
};

const FoodTwo = {
  name: "salbut one",
  price: 200,
  discount: 10,
  imageUrl:
    "https://editorialtelevisa.brightspotcdn.com/dims4/default/8adbc70/2147483647/strip/true/crop/600x338+0+31/resize/1000x563!/quality/90/?url=https%3A%2F%2Fk2-prod-editorial-televisa.s3.amazonaws.com%2Fbrightspot%2Fwp-content%2Fuploads%2F2021%2F05%2Fcarne-cochinita.jpg",
  description:
    "La cochinita pibil es un plato icónico de la cocina mexicana, originario de la región de Yucatán. Se trata de carne de cerdo marinada y cocida lentamente en una salsa a base de achiote, que le da su característico color rojizo y un sabor único. La marinada también incluye otros ingredientes como jugo de naranja agria, ajo, comino, orégano y otras especias y condimentos. La preparación de la cochinita pibil tradicionalmente implica envolver la carne marinada en hojas de plátano y cocinarla en un horno subterráneo llamado PIB. Sin embargo, en la actualidad, se puede preparar utilizando métodos de cocción alternativos, como el horno convencional o la olla de cocción lenta. El resultado final es una carne de cerdo tierna y jugosa, llena de sabores intensos y aromáticos. La cochinita pibil se desmenuza fácilmente y se suele servir en tacos o tortas, acompañada de cebolla morada encurtida, cilantro y salsa de chile habanero. Su sabor es equilibrado, con un ligero toque cítrico y notas ahumadas provenientes del achiote y la cocción lenta. La cochinita pibil es un platillo muy apreciado en la gastronomía mexicana, tanto a nivel nacional como internacional. Su combinación de sabores y texturas la convierte en una experiencia culinaria deliciosa y representativa de la rica tradición culinaria de la región de Yucatán.",
  ingredients: [
    "Carne de cerdo",
    "Achiote",
    "Jugo de naranja agria",
    "Ajo",
    "Comino",
    "Orégano",
    "Cebolla",
    "Vinagre",
    "Sal",
    "Pimienta",
    "Hojas de plátano (para envolver la carne)",
    "Cebolla morada (para acompañar)",
    "Cilantro (para acompañar)",
    "Salsa de chile habanero (para acompañar)",
  ],
};

describe("GET /foods", () => {
  it("should return all foods in database", async () => {
    await Food.deleteMany();
    await Food.create(FoodOne);
    await Food.create(FoodTwo);

    const response = await request(app).get("/foods");
    expect(response.status).toBe(200);

    const foods = response.body.foods;

    expect(Array.isArray(foods)).toBe(true);
    expect(foods.length).toEqual(2);
    expect(foods).toEqual(
      expect.arrayContaining([expect.objectContaining(FoodOne)]),
      expect.arrayContaining([expect.objectContaining(FoodTwo)])
    );
  });
});

describe("POST /foods", () => {
    it("should create a new projects and return a created status code", async () => {
      const response = await request(app).post("/foods").send(FoodOne);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.foodSaved).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          name: FoodOne.name,
          price: FoodOne.price,
          discount: FoodOne.discount,
          imageUrl: FoodOne.imageUrl,
          description: FoodOne.description,
          ingredients: FoodOne.ingredients,
        })
      );
  
      await Food.findByIdAndDelete(response.body.foodSaved._id);
    });
  
    it("should return a 400 code and an error message when required fields are missing", async () => {
      const { name, ...incompleteFood } = FoodOne;
  
      const response = await request(app)
        .post("/foods")
        .send(incompleteFood);
  
      expect(response.statusCode).toBe(400);
      expect(response.error.text).toContain("was not able to create the food");
    });
  });