const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Recomment', new Schema(
    {
        title: {
            type: String,
            require: [true, "missing title"],
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