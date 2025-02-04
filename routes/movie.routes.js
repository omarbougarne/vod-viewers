import express from 'express';
const router = express.Router();
import { getMovies, getMovie, createMovie, updateMovie, deleteMovie } from '../controllers/movieController.js';

import { getComments } from '../controllers/commentController.js'; 
import authMiddleware from '../middleware/authMiddleware.js';

router.get('/', getMovies);
router.get('/:id', getMovie);
router.get('/:id/comments', getComments); 

router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;
