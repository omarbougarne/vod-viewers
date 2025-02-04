import  mongoose from 'mongoose'

const seatSchema = new mongoose.Schema({
    seatNumber: { type: Number, required: true },  
    isBooked: { type: Boolean, default: false }    
});

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },  
    seats: [seatSchema]                      
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
