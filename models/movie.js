const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  fullPlot: {
    type: String,
  },
  poster: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  rated: {
    type: String,
  },
  language: [String], // english, German
  cast: [String], // Leonardo da Caprio,
  directors: [String],
  genres: [String],
  runtime: {
    type: Number,
  },
  released: {
    type: Date,
  },
  year: {
    type: Number,
  },
  imdb: {
    type: Number,
  },
  videoType: {
    type: String,
  },
  fileName: {
    type: String,
  },
  episodes: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  categorised: {
    type: String,
  },
  
},
{
  toJSON: {
    transform: function (doc, ret) {
      ret.thumbnail = "https://netflix-example.herokuapp.com/s3_images/"+ret.thumbnail,
      ret.poster = "https://netflix-example.herokuapp.com/s3_images/"+ret.poster

    }
  }
}
);

module.exports = mongoose.model("Movie", MovieSchema);
