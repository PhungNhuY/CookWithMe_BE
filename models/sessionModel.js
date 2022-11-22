const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema(
    {
        user_id: mongoose.ObjectId,
        exp: Date,
    },
    {
        timestamps: true,
    }
);

const SessionModel = mongoose.model("Session", sessionSchema);

module.exports = SessionModel;