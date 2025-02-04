

import Comment from '../models/commentModel.js'
import Movie from '../models/movieModel.js'


const createComment = async (req, res) => {
    const { movieId, text } = req.body;
    const userId = req.user._id; 

    try {
        
        const comment = new Comment({
            user: userId,
            movie: movieId,
            text,
        });

        
        await comment.save();

        
        await Movie.findByIdAndUpdate(movieId, {
            $push: { comments: comment._id },
        });

        res.status(201).json(comment);
    } catch (err) {
        console.error('Error creating comment:', err);
        res.status(500).send('Server error');
    }
};


const getComments = async (req, res) => {
    const { movieId } = req.params;

    try {
        const comments = await Comment.find({ movie: movieId })
            .populate('user', 'username') 
            .exec();
        
        res.status(200).json(comments);
    } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).send('Server error');
    }
};

export {
    createComment,
    getComments,
};
