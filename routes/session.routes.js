import express from 'express'
const router = express.Router();
import  {getSessions,createSession}  from '../controllers/sessionController.js';

// const authMiddleware = require('../middleware/authMiddleware');


router.post('/',  createSession);


router.get('/', getSessions);
// router.put('/:id', authMiddleware, updateSession);
// router.delete('/:id', authMiddleware, deleteSession);
export default  router;
