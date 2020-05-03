const Movie = require("../models/video");

exports.newMovie = (req, res, next) => {
  const title = req.body.title;
  const category = req.body.category;
  const type = req.body.type;
  const description = req.body.description;
  const year = req.body.year;
  const director = req.body.director;
  const starring = req.body.starring;
  const genres = req.body.genres;
  const fileName = req.body.fileName;
  const imageUrl = req.body.imageUrl;
  const thumbnailUrl = req.body.thumbnailUrl;

  const movie = new Movie({
    title: title,
    category: category,
    type: type,
    description: description,
    year: year,
    director: director,
    starring: starring,
    genres: genres,
    fileName: fileName,
    imageUrl: imageUrl,
    thumbnailUrl: thumbnailUrl,
  });

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
