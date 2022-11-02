const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
const broccoliPasta = {title: 'Broccoli Pasta', level: 'Easy Peasy', ingredients: ['Fusilli pasta','Broccoli','Cherry tomatoes','Zucchini','Basil','Parmesan cheese'], cuisine: 'italian', dishType: 'main_course', duration: 30, creator: 'Massimo Bottura'}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany()
  })
  .then(() => Recipe.create(broccoliPasta))
  // .then(newRecipe => console.log(newRecipe))
  .then(() => Recipe.insertMany(data))
  // .then(allRecipes => allRecipes.forEach(recipe => console.log(recipe.title))) 
  .then(() => Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true}))
  // .then(updatedRecipe => console.log(updatedRecipe))
  .then(() => Recipe.deleteOne({title: 'Carrot Cake'}))
  // .then(deltedRecipe => console.log(deltedRecipe))
  .then(()=>mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
