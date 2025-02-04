import Room from '../models/roomModel.js'


const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();  
        res.json(rooms);
    } catch (error) {
        res.status(500).send('Error fetching rooms.');
    }
};


const bookSeat = async (req, res) => {
    const { roomId, seatNumber } = req.body;  

    try {
        const room = await Room.findById(roomId);
        if (!room) return res.status(404).send('Room not found.');

        const seat = room.seats.find(s => s.seatNumber === seatNumber);
        if (!seat) return res.status(404).send('Seat not found.');

        if (seat.isBooked) return res.status(400).send('Seat is already booked.');

        seat.isBooked = true;  
        await room.save();     

        res.send('Seat booked successfully.');
    } catch (error) {
        res.status(500).send('Error booking seat.');
    }
};



const createRoom = async (req, res) => {
    const { name } = req.body;  
    const numberOfSeats = 30;   

    
    const seats = Array.from({ length: numberOfSeats }, (_, index) => ({
        seatNumber: index + 1,  
        isBooked: false         
    }));

    try {
        const newRoom = new Room({ name, seats });  
        await newRoom.save();  
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).send('Error creating room.');
    }
};



const updateRoom = async (req, res) => {
    const { roomId } = req.params;
    const updates = req.body;

    try {
        const room = await Room.findByIdAndUpdate(roomId, updates, { new: true });
        if (!room) return res.status(404).send('Room not found.');
        res.json(room);
    } catch (error) {
        res.status(500).send('Error updating room.');
    }
};


const deleteRoom = async (req, res) => {
    const { roomId } = req.params;

    try {
        const room = await Room.findByIdAndDelete(roomId);
        if (!room) return res.status(404).send('Room not found.');
        res.send('Room deleted successfully.');
    } catch (error) {
        res.status(500).send('Error deleting room.');
    }
};

export {
    getRooms,
    bookSeat,
    createRoom,
    updateRoom,
    deleteRoom
};
