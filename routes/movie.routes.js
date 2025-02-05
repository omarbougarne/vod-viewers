import express from 'express';
const router = express.Router();
import { getMoviesController, getMovieController, createMovieController, updateMovieController, deleteMovieController } from '../controllers/movieController.js';

import { getComments } from '../controllers/commentController.js'; 
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

router.get('/', getMoviesController);
router.get('/:id', getMovieController);
router.get('/:id/comments', getComments); 

router.post('/', authMiddleware, roleMiddleware('admin'), createMovieController);
router.put('/:id', authMiddleware, roleMiddleware('admin'), updateMovieController);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteMovieController);


export default router;
