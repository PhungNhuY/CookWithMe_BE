const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Category', new Schema(
    {
        name: {
            type: String,
            required: [true, "missing category name"],
            unique: true,
        },
        description: String,
        image_cover: String,
    },
    {
        timestamps: true,
    }
));