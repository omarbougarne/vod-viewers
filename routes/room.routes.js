import express from 'express'
const router = express.Router();
import { getRooms, bookSeat, createRoom, updateRoom, deleteRoom } from '../controllers/roomController.js';
// const authMiddleware = require('../middleware/authMiddleware')

router.get('/', getRooms);


router.post('/book-seat', bookSeat);


router.post('/', createRoom);


router.put('/:roomId', updateRoom);


router.delete('/:roomId', deleteRoom);
export default  router;
