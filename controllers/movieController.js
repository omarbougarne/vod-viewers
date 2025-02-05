import { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } from '../services/movieService.js';

const getMoviesController = async (req, res) => {
  try {
    const movies = await getMovies();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMovieController = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await getMovieById(id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMovieController = async (req, res) => {
  try {
    // if (!req.file) {
    //   return res.status(400).json({ message: 'Image is required' });
    // }

    const savedMovie = await createMovie(req.body);
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateMovieController = async (req, res) => {
  try {
    const updatedMovie = await updateMovie(req.params.id, req.body);
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteMovieController = async (req, res) => {
  try {
    const response = await deleteMovie(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getMoviesController, getMovieController, createMovieController, updateMovieController, deleteMovieController };
