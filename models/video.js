const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  year: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
  },
  starring: {
    type: String,
  },
  genres: {
    type: String,
  },
  fileName: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  thumbnailUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Video", videoSchema);
