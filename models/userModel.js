const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema(
    {
        email: {
            type: String,
            required: [true, "missing email address"],
            unique: [true, "email already exsits"],
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "wrong email format",
            ],
        },
        password: {
            type: String,
            required: [true, "missing password"],
            minLength: [8, "password too short"],
            select: false,
        },
        otp:{
            type: String,
            select: false,
        },
        fullname: {
            type: String,
            // required: [true, "missing fullname"],
            default: "default name",
        },
        avatar_link: {
            type: String,
            default: '/images/default_avatar.png',
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        status: {
            type: String,
            enum: ["inactivated", "activated", "locked", "banned", "deleted"],
            default: "inactivated",
        },
    },
    {
        timestamps: true,
    }
));