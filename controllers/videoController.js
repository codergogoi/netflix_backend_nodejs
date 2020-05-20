const fs = require("fs");
const Movie = require("../models/movie");

exports.topVideos = (req, res, next) => {
  Movie.find({
    videoType: { $in: ["series", "movie", "tvshow"] },
  })
    .select("-fileName")
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.viewEpisodes = (req, res, next) => {
  const seriseId = req.params.id;
  Movie.findById(seriseId)
    .populate("episodes")
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch((err) => {
      err.statusCode = 500;
      next(err);
    });
};

exports.getWatchVideo = async (req, res, next) => {
  const movie_id = req.params.id;

  Movie.findById(movie_id)
    .then((movie) => {
      const path = "s3_videos/" + movie.fileName;
      const stat = fs.statSync(path);
      const fileSize = stat.size;
      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;
        const file = fs.createReadStream(path, { start, end });

        const head = {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Range": "bytes",
          "Content-Length": chunkSize,
          "Content-Type": "video/mp4",
        };

        res.writeHead(206, head);
        file.pipe(res);
      }
    })
    .catch((err) => {
      err.statusCode = 500;
      next(err);
    });

  /*

  const movie = await Movie.findById(movie_id);

  if (movie._id) {
    const path = "s3_videos/" + movie.fileName;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });

      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Range": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      res.status(404).json("Movie file Does not exist");
    }
  } else {
    res.status(404).json("Movie Does not exist");
  }
  */
};
