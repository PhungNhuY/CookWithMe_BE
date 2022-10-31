const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Session', new Schema(
    {
        user_id: mongoose.ObjectId,
        exp: Date,
    },
    {
        timestamps: true,
    }
));