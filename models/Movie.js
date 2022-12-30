const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    title:{ type: String, required: [true, 'Title is required'], minlength: [2, "Title must be 3 chars long"] },
    release_year: { type: Number },
    score: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema)