const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Category', new Schema(
    {
        name: {
            type: String,
            require: [true, "missing name"],
        },
        description: String,
        image_cover: String,
    },
    {
        timestamps: true,
    }
));