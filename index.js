const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
mongoose.set("strictQuery", true);

// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI =
  "mongodb+srv://caiomazur:ironhack@cluster0.m24i5xu.mongodb.net/recipes?retryWrites=true&w=majority";

//Method 1 : Using Async Await

const applePie = {
  title: "Apple Pie",
  level: "Amateur Chef",
  ingredients: ["apple", "pie"],
  cuisine: "Eastern",
  dishType: "snack",
  image:
    "https://kristineskitchenblog.com/wp-content/uploads/2021/04/apple-pie-1200-square-592-2.jpg",
  duration: 2,
  creator: "Mr. Pie",
  /*   console.log(applePie) */
};

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Run your code here, after you have insured that the connection was made
    await Recipe.create(applePie);
    console.log(applePie.title);

    await Recipe.insertMany(data);
    console.log(data);

    data.forEach((element) => {
      console.log(element.title);
    });

    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      {
        duration: 100,
      }
    );
    console.log("Recipe Successfully Updated!");

    await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Recipe Deleted!");

    mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
