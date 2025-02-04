

const mongoose = require('mongoose');
//todo joi

const ratingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    score: { type: Number, min: 0, max: 10, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
