const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const {getMovies, deleteMovie, createMovie, updateMovie} = require("./controller");

app.get("/api/movies", getMovies);
app.delete("/api/movies/:id", deleteMovie);
app.post("/api/movies", createMovie);
app.put('/api/movies/:id', updateMovie);



const SERVER_PORT = 4004;
app.listen(SERVER_PORT, () => console.log(`listening on ${SERVER_PORT}`));