
import mongoose from 'mongoose';
import Joi from 'joi';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String },
  releaseDate: { type: Date },
  videoUrl: { type: String },
  
});


export const Movie = mongoose.model('Movie', movieSchema);


export const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    genre: Joi.string().required(),
    description: Joi.string().optional(),
    releaseDate: Joi.date().optional(),
    videoUrl: Joi.string().optional(),
  });
  return schema.validate(movie);
};
export default Movie