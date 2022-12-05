const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Post', new Schema(
    {
        author: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
        },
        title: {
            type: String,
            required: [true, "missing title"],
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