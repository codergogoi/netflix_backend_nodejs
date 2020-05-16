const Movie = require("../models/movie");
const Plan = require("../models/plan");

/**
 * Utility Functions
 */
function createMovie(req) {
  const {
    title,
    plot,
    fullPlot,
    poster,
    thumbnail,
    rated,
    language,
    cast,
    directors,
    genres,
    runtime,
    released,
    year,
    imdb,
    videoType,
    fileName,
    categorised,
  } = req.body;

  return new Movie({
    title: title,
    plot: plot,
    fullPlot: fullPlot,
    poster: poster,
    thumbnail: thumbnail,
    rated: rated,
    language: language,
    cast: cast,
    directors: directors,
    genres: genres,
    runtime: runtime,
    released: released,
    year: year,
    imdb: imdb,
    videoType: videoType,
    fileName: fileName,
    categorised: categorised,
    episodes: [],
  });
}

/**
 * Controller Functions
 */
exports.newPlan = (req, res, next) => {
  const title = req.body.title;
  const planType = req.body.planType;
  const description = req.body.description;
  const features = req.body.features;
  const price = req.body.price;
  const offer = req.body.offer;
  const support = req.body.support;

  let plan = new Plan({
    title: title,
    planType: planType,
    description: description,
    features: features,
    price: price,
    offer: offer,
    support: support,
  });

  plan
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(503).json(err);
    });
};

exports.newMovie = (req, res, next) => {
  const movie = createMovie(req);
  movie
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(503).json(err);
    });
};

exports.newEpisode = (req, res, next) => {
  const seriesId = req.params.id;
  const episode = createMovie(req);

  let currentSeries;

  Movie.findById(seriesId)
    .then((series) => {
      currentSeries = series;
      return episode.save();
    })
    .then((savedEpisod) => {
      currentSeries.episodes.push(savedEpisod);
      return currentSeries.save();
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(503).json(err);
    });
};
