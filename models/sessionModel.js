import mongoose from 'mongoose';
import Joi from'joi';

const sessionSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true  
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isAllowed: {
        type: Boolean,
        default: true  
    }
});

sessionSchema.post('save', function () {
    const session = this;
    setTimeout(async () => {
        const now = new Date();
        if (session.endTime <= now) {
            await markRoomAsAvailable(session);
            session.isActive = false;
            await session.save();
        }
    }, session.endTime - session.startTime);
});

const validateSession = (data) => {
    const schema = Joi.object({
        movieId: Joi.string().hex().length(24).required().label('Movie ID'),
        roomId: Joi.string().hex().length(24).required().label('Room ID'),
        startTime: Joi.date().iso().required().label('Start Time'),
        endTime: Joi.date().iso().required().greater(Joi.ref('startTime')).label('End Time'),
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        isAllowed: Joi.boolean().default(true).label('Is Allowed')
        // createdBy: Joi.string().hex().length(24).required().label('Created By'),  
    });

    return schema.validate(data);
};

const Session = mongoose.model('Session', sessionSchema);

export {
    Session,
    validateSession
};
