import {validateSession, Session} from '../models/sessionModel.js';


const getSessions = async (req, res) => {
    try {
        const sessions = await Session.find().populate('movie room createdBy');
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).send('Error retrieving sessions.');
    }
};
const createSession = async (req, res) => {
    const { error } = validateSession(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { movieId, roomId, startTime, endTime } = req.body;

    try {
        const session = new Session({
            movie: movieId,
            room: roomId,
            startTime,
            endTime,
            createdBy: req.user._id
        });

        await session.save();  
        

        res.status(201).json(session);
    } catch (error) {
        res.status(500).send('Error creating session.');
    }
};




export  {getSessions,createSession};
