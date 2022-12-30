const { runInNewContext } = require("vm");
const Movie = require("../models/Movie");

exports.create = async (req, res) => {
    let movie = new Movie({ title: req.body.title, release_year: req.body.ry, score: req.body.sc });
    try {
         await movie.save(); 
         res.redirect(`/index/?message= ${req.body.title} has been added `);
    } catch (e) {
        return res.status(400).send({message: JSON.parse(e)});
    }
};