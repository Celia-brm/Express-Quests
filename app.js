require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.APP_PORT ?? 5000;
app.use(express.json());

const movieHandlers = require("./src/movieHandlers");
const usersHandlers = require("./src/usersHandlers");
const { hashPassword, verifyPassword, verifyToken } = require("./src/auth.js");

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

// const isItDwight = (req, res) => {
//   if (
//     req.body.email === "dwight@theoffice.com" &&
//     req.body.password === "123456"
//   ) {
//     res.send("Credentials are valid");
//   } else {
//     res.sendStatus(401);
//   }
// };

// app.post("/api/login", isItDwight);

app.get("/", welcome);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", hashPassword, movieHandlers.postMovie);

app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.updateUser);
app.post("/api/users", hashPassword, usersHandlers.postUser);

app.post(
  "/api/login",
  usersHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
); // /!\ login should be a public route

// then the routes to protect
app.use(verifyToken); // authentication wall : verifyToken is activated for each route after this line

app.put("/api/users/:id", hashPassword, usersHandlers.updateUser);

// app.put("/api/movies/:id", hashPassword, movieHandlers.updateMovie);
// app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.delete("/api/users/:id", usersHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
