const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    title: { type: String, required: [true, 'Title is required'], minlength: [2, "Title must be 3 chars long"] },
    release_year: { type: Number, required:[true, 'Release Year is required'] },
    score: { type: Number, required: [true, 'Score is required'], maxlength:[10,"score cannot be more than 10"] },
  },
  { timestamps: true }
);
movieSchema.index({'$**': 'text'});
module.exports = mongoose.model("Movie", movieSchema)