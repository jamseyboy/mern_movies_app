const Movie = require('../models/movie-model')

createMovie = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a movie',
        })
    }

    const movie = new Movie(body)

    if (!movie) {
        return res.status(400).json({ success: false, error: err })
    }

    movie
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: movie._id,
                message: 'Movie created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Movie not created!',
            })
        })
}

updateMovie = async (req, res) => {
    const body = req.body
    try{

        if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
        }
        const movies = await Movie.findOne({_id: req.params.id})
        if(!movies){
            return res.status(404).json({
                err,
                message: 'Movie not found!',
            })
        }
        movies.name = body.name
        movies.time = body.time
        movies.rating = body.rating
        await movies
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: movies._id,
                    message: 'Movie updated!',
                })
            });

    }
    catch (err){
        return res.status(404).json({
                    error,
                    message: 'Movie not updated!',
                })
    }
    
}

deleteMovie = async (req, res) => {
    try{

        const movies = await Movie.findOneAndDelete({ _id: req.params.id })
        if(!movies){
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: movies })

    }
    catch(err){
        return res.status(400).json({ success: false, error: err })
    }
}

getMovieById = async (req, res) => {
    try{
        const movies = await Movie.findOne({ _id: req.params.id.toString() });
        if (!movies) {
            return res.status(404).json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: movies })
    }
    catch(err){
        return res.status(400).json({ success: false, error: err.message });

    }
}

getMovies = async (req, res) => {
    try {
      const movies = await Movie.find({});
      if (!movies.length) {
        return res.status(404).json({ success: false, error: `Movie not found` })
      }
      return res.status(200).json({ success: true, data: movies });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }
  

module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    getMovies,
    getMovieById,
}