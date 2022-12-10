const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
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
            // default: '/images/default_avatar.png',
            default: null,
        },
        role: {
            type: String,
            enum: {
                values: ["user", "admin"],
                message: "Role {VALUE} is invalid",
            },
            default: "user",
        },
        status: {
            type: String,
            enum: {
                values: ["inactivated", "activated", "locked", "banned", "deleted"],
                message: "Status {VALUE} is invalid",
            },
            default: "inactivated",
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt)
        this.password = hashPassword;
    }
    next();
});

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;