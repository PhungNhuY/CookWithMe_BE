const UserModel = require('../models/userModel');
const SessionModel = require('../models/sessionModel');
const { codeEnum } = require('../enums/status-code.enum');
const { msgEnum } = require('../enums/message.enum');
const { statusEnum } = require('../enums/status.enum');
const mailService = require('../utils/sendMail');
const createOTP = require('../utils/createOTP');

class AuthController {
    // POST auth/login
    async login(req, res, next) {
        console.log("---authController.login");
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
            if (user.status != "activated") {
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
                    token: session._id,
                    exp: session.exp,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    // POST auth/register
    async register(req, res, next) {
        console.log("---authController.register");
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

                if (process.env.ENVIROMENT == "pro") {
                    await mailService({
                        email: user.email,
                        subject: "this is your OTP",
                        message: user.otp,
                    });
                }
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
        console.log("---authController.checkOtp");
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

    // POST auth/resendOtp
    async resendOtp(req, res, next) {
        console.log("---authController.resendOtp");
        try {
            const emailFromClient = req.body.email;
            const user = await UserModel.findOne({ email: emailFromClient });
            if (user && user.status != "inactivated") {
                // user exsit
                if (process.env.ENVIROMENT == "pro") {
                    await mailService({
                        email: user.email,
                        subject: "this is your OTP",
                        message: user.otp,
                    });
                }
                console.log(user.otp);
                return res.status(codeEnum.SUCCESS).json({
                    status: statusEnum.SUCCESS,
                    message: msgEnum.SEND_OTP_SUCCESS,
                });
            }
        } catch (error) {
            next(error);
        }
    }

    // POST auth/logout
    async logout(req, res, next) {
        console.log("---authController.logout");
        const tokenFromClient = req.headers["token"];
        await SessionModel.findByIdAndDelete(tokenFromClient);
        return res.status(codeEnum.SUCCESS)
            .json({
                status: statusEnum.SUCCESS,
                message: msgEnum.LOGGED_OUT,
            });
    }

    // ???
    // POST auth/fogotPassword
    async fogotPassword(req, res, next) {
        console.log("---authController.fogotPassword");
        try {
            const emailFromClient = req.body.email;
            const user = await UserModel.findOne({ email: emailFromClient });
            if (user) {
                // gen otp
                const otp = createOTP();
                // send mail
                if (process.env.ENVIROMENT == "pro") {
                    await mailService({
                        email: user.email,
                        subject: "this is your OTP",
                        message: user.otp,
                    });
                }
                console.log(otp);

                // save otp
                user.otp = otp;
                await user.save();

                return res.status(codeEnum.SUCCESS).json({
                    status: statusEnum.SUCCESS,
                    message: msgEnum.SEND_OTP_SUCCESS,
                });
            }
            return res.status(codeEnum.BAD_REQUEST).json({
                status: statusEnum.FAIL,
                message: msgEnum.USER_NOT_EXIST,
            });
        } catch (error) {
            next(error);
        }
    }

    // POST auth/updatePassword
    async updatePassword(req, res, next) {
        console.log("---authController.updatePassword");
        try {
            const emailFromClient = req.body.email;
            const newPassword = req.body.password;
            const otp = req.body.otp;
            const user = await UserModel.findOne({ email: emailFromClient }).select("+password +otp");
            if (!user) {
                return res.status(codeEnum.BAD_REQUEST).json({
                    status: statusEnum.FAIL,
                    message: msgEnum.USER_NOT_EXIST,
                });
            }
            console.log(user);
            if (user.otp != otp) {
                return res.status(codeEnum.FORBIDDEN).json({
                    status: statusEnum.FAIL,
                    message: "yy"
                });
            }

            user.password = newPassword;
            await user.save();

            return res.status(codeEnum.SUCCESS).json({
                status: statusEnum.SUCCESS,
                message: msgEnum.RESET_PASSWORD_SUCCESS,
            });
        } catch (error) {
            next(error);
        }
    }

    // GET auth/getMe
    async getMe(req, res, next) {
        console.log("---authController.getMe");
        try {
            const user_id = req.user_id;
            const user = await UserModel.findById(user_id);
            if (user) {
                return res.status(codeEnum.SUCCESS).json({
                    status: statusEnum.SUCCESS,
                    data: user,
                })
            } else {
                return res.status(codeEnum.NOT_FOUND).json({
                    status: statusEnum.FAIL,
                    message: msgEnum.USER_NOT_EXIST,
                })
            }
        } catch (error) {
            next(error);
        }
    }

    // DELETE 
    async deleteUser(req, res, next) {
        console.log("---authController.deleteUser");
        try {
            if (process.env.ENVIROMENT == "dev") {
                const user_id = req.user_id;
                await UserModel.findByIdAndDelete(user_id);
                return res.status(codeEnum.NO_CONTENT).json({});
            }
            return res.status(codeEnum.FORBIDDEN).json({});
        } catch (error) {
            next(error);
        }
    }

    async newPassword(req, res, next){
        console.log("---authController.newPassword");
        try {
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;

            // find user in database
            const user = await UserModel.findById(req.user_id).select("+password");

            // compare password
            const isMatch = await user.matchPassword(oldPassword);
            if (!isMatch) {
                return res.status(codeEnum.BAD_REQUEST).json({
                    status: statusEnum.FAIL,
                    message: msgEnum.INCORRECT_PASSWORD,
                });
            }

            user.password = newPassword;
            await user.save();

            return res.status(codeEnum.SUCCESS).json({
                status: statusEnum.SUCCESS,
                message: msgEnum.RESET_PASSWORD_SUCCESS,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();