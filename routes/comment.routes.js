import express from 'express'
const router = express.Router();
import { createComment } from '../controllers/commentController.js'

// const authMiddleware = require('../middleware/authMiddleware')

router.post('/', createComment)


export default  router;