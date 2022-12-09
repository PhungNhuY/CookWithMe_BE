const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema(
    {
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
        },
        post: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Post',
        },
    },
    {
        timestamps: true,
    }
);

favoriteSchema.index(
    {
        user_id:1,
        post_id:1
    },
    {
        unique: true,
        name: "user_id_post_id",
    }
);

const FavoriteModel = mongoose.model("Favorite", favoriteSchema);

module.exports = FavoriteModel;