const UserModel = require('../models/userModel');
const SessionModel = require('../models/sessionModel');
const { codeEnum } = require('../enums/status-code.enum');
const { msgEnum } = require('../enums/message.enum');
const { statusEnum } = require('../enums/status.enum');
const mailService = require('../utils/sendMail');
const createOTP = require('../utils/createOTP');
const { remove } = require('../models/userModel');
const mongoose = require('mongoose');

class AuthController {
    // POST auth/login
    async login(req, res, next) {
        try {
            const emailFromClient = req.body.email;
            const passwordFromClient = req.body.password;

            // validate input data
            if (!emailFromClient || !passwordFromClient) {
                return res.status(codeEnum.BAD_REQUEST).json({
                    status: statusEnum.FAIL,
                    message: msgEnum.MISSING_LOGIN_DATA,
                });
            }

            // find user in database
            const user = await UserModel.findOne({ email: emailFromClient }).select("+password");
            if (!user) {
                return res.status(codeEnum.BAD_REQUEST).json({
                    status: statusEnum.FAIL,
                    message: msgEnum.USER_NOT_EXIST,
                });
            }

            // compare password
            const isMatch = await user.matchPassword(passwordFromClient);
            if (!isMatch) {
                return res.status(codeEnum.BAD_REQUEST).json({
                    status: statusEnum.FAIL,
                    message: msgEnum.INCORRECT_PASSWORD,
                });
            }

            // check status
            if(user.status != "activated"){
                return res.status(codeEnum.SUCCESS).json({
                    status: statusEnum.FAIL,
                    message: msgEnum.USER_INACTIVATED,
                });
            }

            // gen session id
            await SessionModel.findOneAndDelete({ user_id: user._id });
            const session = await SessionModel.create({
                user_id: user._id,
                exp: new Date(new Date().getTime() + 86400000 * 7),
            });

            return res.status(codeEnum.SUCCESS).json({
                status: statusEnum.SUCCESS,
                data: {
                    session: session._id,
                    exp: session.exp,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    // POST auth/register
    async register(req, res, next) {
        try {
            // check email in DB
            const emailFromClient = req.body.email;
            const user = await UserModel.findOne({ email: emailFromClient });
            if (user && user.status != "inactivated") {
                // user exsit
                return res.status(codeEnum.BAD_REQUEST).json({
                    status: statusEnum.FAIL,
                    message: msgEnum.EMAIL_EXISTED,
                });
            } else {
                // user does not exsit
                req.body.otp = createOTP();
                await UserModel.findOneAndDelete({ email: emailFromClient });
                let user = await UserModel.create(req.body);

                // await mailService({
                //     email: user.email,
                //     subject: "this is your OTP",
                //     message: user.otp,
                // });
                console.log(user.otp);

                user = await UserModel.find({ email: emailFromClient });
                return res.status(codeEnum.CREATED).json({
                    status: statusEnum.SUCCESS,
                    data: user,
                });
            }
        } catch (error) {
            next(error);
        }
    }

    // POST auth/checkOtp/{:id}
    async checkOtp(req, res, next) {
        try {
            const emailFromClient = req.body.email;
            const otpFromClient = req.body.otp;
            const user = await UserModel.findOne({ email: emailFromClient }).select("+otp");
            if (!user) {
                return res.status(codeEnum.NOT_FOUND).json({
                    status: statusEnum.FAIL,
                    message: msgEnum.USER_NOT_EXIST,
                });
            }
            if (user.otp == otpFromClient) {
                user.status = "activated";
                await user.save();
                console.log("check otp: success");
                return res.status(codeEnum.SUCCESS).json({
                    status: statusEnum.SUCCESS,
                });
            } else {
                console.log("check otp: fail");
                return res.status(codeEnum.BAD_REQUEST).json({
                    status: statusEnum.FAIL,
                });
            }
        } catch (error) {
            next(error);
        }
    }

    // POST auth/logout
    logout(req, res, next) {
        res.send("logout");
    }

    // ???
    // POST auth/fogotPassword
    fogotPassword(req, res, next) {
        res.send("fogotPassword");
    }
}

module.exports = new AuthController();