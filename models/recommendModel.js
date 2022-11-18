const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Recommend', new Schema(
    {
        title: {
            type: String,
            required: [true, "missing title"],
        },
        description: {
            type: String,
        },
        image_link: String,
        categories: [mongoose.ObjectId],
    },
    {
        timestamps: true,
    }
));