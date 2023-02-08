// Module imports
require('dotenv').config()
const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

// Controller imports
const foodController = require("./controllers/foodController");
const userController = require("./controllers/userController");
const cookieController = require("./controllers/cookieController");

// Database connection
const mongoURI = "mongodb+srv://goblinshark:codesmith@foodremedy.nl2qzoj.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Succesffuly connected to MongoDB."))
  .catch((err) => console.log(`Failed to connect to MongoDB: ${err}.`));

// Server initialization
const app = express();
const PORT = 3000;

// Enable CORS for all origins, parse JSON payloads, parse cookies
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser())

// Deliver static files
app.use(express.static(path.resolve(__dirname, "../client")));

// Route to fetch results for selected illness
app.post(
  "/search",
  foodController.getFoods,
  foodController.getFacts,
  (req, res) => {
    return res.status(200).send(res.locals.facts)
  }
);

// Route to create new user
app.post("/signup", 
  userController.createUser,
  cookieController.setSessionCookie,
  (req, res) => {
    const { username } = res.locals.user;
    return res.status(200).json(username);
});

// Route to log user in
app.post("/login", 
  userController.verifyUser,
  cookieController.setSessionCookie,
  (req, res) => {
    const { username } = res.locals.user;
    return res.status(200).json(username);
});

// Route tave favorite food to user's favorite folder
app.patch("/user/addfav/:username", userController.addFavorite, (req, res) => {
  return res.status(200).json(res.locals.favorite);
});

// Route to get a collection of favorite food for a user
app.get("/user/:username", userController.getFavorite, (req, res) => {
  return res.status(200).json(res.locals.favorite);
});

// Route to delete a favorite food from a user's favorite collection
app.patch(
  "/user/deletefav/:username",
  userController.deleteFavorite,
  (req, res) => {
    return res.status(200).json(res.locals.favorite);
  }
);

// Catch all route
app.use('/', (req, res) => {
  return res.status(404).json({err: "Not found."})
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error.",
    status: 500,
    message: { err: "An unknown error occurred." },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`Success! Your application is running on port ${PORT}.`);
});
