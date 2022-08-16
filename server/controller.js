const movies = require("./db.json");
let globalID = 11;

module.exports = {
    getMovies: (req, res) => {
        res.status(200).send(movies);
    },
    deleteMovie: (req, res) => {
        const id = Number(req.params.id);
        const index = movies.findIndex(element => element.id === id);
        movies.splice(index, 1);
        res.status(200).send(movies);
    },
    createMovie: (req, res) => {
        let { title, rating, imageURL } = req.body;
        rating = Number(rating);
        const newMovie = {
            id: globalID,
            title,   //same as typing title: title
            rating,
            imageURL,
        };
        movies.push(newMovie);
        res.status(200).send(movies);

        // increments the id of additional movies that are added later
        globalID++;
    },
    updateMovie: (req, res) => {
        let { id } = req.params;
        id = Number(id);
        const { type } = req.body;
        const index = movies.findIndex(element => element.id === id);

        // increments or decrements rating based on various conditions
        if (movies[index].rating === 5 && type === "plus") {
            res.status(400).send("rating cannot be higher than 5");
        } else if (movies[index].rating === 0 && type === "minus") {
            res.status(400).send("rating cannot go below 0");
        } else if (type === "plus") {
            movies[index].rating++;
            res.status(200).send(movies);
        } else if (type === "minus") {
            movies[index].rating--;
            res.status(200).send(movies);
        } else {
            res.sendStatus(400);
        }
    }
}