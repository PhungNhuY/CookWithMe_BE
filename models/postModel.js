const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Post', new Schema(
    {
        author: ObjectId,
        title: {
            type: String,
            require: [true, "missing title"],
        },
        image_cover: String,
        steps: [{
            name: String,
            description: String,
            image_link: String,
        }],
        ingredients: [{
            name: String,
            unit: String,
            quantity: Number,
        }],
        video_link: String,
        categories: [mongoose.ObjectId],
    },
    {
        timestamps: true,
    }
));