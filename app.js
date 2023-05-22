require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.APP_PORT ?? 5000;
app.use(express.json());

const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.putMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);
app.post("/api/users", usersHandlers.postUser);
app.put("/api/users/:id", usersHandlers.putUser);
app.delete("/api/users/:id", usersHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
