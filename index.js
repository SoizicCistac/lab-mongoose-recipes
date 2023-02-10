const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(async(x) => {
    // Run your code here, after you have insured that the connection was made
    try{
      const newRecipe = await Recipe.create({
        title: "Cookies",
        level: "Easy Peasy",
        ingredients: ["100g flour", "1 egg", "140g sugar", "180g chocolate drops", "100g butter"],
        cuisine: "American",
        dishType: "snack",
        image: "https://assets.afcdn.com/recipe/20190529/93153_w2000h1556c1cx2220cy1728cxb4441cyb3456.webp",
        duration: 20,
        creator: "myself"
      })
      console.log(newRecipe.title)

      const allRecipes = await Recipe.insertMany(data)

      allRecipes.forEach(recipe => {
        console.log(recipe.title)
      })
      
      const updateRecipe = await Recipe.findOneAndUpdate({
        title: "Rigatoni alla Genovese"}, 
        {duration: 100}, 
        {new: true} )

      console.log("recipe updated")

      const deleteRecipe = await Recipe.deleteOne({title: "Carrot Cake"})
      console.log("recipe deleted")

    } catch (error){
      console.log(error)
    }
    

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => {
    mongoose.connection.close()
  })
