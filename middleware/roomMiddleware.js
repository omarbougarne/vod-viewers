const mongoose = require('mongoose');
const Room = mongoose.model('Room'); 


const markRoomAsUnavailable = async (req, res, next) => {
    try {
        const { roomId } = req.body; 
        console.log(`Looking for room with ID: ${roomId}`); 
        const roomObj = await Room.findById(roomId);
        console.log(`Room found:`, roomObj); 

        if (!roomObj) {
            return res.status(404).send('Room not found.');
        }

        if (!roomObj.isAvailable) {
            console.log(`Room ID: ${roomId} is not available.`);
            return res.status(400).send('Room is already in use.');
        }
        

        roomObj.isAvailable = false;  
        await roomObj.save();
        next();
    } catch (error) {
        console.error('Error checking room availability:', error); 
        return res.status(500).send('Error checking room availability.'); 
    }
};



const markRoomAsAvailable = async (session) => {
    try {
        const room = await Room.findById(session.room);
        if (room) {
            room.isAvailable = true;  
            await room.save();
        }
    } catch (error) {
        console.error('Error marking room as available:', error);
    }
};

module.exports = {
    markRoomAsUnavailable,
    markRoomAsAvailable
};
