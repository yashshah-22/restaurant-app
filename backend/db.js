const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://yashshah2280:NJRoY0v5U2pr0Nfn@cluster0.pmcs6kt.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected!");

    const fetched_data = mongoose.connection.collection("food_items");
    const data = await fetched_data.find({}).toArray();

    const foodCategory = mongoose.connection.collection("foodCategory");
    const catData = await foodCategory.find({}).toArray();

    global.food_items = data;
    global.foodCategory = catData;
  } catch (err) {
    console.error(err);
  }
};

module.exports = mongoDB;
