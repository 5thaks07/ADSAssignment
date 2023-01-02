const { runInNewContext } = require("vm");
const { findById } = require("../models/Movie");
const Movie = require("../models/Movie");

exports.create = async (req, res) => {
    
    try {
        let movie = new Movie({ title: req.body.title, release_year: req.body.ry, score: req.body.sc });
         await movie.save(); 
         res.redirect(`/allmovies/?message= ${req.body.title} has been added `);
    } catch (e) {
        if(e.errors){
            res.render("add-movie", { errors: e.errors });
        }
        return res.status(400).send({ message: JSON.parse(e) });
    }
};
exports.list = async (req, res) => {
    try {
          const movies = await Movie.find({});
          res.render("allmovies", { movies: movies, message: req.query?.message });
    } catch (e)  {
           res.status(404).send({ message: "could not find movie" }); 
    }
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
         await Movie.findByIdAndRemove(id);
          res.redirect("/allmovies");
    } catch (e)  {
           res.status(404).send({ message: "could not delete movie" }); 
    }
};
exports.edit = async (req, res) => {
    const id = req.params.id;
    try {
          const movie = await Movie.findById(id);
          res.render("update-movie", { movie: movie, id: id, errors: {} });
    } catch (e)  {
           res.status(404).send({ message: "could not find the movie" }); 
    }
};
exports.update = async (req, res) => {
      const id = req.params.id;
    try {
        await Movie.updateOne({ _id: id }, req.body);
        const movie = Movie.findById(id);
         res.redirect(`/allmovies/?message= ${req.body.title} has been updated `);
    } catch (e) {
        if(e.errors){
            res.render("update-movie", { errors: e.errors });
        }
        return res.status(400).send({ message: JSON.parse(e) });
    }
};
