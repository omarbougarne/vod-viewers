import { Movie, validateMovie } from '../models/movieModel.js';

const getMovies = async () => {
  try {
    return await Movie.find();
  } catch (err) {
    throw new Error('Error fetching movies');
  }
};

const getMovieById = async (id) => {
  try {
    return await Movie.findOne({ _id: id });
  } catch (err) {
    throw new Error('Error fetching movie');
  }
};

const createMovie = async (movieData) => {
  try {
    const { title, genre, description, releaseDate } = movieData;
    const newMovie = { title, genre, description, releaseDate };
    return await Movie.create(newMovie);
  } catch (err) {
    throw new Error('Error creating movie');
  }
};

const updateMovie = async (id, movieData) => {
  try {
    const { error } = validateMovie(movieData);
    if (error) throw new Error(error.details[0].message);

    const movie = await Movie.findById(id);
    if (!movie) throw new Error('Movie not found');

    Object.assign(movie, movieData);
    await movie.save();
    return movie;
  } catch (err) {
    throw new Error('Error updating movie');
  }
};

const deleteMovie = async (id) => {
  try {
    const movie = await Movie.findById(id);
    if (!movie) throw new Error('Movie not found');
    await movie.remove();
    return { message: 'Movie deleted successfully' };
  } catch (err) {
    throw new Error('Error deleting movie');
  }
};

export { getMovies, getMovieById, createMovie, updateMovie, deleteMovie };
