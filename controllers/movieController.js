
import cloudinary from 'cloudinary'
import { Movie, validateMovie } from'../models/movieModel.js';
import mongoose from 'mongoose'


const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find(); 
        res.status(200).send(movies);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching movies' });
    }
};

const getMovie = async (req, res) => {
    try {
        const { id } = req.params; 
        const movie = await Movie.findOne({ _id: id });
        if (!movie) {
            return res.status(404).send({ message: "Movie not found" });
        }
        res.status(200).send(movie);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};


const createMovie = async (req, res) => {
    try {
        
        if (!req.file) {
            return res.status(400).json({ message: 'Image is required' });
        }

        const { title, genre, description, releaseDate, videoUrl } = req.body;

        const newMovie = {
            title,
            genre,
            description,
            releaseDate,
        };

        
        const savedMovie = await Movie.create(newMovie);
        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(500).json({ message: 'Error creating movie', error });
    }
};



const updateMovie = async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).send({ message: 'Movie not found' });

        
        if (movie.createdBy.toString() !== req.user._id)
            return res.status(403).send({ message: 'Unauthorized to update this movie' });

        Object.assign(movie, req.body);  
        await movie.save();
        res.status(200).send(movie);
    } catch (err) {
        res.status(500).send({ message: 'Error updating movie' });
    }
};


const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).send({ message: 'Movie not found' });

        
        if (movie.createdBy.toString() !== req.user._id)
            return res.status(403).send({ message: 'Unauthorized to delete this movie' });

        await movie.remove();
        res.status(200).send({ message: 'Movie deleted successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Error deleting movie' });
    }
};

export { getMovies, createMovie, updateMovie, deleteMovie, getMovie };



